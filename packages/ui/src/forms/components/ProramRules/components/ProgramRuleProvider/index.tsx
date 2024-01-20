import React, { useMemo } from "react";
import type {
	Event,
	Program,
	ProgramRule,
	Rule,
	TrackedEntityInstance,
} from "@hisptz/dhis2-utils";
import { translateProgramRule } from "@hisptz/dhis2-utils";
import { RuleComponent } from "./components/RuleComponent";
import { useVariableValues } from "./hooks";
import { FieldStateProvider } from "./state";

export * from "./components/RuleComponent";
export * from "./components/FieldProgramRule";
export * from "./hooks";
export * from "./state";

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
	dataElements,
	attributes,
	children,
	includeRoot,
}: ProgramRuleProviderProps) {
	const rules = useMemo(() => {
		return [
			...(programRules
				?.filter(
					({ programStage: ruleStage }) =>
						programStage === ruleStage?.id,
				)
				?.map((programRule) =>
					translateProgramRule(
						programRule,
						program.programRuleVariables,
						idPrefix,
					),
				) ?? []),
			...(customRules ?? []),
		];
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
		<FieldStateProvider includeRoot={includeRoot}>
			<RuleComponent
				variables={executionVariables}
				dataItems={[...(dataElements ?? []), ...(attributes ?? [])]}
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
