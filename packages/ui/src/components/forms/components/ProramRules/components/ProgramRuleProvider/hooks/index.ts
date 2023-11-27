import {useCallback, useMemo} from 'react';
import {
		FieldDisabledState,
		FieldErrorState,
		FieldHiddenOptionsState,
		FieldLoadingState,
		FieldMinMaxState,
		FieldVisibilityState,
		FieldWarningState,
} from '../state';
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
import {useRecoilTransaction_UNSTABLE} from "recoil";

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
		const {
				setValue: formSetter,
				unregister,
				setError: setFormError,
				clearErrors,
				trigger: triggerValidation,
		} = useFormContext();
		const {fetch} = useFetch(optionGroupsQuery);

		const getOptionGroups = useCallback(
				async (ids: string[]) => {
						const optionGroups = (await fetch({ids}))?.groups as any;
						return optionGroups?.optionGroups;
				},
				[fetch]
		);

		const setError = useRecoilTransaction_UNSTABLE(
				({set}) =>
						(field: string, error: string | Error) => {
								set(FieldErrorState(`${field}`), () => {
										return typeof error === 'string' ? error : error.message;
								});
								if (error) {
										setFormError(field, {
												message: typeof error === 'string' ? error : error.message
										})
								}
						},
				[]
		);

		const setValue = useCallback(
				(values: { field: string; value: any }[]) => {
						values.forEach(({value, field}) => formSetter(`${field}`, value));
				},
				[formSetter]
		);

		const toggleFieldVisibility = useRecoilTransaction_UNSTABLE(
				({set}) =>
						(fields: { field: string; hide: boolean }[]) => {
								forEach(fields, ({field, hide}) =>
										set(FieldVisibilityState(`${field}`), () => {
												return hide;
										})
								);
								//Remove the field values from form state
								setValue(fields.filter(({hide}) => hide).map((field) => ({field: field.field, value: undefined})))
						},
				[setValue]
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
				toggleFieldVisibility,
				setValue,
				unregister,
				setError,
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


