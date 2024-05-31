import { FieldProps } from "../../interfaces/index.js";
import React from "react";
import { CheckboxField } from "@dhis2/ui";

export interface CustomCheckboxFieldProps extends FieldProps {
	trueOnly?: boolean;
}

export const CustomCheckboxField = React.forwardRef(
	(
		{
			value,
			onChange,
			name,
			error,
			trueOnly,
			...props
		}: CustomCheckboxFieldProps,
		ref: React.ForwardedRef<any>,
	) => {
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
	},
);
