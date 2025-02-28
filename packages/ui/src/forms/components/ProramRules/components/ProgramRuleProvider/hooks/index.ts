import { useCallback, useMemo } from "react";
import {
	FieldDisabledState,
	FieldErrorState,
	FieldHiddenOptionsState,
	FieldLoadingState,
	FieldMandatoryState,
	FieldMinMaxState,
	FieldVisibilityState,
	FieldWarningState,
	SectionVisibilityState,
} from "../state";
import { flatten, forEach, uniq } from "lodash";
import { useDataFetch } from "../services/fetch.js";
import { useFormContext } from "react-hook-form";
import {
	getNewestProgramEvent,
	getNewestProgramStageEvent,
	getPreviousEvent,
	MetaValues,
	ProgramRuleExecutionVariables,
	Rule,
} from "@hisptz/dhis2-utils";
import { useRecoilTransaction_UNSTABLE } from "recoil";
import type { ActionCallbacks } from "@hisptz/dhis2-utils/src";

const optionGroupsQuery = {
	groups: {
		resource: "optionGroups",
		params: ({ ids }: any) => ({
			fields: ["id", "name", "options[id,code]"],
			filter: [`id:in:[${ids.join(",")}]`],
		}),
	},
};

export function useVariableValues(
	metaValues: MetaValues,
): ProgramRuleExecutionVariables {
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
		return [];
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
	const { fetch } = useDataFetch(optionGroupsQuery);

	const getOptionGroups = useCallback(
		async (ids: string[]) => {
			const optionGroups = (await fetch({ ids }))?.groups as any;
			return optionGroups?.optionGroups;
		},
		[fetch],
	);

	const setError = useRecoilTransaction_UNSTABLE(
		({ set }) =>
			(field: string, error: string | Error) => {
				set(FieldErrorState(`${field}`), () => {
					return typeof error === "string" ? error : error.message;
				});
				if (error) {
					setFormError(field, {
						message:
							typeof error === "string" ? error : error.message,
					});
				}
			},
		[],
	);

	const setValue = useCallback(
		(values: { field: string; value: any }[]) => {
			values.forEach(({ value, field }) => formSetter(`${field}`, value));
		},
		[formSetter],
	);

	const toggleFieldVisibility = useRecoilTransaction_UNSTABLE(
		({ set }) =>
			(fields: { field: string; hide: boolean }[]) => {
				forEach(fields, ({ field, hide }) =>
					set(FieldVisibilityState(`${field}`), () => {
						return hide;
					}),
				);
				//Remove the field values from form state
				setValue(
					fields
						.filter(({ hide }) => hide)
						.map((field) => ({
							field: field.field,
							value: undefined,
						})),
				);
			},
		[setValue],
	);

	const toggleSectionVisibility = useRecoilTransaction_UNSTABLE(
		({ set }) =>
			(fields: { field: string; hide: boolean }[]) => {
				forEach(fields, ({ field, hide }) =>
					set(SectionVisibilityState(`${field}`), () => {
						return hide;
					}),
				);
				//Remove the field values from form state
				setValue(
					fields
						.filter(({ hide }) => hide)
						.map((field) => ({
							field: field.field,
							value: undefined,
						})),
				);
			},
		[setValue],
	);

	const toggleLoading = useRecoilTransaction_UNSTABLE(
		({ set }) =>
			(fields: { field: string; loading: boolean }[]) => {
				forEach(fields, ({ field, loading }) =>
					set(FieldLoadingState(`${field}`), loading),
				);
			},
		[],
	);

	const toggleFieldWarning = useRecoilTransaction_UNSTABLE(
		({ set }) =>
			(fields: { field: string; warning: string }[]) => {
				forEach(fields, ({ field, warning }) =>
					set(FieldWarningState(`${field}`), warning),
				);
			},
		[],
	);

	const toggleFieldDisabled = useRecoilTransaction_UNSTABLE(
		({ set }) =>
			(fields: { field: string; disabled?: boolean }[]) => {
				forEach(fields, ({ field, disabled }) =>
					set(FieldDisabledState(`${field}`), disabled ?? false),
				);
			},
		[],
	);

	const toggleFieldMandatory = useRecoilTransaction_UNSTABLE(
		({ set }) =>
			(fields: { field: string; mandatory?: boolean }[]) => {
				forEach(fields, ({ field, mandatory }) =>
					set(FieldMandatoryState(`${field}`), mandatory ?? false),
				);
			},
		[],
	);

	const setMinMax = useRecoilTransaction_UNSTABLE(
		({ set }) =>
			(
				fields: {
					field: string;
					min?: number | string;
					max?: number | string;
				}[],
			) => {
				forEach(fields, ({ field, min, max }) =>
					set(FieldMinMaxState(`${field}`), { max, min }),
				);
			},
		[],
	);

	const toggleOptionViews = useRecoilTransaction_UNSTABLE(
		({ set }) =>
			(fields: { field: string; options: string[]; hide: boolean }[]) => {
				forEach(fields, ({ field, options, hide }) => {
					if (hide) {
						set(FieldHiddenOptionsState(`${field}`), () => {
							return uniq([...options]);
						});
					} else {
						set(
							FieldHiddenOptionsState(`${field}`),
							(prevHiddenOptions) => {
								return prevHiddenOptions.filter(
									(id) => !options.includes(id),
								);
							},
						);
					}
				});
			},
		[],
	);

	return {
		toggleFieldWarning,
		getOptionGroups,
		toggleLoading,
		toggleOptionViews,
		toggleFieldVisibility,
		toggleMandatoryField: toggleFieldMandatory,
		toggleSectionVisibility,
		setValue,
		unregister,
		setError,
		setMinMax,
		toggleFieldDisabled,
	};
}

export function useTriggers(rules: Rule[]): {
	initialRunRules: Rule[];
	runTriggers: string[];
} {
	const runTriggers = useMemo(
		() => flatten(rules.map((rule) => rule.triggers)),
		[rules],
	);

	const initialRunRules = useMemo(
		() =>
			rules.filter((rule) => {
				return rules;
			}),
		[rules],
	);

	return {
		initialRunRules,
		runTriggers: uniq(runTriggers?.map((trigger) => trigger.id)),
	};
}
