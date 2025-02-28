import type {
	Event,
	Program,
	TrackedEntityInstance,
} from "../../../interfaces";
import { ProgramRuleActionType } from "../utils";

export interface RuleExecutionOptions {
	triggers: RuleTrigger[];
	triggerValues: Record<string, any>;
	variableValues: ProgramRuleExecutionVariables;
	options: ProgramRuleOptions;
}

export interface ActionCallbacks {
	setValue: (fieldValue: { field: string; value: any }[]) => void;
	setError: (field: string, error: Error | string) => void;
	unregister: (field: string) => void;
	toggleOptionViews: (
		options: { field: string; options: string[]; hide: boolean }[],
	) => void;
	toggleFieldVisibility: (field: { field: string; hide: boolean }[]) => void;
	toggleSectionVisibility: (
		field: { field: string; hide: boolean }[],
	) => void;
	toggleFieldWarning: (field: { field: string; warning: string }[]) => void;
	toggleLoading: (field: { field: string; loading: boolean }[]) => void;
	getOptionGroups: (ids: string[]) => any;
	toggleFieldDisabled: (
		field: { field: string; disabled?: boolean }[],
	) => void;
	toggleMandatoryField: (
		field: { field: string; disabled?: boolean }[],
	) => void;
	setMinMax: (
		field: {
			field: string;
			min?: number | string;
			max?: number | string;
		}[],
	) => void;
}

export interface RunnableAction {
	field: string;
	type: string;
	value?: any;
	hide?: boolean;
	visible?: boolean;
	disabled?: boolean;
	min?: string | number;
	max?: string | number;

	[key: string]: any;
}

export interface ProgramRuleOptions {
	isEventForm?: boolean;
	isEnrollmentForm?: boolean;
}

export type ProgramRuleSourceType =
	| "DATAELEMENT_PREVIOUS_EVENT"
	| "TEI_ATTRIBUTE"
	| "DATAELEMENT_CURRENT_EVENT"
	| "DATAELEMENT_NEWEST_EVENT_PROGRAM"
	| "DATAELEMENT_NEWEST_EVENT_PROGRAM_STAGE"
	| "CALCULATED_VALUE";

export interface BuiltInVariableValueOptions {
	event?: Event;
	program?: Program;
	trackedEntityInstance?: TrackedEntityInstance;
	programStage?: string;
}

export interface VariableValues {
	newestProgramStageEvent?: Event;
	newestProgramEvent?: Event;
	previousEvent?: Event;
	currentEvent?: Event;
	trackedEntityInstance?: TrackedEntityInstance;
}

export interface ProgramRuleExecutionVariables
	extends BuiltInVariableValueOptions,
		VariableValues {
	[key: string]: any;
}

export interface RuleTrigger {
	id: string;
	type: ProgramRuleSourceType | "CONSTANT" | "VARIABLE";
	name: string;
}

export interface BuiltInVariable {
	id: string;
	value: (options: BuiltInVariableValueOptions) => any;
	key: string;
}

export interface RuleTarget {
	id: string;
	type: "DATA_ELEMENT" | "ATTRIBUTE" | "VARIABLE";
}

export type ActionData =
	| string
	| boolean
	| number
	| Record<string, any>
	| ((
			values: RuleExecutionOptions,
	  ) => string | boolean | number | Record<string, any>);

export interface RuleAction {
	id: string;
	data?: ActionData;
	target: RuleTarget;
	option?: { id: string; code: string };
	optionGroup?: { id: string };
	content?: string;
	programStage?: { id: string };
	programStageSection?: { id: string };
	programSection?: { id: string };
	type: keyof typeof ProgramRuleActionType;
}

export type RuleConditionFunction = (values: {
	triggers: RuleTrigger[];
	triggerValues: Record<string, any>;
	variables: ProgramRuleExecutionVariables;
	options: ProgramRuleOptions;
}) => boolean;

export interface Rule {
	id: string;
	condition: string | RuleConditionFunction;
	triggers: RuleTrigger[];
	targets: RuleTarget[];
	actions: RuleAction[];
}

export interface ProgramRuleVariable {
	id: string;
	name: string;
	programRuleVariableSourceType: ProgramRuleSourceType;
	dataElement?: {
		id: string;
	};
	trackedEntityAttribute?: {
		id: string;
	};

	[key: string]: any;
}

export interface MetaValues {
	program: Program;
	programStage?: string;
	trackedEntityInstance?: TrackedEntityInstance;
	event?: Event;
}
