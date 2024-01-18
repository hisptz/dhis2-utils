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
	return <DHIS2FormField {...args} value={value} onChange={setValue} />;
}

export const Default: Story = {
	name: "Default",
	render,
	args: {
		valueType: "TEXT",
		optionSet: {},
	},
};
