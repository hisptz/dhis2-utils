import {useCallback, useMemo} from 'react';
import {FieldControlValue, useFieldCallback,} from '../state';
import {flatten, forEach, some, uniq} from 'lodash';
import {useFetch} from '../services/fetch';
import {useFormContext} from 'react-hook-form';
import {
    ActionCallbacks,
    getNewestProgramEvent,
    getNewestProgramStageEvent,
    getPreviousEvent,
    MetaValues,
    ProgramRuleExecutionVariables,
    Rule
} from "@hisptz/dhis2-utils";

const optionGroupsQuery = {
    groups: {
        resource: 'optionGroups',
        params: ({ids}: any) => ({
            fields: ['id', 'name', 'options[id,code]'],
            filter: [`id:in:[${ids.join(',')}]`],
        }),
    },
};

export function useVariableValues(metaValues: MetaValues): ProgramRuleExecutionVariables {
    return useMemo(() => {
        return {
            program: metaValues.program,
            event: metaValues.event,
            trackedEntityInstance: metaValues.trackedEntityInstance,
            programStage: metaValues.programStage,
            previousEvent: getPreviousEvent(metaValues),
            newestProgramStageEvent: getNewestProgramStageEvent(metaValues),
            newestProgramEvent: getNewestProgramEvent(metaValues),
        };
    }, [metaValues]);
}

export function useHiddenFields(suspectedHiddenFields: string[]): string[] {
    const getHiddenFields = (fields: string[]) => {
        //TODO: Change implementation to use context
        return []
    };

    return getHiddenFields(suspectedHiddenFields);
}

export function useActionCallbacks(): ActionCallbacks {
    const {setValue: formSetter, setError, unregister} = useFormContext();
    const {fetch} = useFetch(optionGroupsQuery);

    const getOptionGroups = useCallback(
        async (ids: string[]) => {
            const optionGroups = (await fetch({ids}))?.groups as any;
            return optionGroups?.optionGroups;
        },
        [fetch]
    );

    const setValue = useCallback(
        (values: { field: string; value: any }[]) => {
            values.forEach(({value, field}) => formSetter(`${field}`, value));
        },
        [formSetter]
    );

    const toggleFieldVisibility = useFieldCallback<{ field: string; hide: boolean }[]>(
        ({set}) => (fields: { field: string; hide: boolean }[]) => {
            forEach(fields, ({field, hide}) =>
                set(field, 'hidden', hide)
            );
        },
    );

    const toggleLoading = useFieldCallback<{ field: string; loading: boolean }[]>(
        ({set}) =>
            (fields: { field: string; loading: boolean }[]) => {
                forEach(fields, ({field, loading}) =>
                    set(field, 'loading', loading)
                );
            },
        []
    );

    const toggleFieldWarning = useFieldCallback<{ field: string; warning: string }[]>(
        ({set}) =>
            (fields: { field: string; warning: string }[]) => {
                forEach(fields, ({field, warning}) =>
                    set(field, 'warning', warning)
                );
            },
        []
    );

    const toggleFieldDisabled = useFieldCallback<{ field: string; disabled?: boolean }[]>(
        ({set}) =>
            (fields: { field: string; disabled?: boolean }[]) => {
                forEach(fields, ({field, disabled}) =>
                    set(field, 'disabled', disabled ?? false)
                );
            },
        []
    );

    const setMinMax = useFieldCallback<{ field: string; min?: number | string; max?: number | string }[]>(
        ({set}) =>
            (fields: { field: string; min?: number | string; max?: number | string }[]) => {
                forEach(fields, ({field, min, max}) =>
                    set(field, 'minMax', {
                        min,
                        max
                    })
                );
            },
        []
    );

    const toggleOptionViews = useFieldCallback<{ field: string; options: string[]; hide: boolean }[]>(
        ({set}) =>
            (fields: { field: string; options: string[]; hide: boolean }[]) => {
                forEach(fields, ({field, options, hide}) => {
                    if (hide) {
                        set(field, 'hiddenOptions', uniq([...options]));
                    } else {
                        set(field, 'hiddenOptions', (prevHiddenOptions: FieldControlValue) => {
                            return (prevHiddenOptions as string []).filter((id: string) => !options.includes(id));
                        });
                    }
                });
            },
        []
    );

    return {
        toggleFieldWarning,
        getOptionGroups,
        toggleLoading,
        toggleOptionViews,
        toggleFieldVisibility,
        setValue,
        unregister,
        setError: setError as any,
        setMinMax,
        toggleFieldDisabled,
    };
}

export function useTriggers(
    rules: Rule[],
    dataItems: string[],
    formOptions: { isEventForm?: boolean; isEnrollmentForm: boolean }
): {
    initialRunRules: Rule[];
    runTriggers: string[];
} {
    const {isEnrollmentForm, isEventForm} = formOptions;
    const runTriggers = useMemo(() => flatten(rules.map((rule) => rule.triggers)), [rules]);

    const initialRunRules = useMemo(
        () =>
            rules.filter(
                (rule) =>
                    !some(
                        rule.triggers,
                        (trigger) =>
                            trigger.type === 'DATAELEMENT_CURRENT_EVENT' ||
                            (trigger.type === 'TEI_ATTRIBUTE')
                    )
            ),
        [rules]
    );

    return {
        initialRunRules,
        runTriggers: uniq(runTriggers?.map((trigger) => trigger.id)),
    };
}


