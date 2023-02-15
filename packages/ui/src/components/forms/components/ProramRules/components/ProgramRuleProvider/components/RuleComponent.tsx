import React, {memo, useEffect, useMemo} from 'react';
import {useFormContext, useWatch} from 'react-hook-form';
import {useActionCallbacks, useTriggers} from '../hooks';
import {mapValues} from 'lodash';
import {evaluateRules, ProgramRuleExecutionVariables, Rule, runActions, sanitizeActions} from "@hisptz/dhis2-utils";

export const ActionComponent = memo(
    ({
        field,
        rules,
        variableValues,
        formOptions,
    }: {
        field: string;
        rules: Rule[];
        variableValues: any;
        formOptions: any;
    }) => {
        const value = useWatch({ name: field });
        const { getValues } = useFormContext();
        const values = getValues();

        const callbacks = useActionCallbacks();

        const rulesToRun = useMemo(() => {
            const activeRules = rules.filter(({ triggers }) => {
                if (formOptions.isEventForm) {
                    return triggers.some(({ type }) => type === 'DATAELEMENT_CURRENT_EVENT');
                } else {
                    return triggers.some(({ type }) => type === 'TEI_ATTRIBUTE');
                }
            });

            return activeRules.filter(({ triggers }) =>
                triggers.some(({ id }) => id === field)
            );
        }, [rules, formOptions, field]);

        const sanitizedValues = useMemo(
            () =>
                mapValues(
                    values,
                    (value: string | boolean | Record<string, unknown>[] | unknown) => {
                        if (value === undefined) {
                            return value;
                        }
                        if (Array.isArray(value)) {
                            return value;
                        }
                        if (
                            typeof value === 'boolean' ||
                            (typeof value === 'string' && value?.match(/(true|false)/))
                        ) {
                            return value;
                        }
                        return !Number(value) ? value : parseFloat(value as string);
                    }
                ),
            [values]
        );
        useEffect(() => {
            const rawActions = evaluateRules(rulesToRun, sanitizedValues, {
                variableValues,
                options: {
                    ...formOptions,
                },
            });
            const actions = sanitizeActions(rawActions);
            runActions(actions, callbacks);
        }, [value]); // Only re-run if value changes
        return null;
    }
);

export  function RuleComponent({
    rules,
    formOptions,
    dataItems,
    variables,
}: {
    rules: Rule[];
    formOptions: { isEventForm?: boolean; isEnrollmentForm: boolean };
    variables: ProgramRuleExecutionVariables;
    dataItems: string[];
}) {
    const callbacks = useActionCallbacks();
    const { runTriggers, initialRunRules } = useTriggers(rules, dataItems, formOptions);
    useEffect(() => {
        const actions = sanitizeActions(
            evaluateRules(
                initialRunRules,
                {},
                { variableValues: variables, options: formOptions }
            )
        );
        setTimeout(() => runActions(actions, { ...callbacks }), 1);
    }, []);

    const variableValues = useMemo(() => variables, [variables]);

    return (
        <>
            {runTriggers?.map((field) => (
                <ActionComponent
                    rules={rules}
                    formOptions={formOptions}
                    variableValues={variableValues}
                    key={`${field}-action-runner`}
                    field={field}
                />
            ))}
        </>
    );
}
