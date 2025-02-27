import type { Meta, StoryObj } from "@storybook/react";
import { ProgramRuleProvider } from "./components/ProgramRuleProvider";
import { FormProvider, useForm } from "react-hook-form";
import { RecoilRoot } from "recoil";
import { formSection, program, programRules, trackedEntity } from "./data";

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
					<FormSec showProgress sections={formSection} />
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
		program,
		trackedEntity,
	},
};

export default meta;
