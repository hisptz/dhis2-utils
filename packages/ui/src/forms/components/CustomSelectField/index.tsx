import { SingleSelectField, SingleSelectOption } from "@dhis2/ui";
import React, { useMemo } from "react";
import { FieldProps } from "../../interfaces";
import { OptionSet } from "@hisptz/dhis2-utils";

export interface SelectOption {
	label: string;
	value: any;
}

export interface CustomSelectFieldProps extends FieldProps {
	filterable?: boolean;
	optionSet: OptionSet;

	[key: string]: any;
}

export const CustomSelectField = React.forwardRef(
	(
		{
			filterable,
			onChange,
			optionSet,
			value,
			error,
			warning,
			...props
		}: CustomSelectFieldProps,
		ref: React.ForwardedRef<any>,
	) => {
		const options = useMemo(
			() =>
				optionSet?.options?.map(({ code, name }) => ({
					label: name ?? "",
					value: code,
				})) ?? [],
			[optionSet],
		);

		const selectedValue = useMemo(() => {
			if (value) {
				return (
					options.find(
						(option: { value: string }) => option.value === value,
					)?.value ?? ""
				);
			}
			return "";
		}, [options, value]);

		const validationText =
			typeof warning === "string"
				? warning
				: typeof error === "string"
					? error
					: undefined;

		return (
			<SingleSelectField
				ref={ref}
				selected={selectedValue}
				onChange={({ selected }: { selected: any }) =>
					onChange(selected)
				}
				error={!!error}
				validationText={validationText}
				filterable={options.length > 5}
				warning={Boolean(warning)}
				{...props}
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
	},
);
