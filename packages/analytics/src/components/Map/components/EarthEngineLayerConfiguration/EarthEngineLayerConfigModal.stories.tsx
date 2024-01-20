import { Meta, StoryObj } from "@storybook/react";
import { Button } from "@dhis2/ui";
import { useBoolean } from "usehooks-ts";
import { EarthEngineLayerConfigModal } from "./EarthEngineLayerConfigModal";

const meta: Meta<typeof EarthEngineLayerConfigModal> = {
	component: EarthEngineLayerConfigModal,
	title: "DHIS2 Map/Earth Engine Layer Config Modal",
	decorators: [
		(Story) => {
			const {
				value: hide,
				setTrue: onClose,
				setFalse: onOpen,
			} = useBoolean(true);

			return (
				<div>
					<Story args={{ open: !hide, onClose }} onClose={onClose} />
					<Button onClick={onOpen}>Open modal</Button>
				</div>
			);
		},
	],
};

export default meta;

type Story = StoryObj<typeof EarthEngineLayerConfigModal>;

export const Default: Story = {};
Default.args = {
	onClose: () => {},
	onChange: console.info,
	open: true,
};
