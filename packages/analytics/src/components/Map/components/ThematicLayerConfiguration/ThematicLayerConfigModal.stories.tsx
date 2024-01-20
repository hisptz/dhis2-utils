import React from "react";
import { ThematicLayerConfigModal } from "./ThematicLayerConfigModal";
import { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof ThematicLayerConfigModal>;
export const Default: Story = {};
Default.args = {
	onChange: console.info,
	onClose: () => {},
	open: true,
};

const meta: Meta<typeof ThematicLayerConfigModal> = {
	title: "DHIS2 Map/Thematic Layer Config Modal",
	component: ThematicLayerConfigModal,
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
