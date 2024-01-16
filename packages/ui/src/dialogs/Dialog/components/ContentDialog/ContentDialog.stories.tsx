import { Meta, StoryObj } from "@storybook/react";
import { useBoolean } from "usehooks-ts";
import { Button, Tag } from "@dhis2/ui";
import { ContentDialog } from "./ContentDialog";

const meta: Meta<typeof ContentDialog> = {
	component: ContentDialog,
	title: "Dialogs/Content Dialog",
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

type Story = StoryObj<typeof ContentDialog>;

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
				<ContentDialog {...props} hide={hide} onClose={onClose} />
			</>
		);
	},
	args: {
		title: "An example confirm dialog",
		content: (
			<>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
				nibh est, convallis et volutpat ac, ultricies nec nisl. Maecenas
				vel lacus in velit tristique pellentesque. Etiam pretium sapien
				dui, sed rutrum tortor efficitur sit amet. Quisque erat urna,
				condimentum a lacus a, feugiat tempus ex. Integer nec semper
				dolor, a tempus nulla. Donec nec metus a mauris porta porttitor
				nec sit amet lacus. Vivamus suscipit ultricies mi, ac mollis
				mauris euismod quis. Maecenas ultrices, nunc in pharetra
				lobortis, nulla ligula sollicitudin tortor, a tempor tellus
				justo laoreet felis. Sed nec dui ac odio ullamcorper elementum.
				Aliquam erat volutpat. Donec tincidunt, magna in mollis
				lobortis, ligula orci lacinia libero, in ornare felis tellus id
				ex. Vestibulum ultrices aliquam congue. Nam ac orci sit amet
				purus egestas mattis. Donec tellus nibh, gravida in efficitur
				quis, laoreet vel dui. In quis lacinia nisl. Aenean accumsan,
				ante id sagittis accumsan, tortor sapien efficitur turpis, eu
				finibus sapien libero nec dui.
			</>
		),
	},
};
export const CustomActions: Story = {
	name: "Custom actions",
	render: (props) => {
		const {
			value: hide,
			setTrue: onClose,
			setFalse: onOpen,
		} = useBoolean(true);

		return (
			<>
				<Button onClick={onOpen}>Open modal</Button>
				<ContentDialog {...props} hide={hide} onClose={onClose} />
			</>
		);
	},
	args: {
		title: "An example confirm dialog",
		content: (
			<>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
				nibh est, convallis et volutpat ac, ultricies nec nisl. Maecenas
				vel lacus in velit tristique pellentesque. Etiam pretium sapien
				dui, sed rutrum tortor efficitur sit amet. Quisque erat urna,
				condimentum a lacus a, feugiat tempus ex. Integer nec semper
				dolor, a tempus nulla. Donec nec metus a mauris porta porttitor
				nec sit amet lacus. Vivamus suscipit ultricies mi, ac mollis
				mauris euismod quis. Maecenas ultrices, nunc in pharetra
				lobortis, nulla ligula sollicitudin tortor, a tempor tellus
				justo laoreet felis. Sed nec dui ac odio ullamcorper elementum.
				Aliquam erat volutpat. Donec tincidunt, magna in mollis
				lobortis, ligula orci lacinia libero, in ornare felis tellus id
				ex. Vestibulum ultrices aliquam congue. Nam ac orci sit amet
				purus egestas mattis. Donec tellus nibh, gravida in efficitur
				quis, laoreet vel dui. In quis lacinia nisl. Aenean accumsan,
				ante id sagittis accumsan, tortor sapien efficitur turpis, eu
				finibus sapien libero nec dui.
			</>
		),
		actions: [
			{
				label: "Custom action",
				props: {
					onClick: () => {
						alert("Custom action clicked");
					},
				},
			},
			{
				component: (
					<>
						<Tag>A custom element</Tag>
					</>
				),
			},
		],
	},
};
