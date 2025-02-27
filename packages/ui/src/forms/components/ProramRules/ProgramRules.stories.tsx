import type { Meta, StoryObj } from "@storybook/react";
import { ProgramRuleProvider } from "./components/ProgramRuleProvider";
import { FormProvider, useForm } from "react-hook-form";
import { RecoilRoot } from "recoil";
import { program, programRules, trackedEntity } from "./data.resource";

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
					<div />
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
	},
};

export default meta;
