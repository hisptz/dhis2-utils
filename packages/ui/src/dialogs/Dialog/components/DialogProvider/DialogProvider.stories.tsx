import { Meta, StoryObj } from "@storybook/react";
import { DialogProvider } from "./DialogProvider";
import { Button, ButtonStrip } from "@dhis2/ui";
import { useDialog } from "../../hooks/useDialog";

const meta: Meta<typeof DialogProvider> = {
	component: DialogProvider,
	title: "Dialogs/Dialog Provider",
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

type Story = StoryObj<typeof DialogProvider>;

function ProviderChild() {
	const { confirm, show } = useDialog();

	return (
		<ButtonStrip>
			<Button
				onClick={() => {
					show({
						title: "Content modal with provider",
						content: (
							<>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Nunc nibh est, convallis et
								volutpat ac, ultricies nec nisl. Maecenas vel
								lacus in velit tristique pellentesque. Etiam
								pretium sapien dui, sed rutrum tortor efficitur
								sit amet. Quisque erat urna, condimentum a lacus
								a, feugiat tempus ex. Integer nec semper dolor,
								a tempus nulla. Donec nec metus a mauris porta
								porttitor nec sit amet lacus. Vivamus suscipit
								ultricies mi, ac mollis mauris euismod quis.
								Maecenas ultrices, nunc in pharetra lobortis,
								nulla ligula sollicitudin tortor, a tempor
								tellus
							</>
						),
					});
				}}
			>
				Open content modal
			</Button>
			<Button
				onClick={() => {
					confirm({
						title: "An example confirm dialog",
						message: "A specified message will appear here",
						onConfirm: () => {},
					});
				}}
			>
				Open confirm modal
			</Button>
		</ButtonStrip>
	);
}

export const Default: Story = {
	name: "Default",
	render: () => {
		return (
			<DialogProvider>
				<ProviderChild />
			</DialogProvider>
		);
	},
};
