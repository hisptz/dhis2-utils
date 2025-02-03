import { Field, Input, Popover, ReferenceElement } from "@dhis2/ui";
import React, { useState } from "react";
import type { Color } from "react-color";
import { SketchPicker } from "react-color";
import { uid } from "@hisptz/dhis2-utils";
import classes from "./LegendDefinitionField.module.css";
import { LegendDefinition } from "../../interfaces";

type ColorPickerProps = {
	reference: ReferenceElement;
	value: any;
	onClose: () => void;
	onChange: (value: any) => void;
};

function ColorPickerPopper({
	reference,
	value,
	onClose,
	onChange,
}: ColorPickerProps) {
	return (
		<Popover
			reference={reference}
			placement="auto"
			/*
      // @ts-ignore */
			strategy="fixed"
			className="popper"
			onClickOutside={onClose}
		>
			<SketchPicker
				color={
					{
						hex: value,
					} as unknown as Color
				}
				onChange={(color: { hex: any }) => {
					onChange(color.hex);
					onClose();
				}}
			/>
		</Popover>
	);
}

export interface LegendDefinitionFieldProps {
	/**
	 * The name of the field. Useful (required) in tools like react hook form to track field changes. For multiple fields, this value must be unique
	 * */
	name: string;
	/**
	 * Field label that will appear on top of the field
	 * */
	label?: string;
	/**
	 * Field value
	 * */
	/**
	 * A function that is called whenever the value of the field changes
	 * */
	onChange: (value: LegendDefinition) => void;
	/**
	 * An error message to display when the field has an error. Also accepts boolean for only showing the field's error state without any message
	 * */
	error?: string | boolean;

	/**
	 * Indicates that the field is required by showing an asterisk(*) on the field's label
	 * */
	required?: boolean;
	/**
	 * A warning string that will be shown with the warning styles on the fields. Accepts boolean to only show field's warning state without any messsage
	 * */
	warning?: string | boolean;

	[key: string]: any;

	value?: LegendDefinition;
}

export const LegendDefinitionField = React.forwardRef<
	HTMLDivElement,
	LegendDefinitionFieldProps
>(({ name, label, value, onChange, ...props }, ref) => {
	const { color, name: legendName, id } = value ?? {};
	const [reference, setReference] = useState<ReferenceElement | undefined>(
		undefined,
	);

	const onColorChange = (color: any) => {
		onChange({
			...value,
			id: id ?? uid(),
			color,
		});
	};

	const onNameChange = (newName: { value?: string }) => {
		onChange({
			...value,
			id: id ?? uid(),
			name: newName.value,
		});
	};

	return (
		<Field
			{...props}
			error={!!props.error}
			warning={!!props.warning}
			name={name}
			label={label}
		>
			<div
				ref={ref}
				id={name}
				className={classes["legend-definition-container"]}
			>
				<div
					id={`color-selector-btn-${id}`}
					onClick={(e) => setReference(e.currentTarget)}
					style={{
						background: color,
						borderColor: "#D5DDE5",
						minWidth: 100,
					}}
					className={classes["legend-color"]}
				>
					{color}
				</div>
				<div className={classes["legend-input"]}>
					<Input
						dataTest={`legend-definition-text-${id}`}
						onChange={onNameChange}
						value={legendName}
					/>
				</div>
			</div>
			{reference && (
				<ColorPickerPopper
					onClose={() => setReference(undefined)}
					reference={reference}
					value={value?.color}
					onChange={onColorChange}
				/>
			)}
		</Field>
	);
});
