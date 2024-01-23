import { OrgUnitSelectorModal } from "./OrgUnitSelectorModal";
import { Meta, StoryObj } from "@storybook/react";
import { useBoolean } from "usehooks-ts";
import { useState } from "react";
import { OrgUnitSelection } from "../../OrgUnitSelector/index.js";
import { Button } from "@dhis2/ui";

const meta: Meta<typeof OrgUnitSelectorModal> = {
	title: "Selectors/Org Unit Selector/Modal",
	component: OrgUnitSelectorModal,
};

export default meta;

type Story = StoryObj<typeof OrgUnitSelectorModal>;

/**
 * The modal accepts all `OrgUnitSelector` props as well as visibility control props (`hide` and `onClose`)
 * */
export const Default: Story = {
	name: "Default",
	args: {},
	render: () => {
		const {
			value: hide,
			setTrue: onClose,
			setFalse: onOpen,
		} = useBoolean(true);
		const [selected, setSelected] = useState<OrgUnitSelection>();
		return (
			<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
				<OrgUnitSelectorModal
					value={selected}
					onClose={onClose}
					hide={hide}
					onUpdate={setSelected}
				/>
				<Button onClick={onOpen}>Open selector</Button>
			</div>
		);
	},
};
