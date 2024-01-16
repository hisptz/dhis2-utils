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

export interface ContentDialogProps extends ContentDialogConfig {
	hide: boolean;
	onClose: () => void;
}

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
