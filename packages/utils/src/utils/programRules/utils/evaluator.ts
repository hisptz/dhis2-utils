import type { ProgramRule, ProgramRuleAction } from "../../../interfaces";
import {
	BuiltInVariable,
	BuiltInVariableValueOptions,
	ProgramRuleExecutionVariables,
	ProgramRuleOptions,
	ProgramRuleVariable,
	Rule,
	RuleAction,
	RuleConditionFunction,
	RuleTarget,
	RuleTrigger,
} from "../interfaces";
import { compact, find, flatten, get, tail, uniq, uniqBy } from "lodash";
import { evaluateFunction } from "./d2Functions";
import { builtInVariables, RegularExpressions } from "../constants";
import { ProgramRuleActionType } from "./actions";

function getActionTarget(
	programRuleAction: ProgramRuleAction,
	{ idPrefix }: { idPrefix?: string },
): RuleTarget {
	switch (programRuleAction.programRuleActionType) {
		case ProgramRuleActionType.HIDESECTION:
			return {
				id: (programRuleAction.programSection?.id ??
					programRuleAction?.programStageSection?.id) as string,
				type: programRuleAction.programSection
					? "PROGRAM_SECTION"
					: "PROGRAM_STAGE_SECTION",
			};
		default:
			return {
				id: `${idPrefix ?? ""}${
					(programRuleAction.dataElement?.id ??
						programRuleAction.trackedEntityAttribute?.id) as string
				}`,
				type: programRuleAction.dataElement
					? "DATA_ELEMENT"
					: programRuleAction.trackedEntityAttribute
						? "ATTRIBUTE"
						: "VARIABLE",
			};
	}
}

export function getRuleActions(
	programRulesActions: ProgramRuleAction[],
	idPrefix?: string,
): RuleAction[] {
	return programRulesActions.map((programRuleAction) => {
		return {
			type: programRuleAction.programRuleActionType!,
			id: programRuleAction.id ?? "",
			data: programRuleAction.data ?? "",
			option: programRuleAction?.option,
			optionGroup: programRuleAction?.optionGroup,
			content: programRuleAction.content ?? "",
			target: getActionTarget(programRuleAction, { idPrefix }),
		};
	});
}

export function getRuleTargets(ruleActions: RuleAction[]): RuleTarget[] {
	return uniqBy(
		compact(flatten(ruleActions.map(({ target }) => target))),
		"id",
	);
}

export function getVariablesFromCondition(condition: string) {
	const ruleVariables = [
		...flatten(
			Array.from(condition.matchAll(RegularExpressions.VARIABLE)).map(
				(match) => tail(match),
			) ?? [],
		),
	];
	const functionParameters = [
		...(condition.matchAll(RegularExpressions.FUNCTION) ?? []),
	];
	return uniq([
		...(compact(ruleVariables) ?? []),
		...(tail(compact(functionParameters)) ?? []),
	]);
}

function getTriggerFromVariable(
	variable: ProgramRuleVariable,
	idPrefix?: string,
): RuleTrigger | undefined {
	switch (variable.programRuleVariableSourceType) {
		case "DATAELEMENT_PREVIOUS_EVENT":
		case "DATAELEMENT_CURRENT_EVENT":
		case "DATAELEMENT_NEWEST_EVENT_PROGRAM":
			return {
				id: `${idPrefix ?? ""}${variable?.dataElement?.id}`,
				type: variable.programRuleVariableSourceType,
				name: variable.name,
			};
		case "CALCULATED_VALUE":
			return {
				id: variable.name,
				type: "VARIABLE",
				name: variable.name,
			};
		case "TEI_ATTRIBUTE":
			return {
				id: `${idPrefix ?? ""}${variable?.trackedEntityAttribute?.id}`,
				type: variable.programRuleVariableSourceType,
				name: variable.name,
			};
		default:
			return undefined;
	}
}

export function getRuleTriggers(
	condition: string,
	variables: ProgramRuleVariable[],
	idPrefix?: string,
): RuleTrigger[] {
	const triggerVariables = getVariablesFromCondition(condition ?? "");
	return compact(
		triggerVariables.map((variable) => {
			const variableObject = variables.find((v) => v.name === variable);
			if (variableObject) {
				return getTriggerFromVariable(variableObject, idPrefix);
			}
		}),
	);
}

export function translateProgramRule(
	programRule: ProgramRule,
	programRuleVariables: any[],
	idPrefix = "",
): Rule {
	const ruleActions = getRuleActions(
		programRule.programRuleActions ?? [],
		idPrefix,
	);
	return {
		actions: ruleActions,
		condition: programRule.condition ?? "",
		targets: getRuleTargets(ruleActions),
		triggers:
			getRuleTriggers(
				programRule.condition ?? "",
				programRuleVariables,
				idPrefix,
			) ?? [],
		id: programRule.id,
	};
}

function getTriggerKey(trigger: RuleTrigger): RegExp {
	switch (trigger.type) {
		case "CONSTANT":
			return RegExp(`V{${trigger.name}`, "g");
		default:
			return RegExp(`#{${trigger.name}}|A{${trigger.name}}`, "g");
	}
}

