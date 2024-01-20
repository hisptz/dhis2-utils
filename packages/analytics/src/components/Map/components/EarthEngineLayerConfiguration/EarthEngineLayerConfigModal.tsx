import { useForm } from "react-hook-form";
import { EarthEngineLayerConfig } from "../MapLayer/interfaces";
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
import { EarthEngineLayerConfiguration } from "./EarthEngineLayerConfiguration";

export interface EarthEngineLayerConfigModalProps {
	open: boolean;
	config?: EarthEngineLayerConfig;
	exclude?: string[];
	onClose: () => void;
	onChange: (config: EarthEngineLayerConfig) => void;
}

export function EarthEngineLayerConfigModal({
	open,
	exclude,
	config,
	onClose,
	onChange,
	...props
}: EarthEngineLayerConfigModalProps) {
	const form = useForm<EarthEngineLayerConfig>({
		defaultValues: config ?? {},
	});
	const onSubmitClick = (values: EarthEngineLayerConfig) => {
		onClose();
		onChange(values);
	};

	return (
		<Modal {...props} hide={!open} onClose={onClose}>
			<ModalTitle>{i18n.t("Configure Earth Engine Layer")}</ModalTitle>
			<ModalContent>
				<EarthEngineLayerConfiguration form={form} excluded={exclude} />
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
