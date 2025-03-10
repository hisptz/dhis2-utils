import type { FieldProps } from "../interfaces";
import React, { useMemo } from "react";
import type { OptionSet } from "@hisptz/dhis2-utils";
import { compact } from "lodash";
import { Field, MultiSelectField, MultiSelectOption } from "@dhis2/ui";
import type { SelectOption } from "./CustomSelectField";
import { CustomCheckboxField } from "./CustomCheckboxField";

export interface MultiTextInputFieldProps extends FieldProps {
	renderOptionAsRadio?: boolean;
	filterable?: boolean;
	optionSet: OptionSet;
}

function CheckboxMultiInputField({
	options,
	disabled,
	selected,
	onChange,
	...props
}: {
	options: { label: string; value: string }[];
	onChange: (selected: string[]) => void;
	selected: string[];
	validationText?: string;
	error?: boolean;
	warning?: boolean;
	disabled?: boolean;
	required?: boolean;
}) {
	return (
		<Field {...props}>
			<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
				{options.map((option) => (
					<CustomCheckboxField
						key={option.value}
						label={option.label}
						value={selected.includes(option.value)}
						disabled={disabled}
						name={option.value}
						onChange={() => {
							if (selected.includes(option.value)) {
								onChange(
									selected.filter(
										(value) => value !== option.value,
									),
								);
							} else {
								onChange([...selected, option.value]);
							}
						}}
					/>
				))}
			</div>
		</Field>
	);
}

export function MultiTextInputField({
	filterable,
	onChange,
	optionSet,
	value,
	error,
	warning,
	renderOptionAsRadio,
	...props
}: MultiTextInputFieldProps) {
	const options = useMemo(
		() =>
			optionSet?.options?.map(
				({ code, name }: { code: string; name?: string }) => ({
					label: name ?? "",
					value: code,
				}),
			) ?? [],
		[optionSet?.options],
	);
	const selectedValues = useMemo(() => {
		if (value) {
			const values = value.split(",");
			return compact(
				values.map(
					(value: string) =>
						options.find(
							({ value: optionValue }) => optionValue === value,
						)?.value,
				) as string[],
			);
		}
		return [];
	}, [options, value]);

	const validationText =
		typeof warning === "string"
			? warning
			: typeof error === "string"
				? error
				: undefined;

	const onValueChange = (selected: string[]) => {
		onChange(selected.join(","));
	};

	if (renderOptionAsRadio) {
		return (
			<CheckboxMultiInputField
				options={options}
				disabled={props.disabled}
				selected={selectedValues}
				onChange={(selected: string[]) => onValueChange(selected)}
				error={!!error}
				validationText={validationText}
				warning={Boolean(warning)}
				{...props}
			/>
		);
	}

	return (
		<MultiSelectField
			disabled={props.disabled}
			selected={selectedValues}
			onChange={({ selected }: { selected: string[] }) =>
				onValueChange(selected)
			}
			error={!!error}
			validationText={validationText}
			filterable={options.length > 5}
			warning={Boolean(warning)}
			{...props}
		>
			{options?.map(({ label, value }: SelectOption) => (
				<MultiSelectOption label={label} value={value} key={value} />
			))}
		</MultiSelectField>
	);
}
