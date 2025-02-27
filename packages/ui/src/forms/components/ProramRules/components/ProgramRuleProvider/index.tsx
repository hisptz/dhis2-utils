import React, { useMemo } from "react";
import {
	Event,
	Program,
	ProgramRule,
	Rule,
	TrackedEntityInstance,
	translateProgramRule,
} from "@hisptz/dhis2-utils";
import { RuleComponent } from "./components/RuleComponent.js";
import { useVariableValues } from "./hooks/index.js";
import { FieldStateProvider } from "./state/index.js";

export * from "./components/RuleComponent.js";
export * from "./components/FieldProgramRule.js";
export * from "./hooks/index.js";
export * from "./state/index.js";

export interface ProgramRuleProviderProps {
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
	children: React.ReactNode;
	includeRoot?: boolean;
}

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
	children,
	includeRoot,
}: ProgramRuleProviderProps) {
	const rules = useMemo(() => {
		return [
			...(programRules.map((programRule) =>
				translateProgramRule(
					programRule,
					program.programRuleVariables,
					idPrefix,
				),
			) ?? []),
			...(customRules ?? []),
		];
	}, [programRules, customRules, program.programRuleVariables, idPrefix]);

	const executionVariables = useVariableValues({
		program,
		programStage,
		event,
		trackedEntityInstance: trackedEntity,
	});

	return (
		<FieldStateProvider includeRoot={includeRoot}>
			<RuleComponent
				variables={executionVariables}
				formOptions={{
					isEnrollmentForm: isEnrollmentForm ?? false,
					isEventForm: isEventForm ?? false,
				}}
				rules={rules}
			/>
			{children}
		</FieldStateProvider>
	);
}
