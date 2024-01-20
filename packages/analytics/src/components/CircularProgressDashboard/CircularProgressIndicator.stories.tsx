import { Meta, StoryObj } from "@storybook/react";
import { CircularProgressVisualizer } from "./CircularProgressIndicator";

const meta: Meta<typeof CircularProgressVisualizer> = {
	title: "Circular Progress Visualizer",
	component: CircularProgressVisualizer,
};
export default meta;

type Story = StoryObj<typeof CircularProgressVisualizer>;

export const Default: Story = { name: "Default" };
Default.args = {
	numerator: 7,
	denominator: 10,
	size: 500,
};

export const WithStrokeStyling: Story = {
	name: "With stroke styling",
};
WithStrokeStyling.args = {
	numerator: 7,
	denominator: 10,
	size: 500,
	strokeStyle: {
		width: "10%",
		color: "red",
	},
};

export const WithTextStyling: Story = {
	name: "With text styling",
};
WithTextStyling.args = {
	numerator: 7,
	denominator: 10,
	size: 500,
	textStyle: {
		color: "red",
		fontWeight: "bold",
		fontSize: "20vh",
	},
};
