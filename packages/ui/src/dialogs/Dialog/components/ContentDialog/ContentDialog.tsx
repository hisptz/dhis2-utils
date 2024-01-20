import i18n from "@dhis2/d2-i18n";
import {
	Button,
	ButtonStrip,
	Modal,
	ModalActions,
	ModalContent,
	ModalTitle,
} from "@dhis2/ui";
import React from "react";
import { ContentDialogConfig } from "../../types";

export interface ContentDialogProps extends Omit<ContentDialogConfig, "type"> {
	hide: boolean;
	title: string;
	onClose: () => void;
}

/**
 * Creates a ContentDialog component.
 *
 * @param {Object} props - The properties for the ContentDialog.
 * @param {string} [props.size] - The size of the content dialog. Valid values are "small" or "large". Defaults to "small" if not provided.
 * @param {string} [props.title] - The title of the content dialog.
 * @param {string} [props.position] - The position of the content dialog. Valid values are "top", "middle", or "bottom". Defaults to "middle" if not provided.
 * @param {boolean} [props.hide] - Determines whether the content dialog is hidden or shown.
 * @param {React.ReactNode} props.content - The content inside the content dialog.
 * @param {Array} [props.actions] - An array of action objects with properties "component", "props", and "label". Each object represents an action button in the content dialog.
 * @param {function} props.onClose - A callback function to be called when the content dialog is closed.
 * @param {string} [props.cancelButtonLabel] - The label for the cancel button. Defaults to "Cancel" if not provided.
 *
 * @return {React.ReactNode} The generated ContentDialog component.
 */
export function ContentDialog({
	size,
	title,
	position,
	hide,
	content,
	actions,
	onClose,
	cancelButtonLabel,
}: ContentDialogProps) {
	return (
		<Modal
			position={position ?? "middle"}
			hide={hide}
			small={size === "small" || size === undefined}
			large={size === "large"}
			onClose={onClose}
		>
			<ModalTitle>{title ?? ""}</ModalTitle>
			<ModalContent>{content}</ModalContent>
			<ModalActions>
				<ButtonStrip>
					<Button onClick={onClose}>
						{cancelButtonLabel ?? i18n.t("Cancel")}
					</Button>
					{actions?.map(({ component, props, label }) => {
						if (component) {
							return <>{component}</>;
						}
						return <Button {...props}>{label}</Button>;
					})}
				</ButtonStrip>
			</ModalActions>
		</Modal>
	);
}
