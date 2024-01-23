import { Controller, useFormContext } from "react-hook-form";
import React, { useEffect } from "react";
import { head, isEmpty } from "lodash";
import {
	Center,
	CircularLoader,
	SingleSelectField,
	SingleSelectOption,
} from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { useDatasetInfo, useType } from "../hooks/data.js";

export function PeriodSelector() {
	const config = useType();
	const { setValue, getValues } = useFormContext();
	const filters = config?.filters ?? [];
	const hasPeriodFilter = filters.includes("period");
	const { loading, error, periods } = useDatasetInfo(hasPeriodFilter, config);
	const initialPeriod = getValues("filters.period");

	useEffect(() => {
		if (!isEmpty(periods) && !initialPeriod) {
			setValue("filters.period", head(periods));
		}
	}, [periods]);

	if (!hasPeriodFilter) {
		return null;
	}

	if (error) {
		return (
			<div style={{ minWidth: "100%", minHeight: 100 }}>
				<Center>
					<p>{error?.message ?? error?.toString()}</p>
				</Center>
			</div>
		);
	}

	return (
		<Controller
			name="filters.period"
			rules={{
				required: i18n.t("Period is required"),
			}}
			render={({ field, fieldState }) => (
				<div style={{ gap: 4 }} className="row align-items-center">
					<div style={{ flex: 1 }}>
						<SingleSelectField
							helpText={i18n.t(
								"Available periods are set by the source data",
							)}
							loading={loading}
							filterable
							label={i18n.t("Period")}
							required
							error={Boolean(fieldState.error)}
							validationText={fieldState.error?.message}
							onChange={({ selected }: { selected: string }) =>
								field.onChange(parseInt(selected))
							}
							selected={
								periods?.includes(field.value)
									? field.value?.toString()
									: undefined
							}
						>
							{periods?.map((period: number) => (
								<SingleSelectOption
									key={`${period}-option`}
									value={period.toString()}
									label={period.toString()}
								/>
							))}
						</SingleSelectField>
					</div>
					{loading && <CircularLoader extrasmall />}
				</div>
			)}
		/>
	);
}
