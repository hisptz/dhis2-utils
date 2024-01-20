import { Meta, StoryObj } from "@storybook/react";
import { EarthEngineLayerConfiguration } from "./EarthEngineLayerConfiguration";
import React from "react";
import { useForm } from "react-hook-form";
import { EarthEngineLayerConfig } from "../MapLayer/interfaces";

type Story = StoryObj<typeof EarthEngineLayerConfiguration>;

export const Default: Story = {};
Default.args = {};

const meta: Meta<typeof EarthEngineLayerConfiguration> = {
	title: "DHIS2 Map/Earth Engine Configuration",
	component: EarthEngineLayerConfiguration,
	decorators: [
		(MapStory) => {
			const form = useForm<EarthEngineLayerConfig>();
			return (
				<div style={{ width: "50%", height: "50%" }}>
					<MapStory args={{ form }} form={form} />
				</div>
			);
		},
	],
};

export default meta;
