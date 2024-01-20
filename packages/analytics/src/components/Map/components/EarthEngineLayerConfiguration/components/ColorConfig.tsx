import { Controller } from "react-hook-form";
import {
	Field,
	InputField,
	SingleSelectField,
	SingleSelectOption,
} from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import {
	defaultClasses,
	defaultColorScaleName,
	getColorClasses,
	getColorPalette,
	getColorScale,
} from "../../../utils/colors";
import ColorScaleSelect from "../../ThematicLayerConfiguration/components/ColorScaleSelect";
import React from "react";

export function ColorConfig() {
	return (
		<div className="column gap-16">
			<div className="row gap-8">
				<Controller
					render={({ field, fieldState }) => (
						<InputField
							{...field}
							error={Boolean(fieldState.error)}
							validationText={fieldState.error?.message}
							value={field.value?.toString()}
							onChange={({ value }: { value?: string }) => {
								if (!value) return;
								field.onChange(parseInt(value));
							}}
							label={i18n.t("Min")}
							type="number"
						/>
					)}
					name={"params.min"}
				/>
				<Controller
					render={({ field, fieldState }) => (
						<InputField
							{...field}
							error={Boolean(fieldState.error)}
							validationText={fieldState.error?.message}
							value={field.value?.toString()}
							onChange={({ value }: { value?: string }) => {
								if (!value) return;
								field.onChange(parseInt(value));
							}}
							label={i18n.t("Max")}
							type="number"
						/>
					)}
					name={"params.max"}
				/>
				<Controller
					name="params.palette"
					render={({ field, fieldState }) => {
						const palette = field.value;
						const scale = getColorClasses(palette);
						const colorClass = getColorScale(palette ?? "");

						const onChange = ({
							selected,
						}: {
							selected: string;
						}) => {
							const palette = getColorPalette(
								colorClass as string,
								parseInt(selected),
							)?.join(",");
							field.onChange(palette);
						};

						return (
							<SingleSelectField
								validationText={fieldState.error?.message}
								error={Boolean(fieldState.error)}
								selected={
									scale?.toString() ??
									defaultClasses.toString()
								}
								label={i18n.t("Steps")}
								onChange={onChange}
							>
								{[3, 4, 5, 6, 7, 8, 9].map((value) => (
									<SingleSelectOption
										key={`${value}-classes-option`}
										label={`${value}`}
										value={value?.toString()}
									/>
								))}
							</SingleSelectField>
						);
					}}
				/>
			</div>
			<div>
				<Controller
					name="params.palette"
					render={({ field, fieldState }) => {
						const palette = field.value;
						const scale = getColorClasses(palette);
						const colorClass = getColorScale(palette ?? "");

						const onChange = (colorClass: string) => {
							const palette = getColorPalette(
								colorClass,
								scale,
							)?.join(",");
							field.onChange(palette);
						};

						return (
							<Field
								error={Boolean(fieldState.error)}
								validationText={fieldState.error?.message}
								label={i18n.t("Colors")}
							>
								<ColorScaleSelect
									count={scale ?? defaultClasses}
									colorClass={
										colorClass ?? defaultColorScaleName
									}
									width={300}
									onChange={onChange}
								/>
							</Field>
						);
					}}
				/>
			</div>
		</div>
	);
}
