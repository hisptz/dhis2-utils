import { FieldProps, LegendDefinition } from "../../interfaces";
import { LegendMinMax, LegendValue } from "../LegendMinMax";
import { Field } from "@dhis2/ui";
import React from "react";
import { useControlMinMaxFields } from "./hooks/control";
import { find } from "lodash";

export interface LegendMinMaxGroupProps extends FieldProps {
	value?: LegendValue[];
	legendDefinitions?: LegendDefinition[];
	highIsGood?: boolean;
	onChange: (legends: LegendValue[]) => void;
	max?: number;
	min?: number;
}

export function LegendMinMaxGroup({
	legendDefinitions = [],
	highIsGood = true,
	value,
	name,
	min,
	max,
	error,
	warning,
	onChange: onFieldChange,
	...props
}: LegendMinMaxGroupProps) {
	const { onChange } = useControlMinMaxFields({
		value,
		legendDefinitions,
		highIsGood,
		onFieldChange,
	});

	return (
		<Field
			{...props}
			error={Boolean(error)}
			warning={Boolean(warning)}
			validationText={
				typeof props.warning === "string"
					? props.warning
					: typeof error === "string"
						? error
						: undefined
			}
		>
			<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
				{legendDefinitions?.map((legendDefinition, index) => {
					const minMaxValue = find(value, [
						"legendDefinitionId",
						legendDefinition.id,
					]);
					return (
						<LegendMinMax
							min={min}
							max={max}
							value={minMaxValue}
							key={`${legendDefinition.id}-field`}
							legendDefinition={legendDefinition}
							name={`${name}.${index}`}
							onChange={onChange}
						/>
					);
				})}
			</div>
		</Field>
	);
}
