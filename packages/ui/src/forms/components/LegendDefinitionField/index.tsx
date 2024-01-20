import { Field, Input, Popover, ReferenceElement } from "@dhis2/ui";
import PropTypes from "prop-types";
import React, { useState } from "react";
import type { Color } from "react-color";
import { SketchPicker } from "react-color";
import { uid } from "@hisptz/dhis2-utils";
import classes from "./LegendDefinitionField.module.css";
import { FieldProps, LegendDefinition } from "../../interfaces";

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

ColorPickerPopper.propTypes = {
	reference: PropTypes.object,
	value: PropTypes.string,
	onChange: PropTypes.func,
	onClose: PropTypes.func,
};

export interface LegendDefinitionFieldProps extends FieldProps {
	label?: string;
	value?: LegendDefinition;
}

export const LegendDefinitionField = React.forwardRef(
	(
		{ name, label, value, onChange, ...props }: LegendDefinitionFieldProps,
		ref: React.Ref<any>,
	) => {
		const { color, name: legendName, id } = value ?? {};
		const [reference, setReference] = useState<
			ReferenceElement | undefined
		>(undefined);

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
	},
);
