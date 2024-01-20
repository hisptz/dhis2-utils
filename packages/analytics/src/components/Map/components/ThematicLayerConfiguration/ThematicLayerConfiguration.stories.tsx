import { Meta, StoryObj } from "@storybook/react";
import { ThematicLayerConfiguration } from "./ThematicLayerConfiguration";
import { useForm } from "react-hook-form";
import { ThematicLayerConfig } from "../MapLayer/interfaces";

type Story = StoryObj<typeof ThematicLayerConfiguration>;
export const Basic: Story = {};
Basic.args = {};

const meta: Meta<typeof ThematicLayerConfiguration> = {
	title: "DHIS2 Map/Thematic Layer Configuration",
	component: ThematicLayerConfiguration,
	decorators: [
		(MapStory) => {
			const form = useForm<ThematicLayerConfig>();
			return (
				<div style={{ width: "50%", height: "50%" }}>
					<MapStory args={{ form }} />
				</div>
			);
		},
	],
};

export default meta;
