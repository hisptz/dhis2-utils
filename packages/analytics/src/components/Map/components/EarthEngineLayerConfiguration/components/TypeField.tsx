import { filter, find } from "lodash";
import {
	EARTH_ENGINE_LAYERS,
	SUPPORTED_EARTH_ENGINE_LAYERS,
} from "../../MapLayer/components/GoogleEngineLayer/constants";
import { Controller, useFormContext } from "react-hook-form";
import i18n from "@dhis2/d2-i18n";
import { SingleSelectField, SingleSelectOption } from "@dhis2/ui";
import React from "react";

export function TypeField({ excluded }: { excluded?: string[] }) {
	const supportedLayers = filter(
		EARTH_ENGINE_LAYERS,
		({ id }) =>
			SUPPORTED_EARTH_ENGINE_LAYERS.includes(id) &&
			!(excluded?.includes(id) ?? false),
	);
	const { setValue } = useFormContext();
	const setConfigDefaults = (selected: string) => {
		const config = find(supportedLayers, ["id", selected]);
		if (!config) return;

		if (config?.defaultAggregations) {
			setValue("aggregations", config?.defaultAggregations);
		} else {
			setValue("aggregations", undefined);
		}

		if (config?.params) {
			const { max, min, palette } = config.params;
			setValue("params.max", max);
			setValue("params.min", min);
			setValue("params.palette", palette);
		} else {
			setValue("params", undefined);
		}
	};

	return (
		<Controller
			name="type"
			rules={{
				required: i18n.t("Type is required"),
			}}
			render={({ field, fieldState }) => (
				<SingleSelectField
					label={i18n.t("Layer type")}
					required
					error={Boolean(fieldState.error)}
					validationText={fieldState.error?.message}
					onChange={({ selected }: { selected: string }) => {
						setConfigDefaults(selected);
						field.onChange(selected);
					}}
					selected={
						Boolean(find(supportedLayers, "id", field.value))
							? field.value
							: undefined
					}
				>
					{supportedLayers?.map((layer) => (
						<SingleSelectOption
							key={`${layer.id}-option`}
							value={layer.id}
							label={layer.name}
						/>
					))}
				</SingleSelectField>
			)}
		/>
	);
}
