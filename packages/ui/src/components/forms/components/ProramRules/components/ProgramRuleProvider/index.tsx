import React, {useMemo} from 'react';
import type {Event, Program, ProgramRule, Rule, TrackedEntityInstance} from '@hisptz/dhis2-utils';
import {translateProgramRule} from "@hisptz/dhis2-utils";
import RuleComponent from './components/RuleComponent';
import {useVariableValues} from './hooks';

export function ProgramRuleProvider({
    program,
    trackedEntity,
    event,
    idPrefix,
    programRules,
    programStage,
    customRules,
    isEnrollmentForm,
    isEventForm,
    dataElements,
    attributes,
}: {
    program: Program;
    trackedEntity?: TrackedEntityInstance;
    idPrefix?: string;
    event?: Event;
    isEnrollmentForm?: boolean;
    isEventForm?: boolean;
    programRules: ProgramRule[];
    programStage?: string;
    customRules?: Rule[];
    attributes?: string[];
    dataElements?: string[];
}) {
    const rules = useMemo(() => {
        const rules = [
            ...(programRules
                ?.filter(({ programStage: ruleStage }) => programStage === ruleStage?.id)
                ?.map((programRule) =>
                    translateProgramRule(programRule, program.programRuleVariables, idPrefix)
                ) ?? []),
            ...(customRules ?? []),
        ];
        if (isEnrollmentForm) {
            return rules.filter((rule) =>
                rule.triggers.some(
                    (trigger: { type: string }) => trigger.type === 'TEI_ATTRIBUTE'
                )
            );
        }
        return rules;
    }, [
        programRules,
        customRules,
        isEnrollmentForm,
        isEventForm,
        program.programRuleVariables,
        idPrefix,
    ]);

    const executionVariables = useVariableValues({
        program,
        programStage,
        event,
        trackedEntityInstance: trackedEntity,
    });
    return (
        <>
            <RuleComponent
                variables={executionVariables}
                dataItems={[...(dataElements ?? []), ...(attributes ?? [])]}
                formOptions={{
                    isEnrollmentForm: isEnrollmentForm ?? false,
                    isEventForm: isEventForm ?? false,
                }}
                rules={rules}
            />
        </>
    );
}