export function evaluateFromDataExpression(
	data: string,
	{
		variableValues,
		triggers,
		triggerValues,
		options,
	}: {
		variableValues: BuiltInVariableValueOptions;
		triggers: RuleTrigger[];
		triggerValues: Record<any, string>;
		options: ProgramRuleOptions;
	},
) {
	try {
		const sanitizedDataString = replaceConstants(
			replaceVariables(data, {
				triggers,
				triggerValues,
				variables: variableValues,
				options,
			}),
			variableValues,
		);

		const sanitizedValue = evaluateFunction(sanitizedDataString);
		return `${sanitizedValue}`;
	} catch (e) {
		console.error(`Error evaluating data expression: ${e}`);
		return "";
	}
}

function getTriggerValue(
	trigger: RuleTrigger,
	triggerValues: Record<string, any>,
	variables: ProgramRuleExecutionVariables,
	{ isEventForm, isEnrollmentForm }: ProgramRuleOptions,
): any {
	switch (trigger.type) {
		case "DATAELEMENT_CURRENT_EVENT":
			return get(triggerValues, trigger.id);
		case "DATAELEMENT_PREVIOUS_EVENT":
			return (
				variables?.previousEvent?.dataValues?.find(
					(dv: { dataElement: any }) => dv.dataElement === trigger.id,
				)?.value ?? ""
			);
		case "DATAELEMENT_NEWEST_EVENT_PROGRAM":
			return (
				variables?.newestProgramEvent?.dataValues?.find(
					(dv: { dataElement: any }) => dv.dataElement === trigger.id,
				)?.value ?? ""
			);
		case "DATAELEMENT_NEWEST_EVENT_PROGRAM_STAGE":
			return (
				variables?.newestProgramEvent?.dataValues?.find(
					(dv: { dataElement: any }) => dv.dataElement === trigger.id,
				)?.value ?? ""
			);
		case "TEI_ATTRIBUTE":
			if (isEventForm) {
				return (
					variables?.trackedEntityInstance?.attributes?.find(
						(a: { attribute: any }) => a.attribute === trigger.id,
					)?.value ?? ""
				);
			}
			return get(triggerValues, trigger.id);
		default:
			return get(triggerValues, trigger.id);
	}
}

export function replaceVariables(
	condition: string,
	{
		triggers,
		triggerValues,
		variables,
		options,
	}: {
		triggers: RuleTrigger[];
		triggerValues: Record<string, any>;
		variables: ProgramRuleExecutionVariables;
		options: ProgramRuleOptions;
	},
): string {
	const replacementValues = triggers.map((trigger) => {
		return {
			key: getTriggerKey(trigger),
			value: getTriggerValue(trigger, triggerValues, variables, options),
		};
	});

	return replacementValues.reduce((condition, { key, value }) => {
		const sanitizedValue = value;
		return condition
			.replaceAll(
				key,
				typeof sanitizedValue === "number"
					? `${sanitizedValue}`
					: `'${sanitizedValue ?? ""}'`,
			)
			.replaceAll(/(d2:)/g, ``);
	}, condition);
}

export function replaceConstants(
	condition: string,
	variables: BuiltInVariableValueOptions,
) {
	const constants =
		flatten(
			Array.from(condition.matchAll(RegularExpressions.CONSTANT)).map(
				(match) => tail(match),
			),
		) ?? [];
	return constants.reduce((condition, constant) => {
		const constantObject: BuiltInVariable | undefined = find(
			builtInVariables,
			{
				key: constant,
			},
		) as BuiltInVariable | undefined;
		const value = constantObject?.value(variables) ?? "";
		return condition.replaceAll(
			RegularExpressions.CONSTANT,
			typeof value === "number" ? `${value}` : `'${value}'`,
		);
	}, condition);
}

export function sanitizeConditions(condition: string): string {
	if (!condition.match(/(true|false)/)) {
		return condition;
	}
	return condition
		.replaceAll(/('true')/g, `true`)
		.replaceAll(/('false')/g, `false`)
		.replaceAll(/(!=|==) *?(1)/g, "$1true")
		.replaceAll(/(!=|==) *?(0)/g, "$1false");
}

export function executeCondition(
	condition: string | RuleConditionFunction,
	{
		triggers,
		triggerValues,
		variables,
		options,
	}: {
		triggers: RuleTrigger[];
		triggerValues: Record<string, any>;
		variables: ProgramRuleExecutionVariables;
		options: ProgramRuleOptions;
	},
): boolean {
	if (typeof condition === "function") {
		return condition({
			triggers,
			triggerValues,
			variables,
			options,
		});
	}

	const conditionWithReplacements = replaceVariables(condition, {
		triggers,
		triggerValues,
		variables,
		options,
	});
	const conditionWithConstantsReplacement = replaceConstants(
		conditionWithReplacements,
		variables,
	);

	const sanitizedCondition = sanitizeConditions(
		conditionWithConstantsReplacement,
	);

	return Boolean(JSON.parse(evaluateFunction(sanitizedCondition)));
}
