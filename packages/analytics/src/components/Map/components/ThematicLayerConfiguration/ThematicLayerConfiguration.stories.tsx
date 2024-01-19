import { Meta, StoryObj } from "@storybook/react";
import { ThematicLayerConfiguration } from "./ThematicLayerConfiguration";
import React from "react";

type Story = StoryObj<typeof ThematicLayerConfiguration>;
export const Basic: Story = {};
Basic.args = {};

const meta: Meta<typeof ThematicLayerConfiguration> = {
	title: "DHIS2 Map/Thematic Layer Configuration",
	component: ThematicLayerConfiguration,
	decorators: [
		(MapStory: any) => {
			return (
				<div style={{ width: "50%", height: "50%" }}>
					<MapStory />
				</div>
			);
		},
	],
};

export default meta;
