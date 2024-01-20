import { Controller } from "react-hook-form";
import { InputField } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import React from "react";

export function RadiusField() {
	return (
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
				name={"radius.min"}
			/>
			<Controller
				render={({ field, fieldState }) => (
					<InputField
						value={field.value?.toString()}
						onChange={({ value }: { value?: string }) => {
							if (!value) return;
							field.onChange(parseInt(value));
						}}
						label={i18n.t("Max")}
						type="number"
					/>
				)}
				name={"radius.max"}
			/>
		</div>
	);
}
