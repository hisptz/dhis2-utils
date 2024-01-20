import { Meta, StoryObj } from "@storybook/react";
import { PeriodSelectorModal } from "./PeriodSelectorModal";
import { useBoolean } from "usehooks-ts";
import { useState } from "react";
import { Button } from "@dhis2/ui";

const meta: Meta<typeof PeriodSelectorModal> = {
	title: "Selectors/Period Selector/Period Selector Modal",
	component: PeriodSelectorModal,
};

export default meta;

type Story = StoryObj<typeof PeriodSelectorModal>;

/**
 * The modal accepts all `PeriodSelector` props as well as visibility control props (`hide` and `onClose`)
 * */
export const Default: Story = {
	name: "Default",
	args: {},
	render: (args) => {
		const {
			value: hide,
			setTrue: onClose,
			setFalse: onOpen,
		} = useBoolean(true);

		const [selected, setSelected] = useState();
		return (
			<div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
				<PeriodSelectorModal
					{...args}
					selectedPeriods={selected}
					hide={hide}
					onClose={onClose}
					onUpdate={setSelected}
				/>
				<Button onClick={onOpen}>Open Modal</Button>
			</div>
		);
	},
};
