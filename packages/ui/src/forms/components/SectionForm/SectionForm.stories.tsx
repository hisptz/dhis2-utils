import { Meta, StoryObj } from "@storybook/react";
import { SectionForm } from "./SectionForm";
import { FormProvider, useForm } from "react-hook-form";

const meta: Meta<typeof SectionForm> = {
	title: "Form/Section Form",
	component: SectionForm,
};

export default meta;

type Story = StoryObj<typeof SectionForm>;

/**
 * The DHIS2FormField shows a text field for native data inputs.
 * The input types are passed to the native html field, allowing for validation and changes in how the field accepts values.
 *
 * For Example, if the value type is INTEGER or NUMBER, then the field will be an input field of type number.
 *
 *
 * */

function render(args: Story["args"]) {
	const form = useForm();
	return (
		<FormProvider {...form}>
			<div />
			{/*<SectionForm {...args} />*/}
		</FormProvider>
	);
}

export const Default: Story = {
	name: "Default",
	render,
	args: {
		collapsible: false,
		sections: [
			{
				id: "one",
				dataItems: [
					{
						type: "trackedEntityAttribute",
						valueType: "DATE",
						displayFormName: "Test",
						id: "test",
						formName: "test",
					},
				],
				displayFormName: "Test",
			},
		],
		showProgress: false,
	},
};
