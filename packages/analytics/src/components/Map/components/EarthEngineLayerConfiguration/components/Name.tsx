import { Controller, useFormContext } from "react-hook-form";
import { useEffect } from "react";
import i18n from "@dhis2/d2-i18n";
import { InputField } from "@dhis2/ui";
import { useType } from "../hooks/data.js";

export function Name() {
	const config = useType();
	const { setValue } = useFormContext();
	useEffect(() => {
		setValue("name", config?.name);
		setValue("id", config?.id);
	}, [config]);

	return (
		<Controller
			name="name"
			rules={{
				required: i18n.t("Name is required"),
			}}
			render={({ field, fieldState }) => (
				<InputField
					label={i18n.t("Layer name")}
					type="text"
					required
					error={Boolean(fieldState.error)}
					validationText={fieldState.error?.message}
					onChange={({ value }: { value?: string }) => {
						if (!value) return;
						field.onChange(value);
					}}
					value={field.value}
				/>
			)}
		/>
	);
}
