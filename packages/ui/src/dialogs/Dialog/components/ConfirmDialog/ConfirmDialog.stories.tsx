import { ConfirmDialog } from "./ConfirmDialog";
import { Meta, StoryObj } from "@storybook/react";
import { useBoolean } from "usehooks-ts";
import { Button } from "@dhis2/ui";

const meta: Meta<typeof ConfirmDialog> = {
	component: ConfirmDialog,
	title: "Dialogs/Confirm Dialog",
	parameters: {
		controls: {
			expanded: false,
		},
		docs: {
			story: {
				inline: true,
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof ConfirmDialog>;

export const Default: Story = {
	name: "Default",
	render: (props) => {
		const {
			value: hide,
			setTrue: onClose,
			setFalse: onOpen,
		} = useBoolean(true);

		return (
			<>
				<Button onClick={onOpen}>Open modal</Button>
				<ConfirmDialog
					{...props}
					hide={hide}
					onConfirm={onClose}
					onCancel={onClose}
				/>
			</>
		);
	},
	args: {
		title: "An example confirm dialog",
		message: "A specified message will appear here",
	},
};
export const WithPrimaryAction: Story = {
	name: "With primary action",
	render: (props) => {
		const {
			value: hide,
			setTrue: onClose,
			setFalse: onOpen,
		} = useBoolean(true);

		return (
			<>
				<Button onClick={onOpen}>Open modal</Button>
				<ConfirmDialog
					{...props}
					hide={hide}
					onConfirm={onClose}
					onCancel={onClose}
				/>
			</>
		);
	},
	args: {
		title: "An example confirm dialog",
		message: "A specified message will appear here",
		confirmButtonColor: "primary",
	},
};
export const WithCustomButtons: Story = {
	name: "With custom button text",
	render: (props) => {
		const {
			value: hide,
			setTrue: onClose,
			setFalse: onOpen,
		} = useBoolean(true);

		return (
			<>
				<Button onClick={onOpen}>Open modal</Button>
				<ConfirmDialog
					{...props}
					hide={hide}
					onConfirm={onClose}
					onCancel={onClose}
				/>
			</>
		);
	},
	args: {
		title: "An example confirm dialog",
		message: "A specified message will appear here",
		cancelButtonText: "Custom cancel",
		confirmButtonText: "Custom confirm",
	},
};
export const WithCustomAction: Story = {
	name: "With custom actions",
	render: (props) => {
		const {
			value: hide,
			setTrue: onClose,
			setFalse: onOpen,
		} = useBoolean(true);

		return (
			<>
				<Button onClick={onOpen}>Open modal</Button>
				<ConfirmDialog
					{...props}
					hide={hide}
					onConfirm={onClose}
					onCancel={onClose}
				/>
			</>
		);
	},
	args: {
		title: "An example confirm dialog",
		message: "A specified message will appear here",
		customActions: [
			{
				label: "A custom action",
				color: "secondary",
				onClick: () => {
					alert("Custom action clicked!");
				},
			},
		],
	},
};
