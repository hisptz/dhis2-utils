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
import { ConfirmDialogConfig, CustomAction } from "../../types/index.js";

export interface ConfirmDialogProps extends Omit<ConfirmDialogConfig, "type"> {
	hide: boolean;
	loading?: boolean;
}

/**
 * This is an abstraction of the `Modal` component from `@dhis2/ui`
 * that displays a confirmation dialog with the provided props.
 * It groups all the necessary components for a modal and simplifies how a modal's visibility is controlled.
 *
 * Required:
 * @param hide {boolean} Controls modal's visibility
 * @param title {string} The string that will appear as the title of the modal
 * @param message {string} Message that will appear as the modal's content
 * @param onConfirm {function (config: ConfirmDialogConfig): void} A callback that will be called when the confirm button is clicked
 *
 * Overrides:
 * @param cancelButtonText {string} Text to display on the cancel button instead of `Cancel`
 * @param confirmButtonText {string} Text to display on the confirmation button instead of `Confirm`
 * @param confirmButtonColor {"primary"| "secondary" | "destructive"} Background color of the confirmation button
 * @param customActions {Array<CustomAction>} List of custom actions to be displayed between the cancel and confirmation button
 * @param loadingText {string} Text displayed when the confirmation button is in a loading state
 *
 * Other props:
 * @param size {"small" | "large"} Controls the size of the modal
 * @param position {"top" | "bottom" | "middle"} Controls the position of the modal
 * @param loading {boolean} Sets loading to the primary action button
 * @param onCancel {function (): void} Called when cancel button is clicked
 *
 *
 */
export function ConfirmDialog({
	message,
	loading,
	size,
	onConfirm,
	onCancel,
	cancelButtonText,
	confirmButtonText,
	hide,
	confirmButtonColor,
	title,
	position,
	customActions,
	loadingText,
}: ConfirmDialogProps) {
	return (
		<Modal
			position={position ?? "middle"}
			hide={hide}
			small={size === "small" || size === undefined}
			large={size === "large"}
		>
			<ModalTitle>{title ?? i18n.t("Confirm Action")}</ModalTitle>
			<ModalContent>{message}</ModalContent>
			<ModalActions>
				<ButtonStrip>
					<Button onClick={onCancel}>
						{cancelButtonText ?? i18n.t("Cancel")}
					</Button>
					{customActions &&
						customActions.map(
							({ label, color, onClick, properties }, index) => (
								<Button
									key={`${label}-${index}`}
									primary={color === "primary"}
									secondary={
										color === "secondary" ||
										color === undefined
									}
									destructive={color === "destructive"}
									onClick={onClick}
									{...properties}
								>
									{label}
								</Button>
							),
						)}
					<Button
						loading={loading}
						primary={confirmButtonColor === "primary"}
						secondary={confirmButtonColor === "secondary"}
						destructive={
							confirmButtonColor === "destructive" ||
							confirmButtonColor === undefined
						}
						onClick={onConfirm}
					>
						{loading
							? loadingText ?? i18n.t("Confirming...")
							: confirmButtonText ?? i18n.t("Confirm")}
					</Button>
				</ButtonStrip>
			</ModalActions>
		</Modal>
	);
}
