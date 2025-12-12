import { Meta, StoryObj } from "@storybook/react";
import { DHIS2FormField } from "./DHIS2FormField";
import { useState } from "react";

const meta: Meta<typeof DHIS2FormField> = {
	title: "Form/Fields/DHIS2 Form Field",
	component: DHIS2FormField,
};

export default meta;

type Story = StoryObj<typeof DHIS2FormField>;

/**
 * The DHIS2FormField shows a text field for native data inputs.
 * The input types are passed to the native html field, allowing for validation and changes in how the field accepts values.
 *
 * For Example, if the value type is INTEGER or NUMBER, then the field will be an input field of type number.
 *
 *
 * */

function render(args: Story["args"]) {
	const [value, setValue] = useState();
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
			<DHIS2FormField {...args} value={value} onChange={setValue} />
			<span>{value}</span>
		</div>
	);
}

export const Default: Story = {
	name: "Default",
	render,
	args: {
		valueType: "TEXT",
		optionSet: {},
	},
};

export const MultiText: Story = {
	name: "Multi text",
	render,
	args: {
		valueType: "MULTI_TEXT",
		label: "Multi text example",
		optionSet: {
			options: [
				{
					name: "Yes",
					code: "yes",
				},
				{
					name: "No",
					code: "no",
				},
				{
					name: "I don't know",
					code: "notSure",
				},
			],
		},
	},
};
export const MultiTextCheckboxes: Story = {
	name: "Multi text checkboxes",
	render,
	args: {
		valueType: "MULTI_TEXT",
		label: "Multi text example",
		required: true,
		renderOptionAsRadio: true,
		optionSet: {
			options: [
				{
					name: "Yes",
					code: "yes",
				},
				{
					name: "No",
					code: "no",
				},
				{
					name: "I don't know",
					code: "notSure",
				},
			],
		},
	},
};
