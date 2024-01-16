import { Story } from "@storybook/react";
import React from "react";
import { CustomSelectField, CustomSelectFieldProps } from "./index";

const Template: Story<CustomSelectFieldProps> = (args) => (
	<CustomSelectField {...args} />
);

export const Default = Template.bind({});
Default.args = {
	name: "Field",
	onChange: (value) => console.log(value),
	options: [
		{
			label: "Option one",
			value: "one",
		},
		{
			label: "Option two",
			value: "two",
		},
	],
	value: "true",
};

export default {
	title: "Form/Custom Select Field",
	component: CustomSelectField,
	argTypes: {
		onChange: {
			action: "changed",
		},
	},
};
