import i18n from "@dhis2/d2-i18n";
import { Button, Field, InputField, Radio } from "@dhis2/ui";
import { Controller, FormProvider, useWatch } from "react-hook-form";
import { useMemo, useState } from "react";
import { compact } from "lodash";
import { defaultClasses, defaultColorScaleName } from "../../utils/colors.js";
import IndicatorSelectorModal from "./components/IndicatorSelectorModal/index.js";
import { LegendSetSelector } from "./components/LegendSetSelector/index.js";
import { CustomLegend } from "./components/CustomLegend/index.js";
import { ThematicLayerConfigurationProps } from "./types/index.js";
import { RadiusField } from "./components/RadiusField.js";
import { TypeField } from "./components/TypeField.js";

export function ThematicLayerConfiguration({
	exclude,
	form,
}: ThematicLayerConfigurationProps) {
	const [type, legendSet, dataItemId] = useWatch({
		control: form.control,
		name: ["type", "dataItem.legendSet", "dataItem.id"],
	});
	const [legendType, setLegendType] = useState(
		legendSet ? "legendSet" : "custom",
	);
	const [dataSelectorOpen, setDataSelectorOpen] = useState(false);

	const onLegendTypeChange =
		(type: string) =>
		({ value }: { value?: string }) => {
			if (type === "custom") {
				form.setValue("dataItem.legendSet", undefined);
				form.setValue("dataItem.legendConfig.scale", defaultClasses);
				form.setValue(
					"dataItem.legendConfig.colorClass",
					defaultColorScaleName,
				);
			} else {
				form.setValue("dataItem.legendConfig", undefined);
			}
			if (value) {
				setLegendType(value);
			}
		};
	const disabled = useMemo(
		() => exclude?.filter((indicator) => indicator !== dataItemId) ?? [],
		[dataItemId, exclude],
	);
	return (
		<FormProvider {...form}>
			<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
				<TypeField />
				<Controller
					rules={{
						validate: {
							required: (value: { id: string; name: string }) => {
								return (
									Boolean(value?.id) ||
									i18n.t("A data item is required")
								);
							},
						},
					}}
					render={({ field, fieldState }) => (
						<>
							<div
								style={{
									alignItems: "flex-end",
									display: "flex",
									gap: 16,
								}}
							>
								<div
									onClick={() => setDataSelectorOpen(true)}
									style={{ flex: 1 }}
								>
									<InputField
										required
										error={Boolean(fieldState.error)}
										validationText={
											fieldState.error?.message
										}
										disabled
										inputWidth="100%"
										label={i18n.t("Data Item")}
										value={field.value?.displayName}
									/>
								</div>
								<Button
									onClick={() => setDataSelectorOpen(true)}
								>
									{field.value?.id
										? i18n.t("Change")
										: i18n.t("Select")}
								</Button>
							</div>
							{dataSelectorOpen && (
								<IndicatorSelectorModal
									disabled={disabled}
									onUpdate={(values: any[]) => {
										const [indicator] = values ?? [];
										field.onChange({
											id: indicator.id,
											displayName: indicator.displayName,
											type: "indicator",
										});
									}}
									onClose={() => setDataSelectorOpen(false)}
									hide={!dataSelectorOpen}
									selected={compact([
										{
											id: field.value?.id,
											displayName:
												field.value?.displayName,
										},
									])}
								/>
							)}
						</>
					)}
					name={"dataItem"}
				/>
				<div>
					<Field label={i18n.t("Legend")}>
						<div className="column gap-8">
							<div className="row gap-16">
								<Radio
									checked={legendType === "legendSet"}
									label={i18n.t("Legend set")}
									name="legendSet"
									value="legendSet"
									onChange={onLegendTypeChange("legendSet")}
								/>
								<Radio
									checked={legendType === "custom"}
									label={i18n.t("Custom legend")}
									name="custom"
									value="custom"
									onChange={onLegendTypeChange("custom")}
								/>
							</div>
							<div>
								{legendType === "legendSet" && (
									<Controller
										rules={{
											required: i18n.t(
												"Legend set is required",
											),
										}}
										name="dataItem.legendSet"
										render={({ field, fieldState }) => (
											<LegendSetSelector
												required
												selected={field.value}
												{...field}
												{...fieldState}
											/>
										)}
									/>
								)}
								{legendType === "custom" && <CustomLegend />}
							</div>
						</div>
					</Field>
					{type === "bubble" && (
						<Field label={i18n.t("Radius")}>
							<RadiusField />
						</Field>
					)}
				</div>
			</div>
		</FormProvider>
	);
}
