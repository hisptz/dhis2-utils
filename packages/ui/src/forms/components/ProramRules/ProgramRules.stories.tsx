import type { Meta, StoryObj } from "@storybook/react";
import {
	ProgramRuleProvider,
	SectionProgramRule,
} from "./components/ProgramRuleProvider";
import { FormProvider, useForm } from "react-hook-form";
import { RecoilRoot } from "recoil";
import {
	formSection,
	program,
	programRules,
	trackedEntity,
} from "./data.resource";
import type { Rule } from "@hisptz/dhis2-utils/src";
import { RHFCheckboxField } from "../react-hook-form-fields";

const meta: Meta<typeof ProgramRuleProvider> = {
	title: "Form/Program Rules",
	component: ProgramRuleProvider,
};

type Story = StoryObj<typeof ProgramRuleProvider>;

function render(args: Story["args"]) {
	const form = useForm();

	return (
		<RecoilRoot>
			<FormProvider {...form}>
				<ProgramRuleProvider {...args}>
					<RHFCheckboxField
						label={"Show section"}
						name={"showSection"}
					/>
					{formSection.map((section) => (
						<SectionProgramRule id={section.id}>
							{({ hidden }) => {
								if (hidden) return <div>Hidden</div>;

								return <div>Shown </div>;
							}}
						</SectionProgramRule>
					))}
				</ProgramRuleProvider>
			</FormProvider>
		</RecoilRoot>
	);
}

export const Default: Story = {
	name: "Enrollment form",
	render,
	args: {
		programRules,
		program: program,
		trackedEntity,
		isEventForm: true,
		customRules: [
			{
				id: "hide-form-section",
				triggers: [
					{
						id: "showSection",
						type: "DATAELEMENT_CURRENT_EVENT",
					},
				],
				condition: ({ triggerValues }) => {
					return !triggerValues["showSection"];
				},
				targets: [
					{
						id: "rUtyb9eGxAG",
						type: "PROGRAM_STAGE_SECTION",
					},
				],
				actions: [
					{
						id: "rUtyb9eGxAG",
						programStageSection: {
							id: "rUtyb9eGxAG",
						},
						type: "HIDESECTION",
						target: {
							id: "rUtyb9eGxAG",
							type: "PROGRAM_STAGE_SECTION",
						},
					},
				],
			} as Rule,
		],
	},
};

export default meta;
