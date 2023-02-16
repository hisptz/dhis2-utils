import {useCallback, useMemo} from 'react';
import {useRecoilCallback, useRecoilTransaction_UNSTABLE} from 'recoil';
import {
    FieldDisabledState,
    FieldHiddenOptionsState,
    FieldLoadingState,
    FieldMinMaxState,
    FieldVisibilityState,
    FieldWarningState,
} from '../state';
import {compact, flatten, forEach, some, uniq} from 'lodash';
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
    const getHiddenFields = useRecoilCallback(
        ({snapshot}) =>
            (fields: string[]) => {
                return compact(
                    fields.map((field) => {
                        const visible = snapshot.getLoadable(
                            FieldVisibilityState(field)
                        ).contents;
                        return !visible ? field : undefined;
                    })
                );
            },
        []
    );

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

    const toggleFieldViews = useRecoilTransaction_UNSTABLE(
        ({set}) =>
            (fields: { field: string; hide: boolean }[]) => {
                forEach(fields, ({field, hide}) =>
                    set(FieldVisibilityState(`${field}`), () => {
                        return !hide;
                    })
                );
            },
        []
    );

    const toggleLoading = useRecoilTransaction_UNSTABLE(
        ({set}) =>
            (fields: { field: string; loading: boolean }[]) => {
                forEach(fields, ({field, loading}) =>
                    set(FieldLoadingState(`${field}`), loading)
                );
            },
        []
    );

    const toggleFieldWarning = useRecoilTransaction_UNSTABLE(
        ({set}) =>
            (fields: { field: string; warning: string }[]) => {
                forEach(fields, ({field, warning}) =>
                    set(FieldWarningState(`${field}`), warning)
                );
            },
        []
    );

    const toggleFieldDisabled = useRecoilTransaction_UNSTABLE(
        ({set}) =>
            (fields: { field: string; disabled?: boolean }[]) => {
                forEach(fields, ({field, disabled}) =>
                    set(FieldDisabledState(`${field}`), disabled ?? false)
                );
            },
        []
    );

    const setMinMax = useRecoilTransaction_UNSTABLE(
        ({set}) =>
            (fields: { field: string; min?: number | string; max?: number | string }[]) => {
                forEach(fields, ({field, min, max}) =>
                    set(FieldMinMaxState(`${field}`), {max, min})
                );
            },
        []
    );

    const toggleOptionViews = useRecoilTransaction_UNSTABLE(
        ({set}) =>
            (fields: { field: string; options: string[]; hide: boolean }[]) => {
                forEach(fields, ({field, options, hide}) => {
                    if (hide) {
                        set(FieldHiddenOptionsState(`${field}`), () => {
                            return uniq([...options]);
                        });
                    } else {
                        set(FieldHiddenOptionsState(`${field}`), (prevHiddenOptions) => {
                            return prevHiddenOptions.filter((id) => !options.includes(id));
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
        toggleFieldViews,
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
    const triggers = useMemo(() => flatten(rules.map((rule) => rule.triggers)), [rules]);

    const runTriggers = isEnrollmentForm ? triggers?.filter((trigger) => trigger.type === 'TEI_ATTRIBUTE') : isEventForm
        ? triggers?.filter((trigger) => trigger.type === 'DATAELEMENT_CURRENT_EVENT')
        : triggers;

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
