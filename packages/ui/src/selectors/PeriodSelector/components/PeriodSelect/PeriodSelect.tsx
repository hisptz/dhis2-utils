import i18n from "@dhis2/d2-i18n";
import {
	CssReset,
	InputField,
	SingleSelectField,
	SingleSelectOption,
	Tab,
	TabBar,
	Transfer,
} from "@dhis2/ui";
import { capitalize, compact } from "lodash";
import React from "react";
import { usePeriodGenerator } from "../Selector/hooks/index.js";
import PeriodTransferOption from "./components/TransferOption.js";
import { PeriodSelectProps } from "./interfaces/props.js";
import {
	BasePeriod,
	BasePeriodType,
	PeriodTypeCategory,
	PeriodUtility,
} from "@hisptz/dhis2-utils";

/**
 * The PeriodSelect component allows selection of both relative and fixed periods.
 *
 * Features:
 *
 *  - Period type filtering
 *  - Future periods control
 *
 * @param {object} props - The properties for the PeriodSelect component.
 * @param {Array<string>} props.excludedPeriodTypes - The types of periods to exclude from the options.
 * @param {(items: Array<string>) => void} props.onSelect - The callback function to be called when period(s) are selected.
 * @param {Array<string>} props.selectedPeriods - The currently selected periods.
 * @param {boolean} [props.excludeFixedPeriods] - Whether to exclude fixed periods from the options. Defaults to false.
 * @param {boolean} [props.excludeRelativePeriods] - Whether to exclude relative periods from the options. Defaults to false.
 * @param {boolean} [props.singleSelection] - Whether to allow only one period to be selected. Defaults to false.
 * @param {boolean} [props.allowFuturePeriods] - Whether to allow future periods to be shown. Defaults to false.
 *
 */
export default function PeriodSelect({
	excludedPeriodTypes,
	onSelect,
	selectedPeriods,
	excludeFixedPeriods,
	excludeRelativePeriods,
	singleSelection,
	allowFuturePeriods,
}: PeriodSelectProps) {
	const {
		categories,
		setCategory,
		category,
		periodTypeId,
		setPeriodTypeId,
		periodTypes,
		year,
		setYear,
		periods,
	} = usePeriodGenerator(
		{
			allowFuturePeriods: allowFuturePeriods ?? false,
		},
		{
			excludeFixedPeriods: excludeFixedPeriods,
			excludedPeriodTypes,
			excludeRelativePeriods,
		},
	);

	return (
		<div
			style={{
				maxHeight: 500,
				overflow: "auto",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				width: "100%",
			}}
		>
			<CssReset />
			<Transfer
				maxSelections={singleSelection ? 1 : undefined}
				selected={selectedPeriods}
				selectedWidth={"400px"}
				optionsWidth={"400px"}
				height={"400px"}
				leftHeader={
					<div className="column pb-8">
						<TabBar fixed>
							{categories?.map((periodCategory) => (
								<Tab
									dataTest={`${periodCategory}-tab`}
									onClick={() => {
										setCategory(periodCategory);
									}}
									selected={category === periodCategory}
									key={`${periodCategory}-tab`}
								>
									{capitalize(periodCategory)}
								</Tab>
							))}
						</TabBar>
						{category === PeriodTypeCategory.RELATIVE ? (
							<div style={{ padding: "8px 0" }}>
								<SingleSelectField
									dataTest={"relative-period-type-selector"}
									dense
									selected={periodTypeId}
									onChange={({
										selected,
									}: {
										selected: string;
									}) => setPeriodTypeId(selected)}
									label={i18n.t("Period Type")}
								>
									{periodTypes?.map(
										(periodType: BasePeriodType) => (
											<SingleSelectOption
												dataTest={`${periodType?.id}-type`}
												key={periodType?.id}
												label={periodType.config.name}
												value={periodType?.id}
											/>
										),
									)}
								</SingleSelectField>
							</div>
						) : (
							<div
								style={{
									display: "grid",
									gridTemplateColumns: "3fr 1fr",
									gap: 8,
									padding: "8px 0",
								}}
							>
								<div>
									<SingleSelectField
										dense
										dataTest={"fixed-period-type-selector"}
										selected={periodTypeId}
										onChange={({
											selected,
										}: {
											selected: string;
										}) => setPeriodTypeId(selected)}
										label={i18n.t("Period Type")}
									>
										{periodTypes?.map(
											(periodType: BasePeriodType) => (
												<SingleSelectOption
													dataTest={`${periodType?.id}-type`}
													key={periodType?.id}
													label={
														periodType.config.name
													}
													value={periodType?.id}
												/>
											),
										)}
									</SingleSelectField>
								</div>
								<div>
									<InputField
										dataTest="year-input"
										name={"year"}
										dense
										label={i18n.t("Year")}
										type={"number"}
										value={year.toString()}
										max={
											!allowFuturePeriods
												? new Date()
														.getFullYear()
														.toString()
												: undefined
										}
										onChange={({
											value,
										}: {
											value?: string;
										}) => {
											if (!value) {
												return;
											}

											const parsedValue = parseInt(
												value.toString(),
											);
											if (
												!allowFuturePeriods &&
												parsedValue >
													new Date().getFullYear()
											) {
												return;
											}
											setYear(parsedValue);
										}}
									/>
								</div>
							</div>
						)}
					</div>
				}
				options={[
					...periods,
					...(selectedPeriods?.map((id) =>
						PeriodUtility.getPeriodById(id),
					) ?? []),
				]?.map((period: BasePeriod) => {
					return {
						label: period?.name,
						value: period?.id,
						key: period?.id,
					};
				})}
				renderOption={(options: any) => (
					<PeriodTransferOption {...options} />
				)}
				onChange={({ selected }: { selected: Array<string> }) => {
					if (onSelect) {
						onSelect({
							items: compact(
								selected.map((id) => {
									try {
										return id;
									} catch (e) {
										return undefined;
									}
								}),
							),
						});
					}
				}}
			/>
		</div>
	);
}
