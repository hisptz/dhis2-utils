import { ThematicLayerConfigModalProps } from "./types";
import { useForm } from "react-hook-form";
import { ThematicLayerConfig } from "../MapLayer/interfaces/index.js";
import {
	Button,
	ButtonStrip,
	Modal,
	ModalActions,
	ModalContent,
	ModalTitle,
} from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import React from "react";
import { ThematicLayerConfiguration } from "./ThematicLayerConfiguration.js";

export function ThematicLayerConfigModal({
	open,
	exclude,
	config,
	onClose,
	onChange,
	...props
}: ThematicLayerConfigModalProps) {
	const form = useForm<ThematicLayerConfig>({
		defaultValues: config,
	});

	const onSubmitClick = (values: ThematicLayerConfig) => {
		onChange(values);
		onClose();
	};

	return (
		<Modal {...props} hide={!open} onClose={onClose}>
			<ModalTitle>{i18n.t("Configure Thematic Layer")}</ModalTitle>
			<ModalContent>
				<ThematicLayerConfiguration form={form} exclude={exclude} />
			</ModalContent>
			<ModalActions>
				<ButtonStrip>
					<Button onClick={onClose}>{i18n.t("Cancel")}</Button>
					<Button
						primary
						onClick={() => form.handleSubmit(onSubmitClick)()}
					>
						{i18n.t("Save")}
					</Button>
				</ButtonStrip>
			</ModalActions>
		</Modal>
	);
}
