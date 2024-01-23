import { Controller } from "react-hook-form";
import {
	MultiSelectField,
	MultiSelectOption,
	SingleSelectField,
	SingleSelectOption,
} from "@dhis2/ui";
import { capitalize, head } from "lodash";
import i18n from "@dhis2/d2-i18n";
import React from "react";
import { useType } from "../hooks/data.js";

export function AggregationSelector() {
	const config = useType();

	if (!config?.defaultAggregations) {
		return null;
	}

	const supportedAggregations = config?.defaultAggregations ?? [];

	const maxAggregations = config?.maxAggregations;

	return (
		<Controller
			render={({ field, fieldState }) => {
				return maxAggregations === 1 ? (
					<SingleSelectField
						clearable
						error={Boolean(fieldState.error)}
						validationText={fieldState?.error?.message}
						selected={
							supportedAggregations.includes(
								head(field.value) ?? "",
							)
								? head(field.value)
								: undefined
						}
						onChange={({ selected }: { selected: string }) =>
							field.onChange([selected])
						}
						label={i18n.t("Aggregation")}
					>
						{supportedAggregations.map((aggregation) => (
							<SingleSelectOption
								key={`${aggregation}-option`}
								label={capitalize(aggregation)}
								value={aggregation}
							/>
						))}
					</SingleSelectField>
				) : (
					<MultiSelectField
						error={Boolean(fieldState.error)}
						validationText={fieldState?.error?.message}
						selected={field.value?.filter(
							(value: string) =>
								supportedAggregations?.includes(value),
						)}
						onChange={({ selected }: { selected: string[] }) =>
							field.onChange(selected)
						}
						label={i18n.t("Aggregations")}
					>
						{supportedAggregations.map((aggregation) => (
							<MultiSelectOption
								key={`${aggregation}-option`}
								label={capitalize(aggregation)}
								value={aggregation}
							/>
						))}
					</MultiSelectField>
				);
			}}
			name={"aggregations"}
		/>
	);
}
