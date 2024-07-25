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
	},
};

const legendDefinitions = [
	{
		color: "#008000",
		id: "#008000",
		name: "Target achieved / on track",
	},
	{
		color: "#FFFF00",
		id: "#FFFF00",
		name: "Progress, but more effort required",
	},
	{
		color: "#FF0000",
		id: "#FF0000",
		name: "Not on track",
	},
];

export const LegendMinMaxInput: Story = {
	args: {
		valueType: "LEGEND_MIN_MAX_GROUP",
		legendDefinitions,
		name: "legends",
	},
};
