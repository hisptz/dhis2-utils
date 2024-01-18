import { RHFDHIS2FormField } from "./RHFDHIS2FormField";
import { Meta, StoryObj } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";

const meta: Meta<typeof RHFDHIS2FormField> = {
	title: "Form/Fields/RHF DHIS2 Form Field",
	component: RHFDHIS2FormField,
	decorators: (Story) => {
		const form = useForm();

		return (
			<FormProvider {...form}>
				<Story />
			</FormProvider>
		);
	},
};

export default meta;

type Story = StoryObj<typeof RHFDHIS2FormField>;

export const Default: Story = {
	name: "Default",
	args: {
		valueType: "TEXT",
		name: "text",
		optionSet: {},
	},
};
