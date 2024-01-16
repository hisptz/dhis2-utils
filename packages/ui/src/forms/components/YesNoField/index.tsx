import React, { useCallback } from "react";
import { FieldProps } from "../../interfaces";
import { CustomCheckboxField } from "../CustomCheckboxField";
import i18n from "@dhis2/d2-i18n";
import { SelectOption } from "../CustomSelectField";
import { Field, Radio, SingleSelectField, SingleSelectOption } from "@dhis2/ui";

export interface YesNoFieldProps extends FieldProps {
	renderAsCheckbox?: boolean;
	renderAsInputField?: boolean;
}

export function YesNoField({
	renderAsCheckbox,
	renderAsInputField,
	...input
}: YesNoFieldProps) {
	if (renderAsCheckbox) {
		return <CustomCheckboxField {...input} />;
	}
	const { value, error, onChange, warning, ...props } = input;

	if (renderAsInputField) {
		const options = [
			{ value: "true", label: i18n.t("Yes") },
			{ value: "false", label: i18n.t("No") },
		];
		const selectedValue = value?.toString();

		return (
			<SingleSelectField
				{...props}
				selected={selectedValue}
				onChange={({ selected }: { selected: any }) =>
					onChange(selected)
				}
				error={!!error}
				validationText={error}
				filterable={options.length > 5}
			>
				{options?.map(({ label, value }: SelectOption) => (
					<SingleSelectOption
						label={label}
						value={value}
						key={value}
					/>
				))}
			</SingleSelectField>
		);
	}

	const onRadioChange = useCallback(
		({ checked, name }: { checked: boolean; name: string }) => {
			if (checked) {
				if (name === "yes") {
					onChange("true");
				} else {
					onChange("false");
				}
			}
		},
		[],
	);

	return (
		<Field
			{...props}
			error={!!error}
			validationText={error ?? warning}
			warning={Boolean(warning)}
		>
			<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
				<Radio
					error={!!error}
					checked={value === "true"}
					label={i18n.t("Yes")}
					name={"yes"}
					onChange={onRadioChange}
				/>
				<Radio
					error={!!error}
					checked={value === "false"}
					label={i18n.t("No")}
					name={"no"}
					onChange={onRadioChange}
				/>
			</div>
		</Field>
	);
}
