import { Controller, useFormContext } from "react-hook-form";
import i18n from "@dhis2/d2-i18n";
import { SingleSelectField, SingleSelectOption } from "@dhis2/ui";
import React from "react";

export function TypeField() {
	const { setValue } = useFormContext();
	const resetFields = (type: string) => {
		if (type === "bubble") {
			setValue(`radius`, {
				min: 5,
				max: 30,
			});
		} else {
			setValue(`radius`, undefined);
		}
	};

	return (
		<Controller
			rules={{
				required: i18n.t("Layer type is required"),
			}}
			render={({ field, fieldState }) => {
				return (
					<SingleSelectField
						label={i18n.t("Layer type")}
						required
						error={Boolean(fieldState.error)}
						validationText={fieldState.error?.message}
						onChange={({ selected }: { selected: string }) => {
							resetFields(selected);
							field.onChange(selected);
						}}
						selected={field.value}
					>
						<SingleSelectOption
							value={"choropleth"}
							label={i18n.t("Choropleth")}
						/>
						<SingleSelectOption
							value={"bubble"}
							label={i18n.t("Bubble")}
						/>
					</SingleSelectField>
				);
			}}
			name={"type"}
		/>
	);
}
