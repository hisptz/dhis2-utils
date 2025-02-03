import { FieldProps } from "../../interfaces";
import React from "react";
import { CheckboxField } from "@dhis2/ui";

export interface CustomCheckboxFieldProps extends FieldProps {
	trueOnly?: boolean;
}

export const CustomCheckboxField = ({
	value,
	onChange,
	name,
	error,
	trueOnly,
	...props
}: CustomCheckboxFieldProps) => {
	return (
		<CheckboxField
			{...props}
			name={name}
			error={!!error}
			warning={!!props.warning}
			validationText={typeof error === "string" ? error : undefined}
			checked={Boolean(value)}
			onChange={({ checked }: { checked: boolean }) => {
				if (trueOnly) {
					onChange(checked ? checked : null);
				} else {
					onChange(checked);
				}
			}}
		/>
	);
};
