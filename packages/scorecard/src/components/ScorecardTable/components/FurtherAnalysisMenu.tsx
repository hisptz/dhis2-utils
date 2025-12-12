import { useMemo, useState } from "react";
import {
	IconDimensionOrgUnit16,
	IconVisualizationColumnStacked16,
	IconVisualizationColumnStacked24,
	IconVisualizationLine24,
	Menu,
	MenuItem,
	Popover,
	type ReferenceElement,
} from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { useLowestOrgUnitLevel } from "../../../hooks/orgUnit";
import type { ItemMeta } from "../../../hooks/metadata";
import { getOrgUnitLevel } from "../../../utils/orgUnits";
import type { FurtherAnalysisConfig } from "./FurtherAnalysisModal";
import type { ScorecardDataSource } from "../../../schemas/config";

export function FurtherAnalysisMenu({
	stateActionRef,
	setStateActionRef,
	orgUnit,
	onSelect,
	periodId,
	dataSources,
}: {
	stateActionRef: ReferenceElement;
	setStateActionRef: (val: undefined) => void;
	orgUnit: ItemMeta & { hierarchy: string };
	onSelect: (config: FurtherAnalysisConfig) => void;
	periodId: string;
	dataSources: ScorecardDataSource[];
}) {
	const lowestLevel = useLowestOrgUnitLevel();
	const orgUnitInLowestLevel = useMemo(() => {
		return getOrgUnitLevel(orgUnit) === lowestLevel?.level;
	}, [orgUnit, lowestLevel?.level]);
	const [showSubMenu, setShowSubMenu] = useState(false);

	return (
		<>
			<Popover
				onClickOutside={() => setStateActionRef(undefined)}
				placement="bottom-start"
				reference={stateActionRef}
			>
				<Menu>
					<MenuItem
						dense
						onClick={() => {
							onSelect({
								periodSelection: {
									periods: [
										{
											id: periodId,
										},
									],
								},
								orgUnitSelection: {
									levels: [],
									groups: [],
									orgUnits: [
										{
											id: orgUnit.uid,
										},
									],
								},
								dataSources,
							});
							setStateActionRef(undefined);
						}}
						label={i18n.t("Further Analysis")}
						icon={<IconVisualizationColumnStacked16 />}
					/>
					{!orgUnitInLowestLevel && (
						<MenuItem
							dense
							onClick={() => {
								setStateActionRef(undefined);
								onSelect({
									periodSelection: {
										periods: [
											{
												id: periodId,
											},
										],
									},
									orgUnitSelection: {
										levels: [
											(
												+(
													getOrgUnitLevel(orgUnit) ??
													0
												) + 1
											).toString(),
										],
										groups: [],
										orgUnits: [
											{
												id: orgUnit.uid,
											},
										],
									},
									dataSources,
								});
							}}
							label={i18n.t("Lower Organisation Unit Levels")}
							icon={<IconDimensionOrgUnit16 />}
						/>
					)}
					<MenuItem
						dense
						showSubMenu={showSubMenu}
						active={showSubMenu}
						toggleSubMenu={() => {
							setShowSubMenu((prevState) => !prevState);
						}}
						label={i18n.t("Trend Analysis ")}
						icon={<IconVisualizationLine24 />}
					>
						<MenuItem
							dense
							onClick={() => {
								setStateActionRef(undefined);
								onSelect({
									periodSelection: {
										periods: [
											{
												id: "LAST_3_MONTHS",
											},
										],
									},
									type: {
										visualizationType: "chart",
										chartType: "line",
									},
									layout: {
										columns: ["dx"],
										rows: ["pe"],
										filters: ["ou"],
									},
									orgUnitSelection: {
										levels: [],
										groups: [],
										orgUnits: [
											{
												id: orgUnit.uid,
											},
										],
									},
									dataSources,
								});
							}}
							label={i18n.t("Last 3 Months")}
							icon={<IconVisualizationColumnStacked24 />}
						/>
						<MenuItem
							dense
							onClick={() => {
								setStateActionRef(undefined);
								onSelect({
									periodSelection: {
										periods: [
											{
												id: "LAST_6_MONTHS",
											},
										],
									},
									type: {
										visualizationType: "chart",
										chartType: "line",
									},
									layout: {
										columns: ["dx"],
										rows: ["pe"],
										filters: ["ou"],
									},
									orgUnitSelection: {
										levels: [],
										groups: [],
										orgUnits: [
											{
												id: orgUnit.uid,
											},
										],
									},
									dataSources,
								});
							}}
							label={i18n.t("Last 6 Months")}
							icon={<IconVisualizationColumnStacked24 />}
						/>
						<MenuItem
							dense
							onClick={() => {
								setStateActionRef(undefined);
								onSelect({
									periodSelection: {
										periods: [
											{
												id: "LAST_12_MONTHS",
											},
										],
									},
									type: {
										visualizationType: "chart",
										chartType: "line",
									},
									layout: {
										columns: ["dx"],
										rows: ["pe"],
										filters: ["ou"],
									},
									orgUnitSelection: {
										levels: [],
										groups: [],
										orgUnits: [
											{
												id: orgUnit.uid,
											},
										],
									},
									dataSources,
								});
							}}
							label={i18n.t("Last 12 Months")}
							icon={<IconVisualizationColumnStacked24 />}
						/>
						<MenuItem
							dense
							onClick={() => {
								setStateActionRef(undefined);
								onSelect({
									periodSelection: {
										periods: [
											{
												id: "LAST_4_QUARTERS",
											},
										],
									},
									type: {
										visualizationType: "chart",
										chartType: "line",
									},
									layout: {
										columns: ["dx"],
										rows: ["pe"],
										filters: ["ou"],
									},
									orgUnitSelection: {
										levels: [],
										groups: [],
										orgUnits: [
											{
												id: orgUnit.uid,
											},
										],
									},
									dataSources,
								});
							}}
							label={i18n.t("Last 4 Quarters")}
							icon={<IconVisualizationColumnStacked24 />}
						/>
						<MenuItem
							dense
							onClick={() => {
								setStateActionRef(undefined);
								onSelect({
									periodSelection: {
										periods: [
											{
												id: "LAST_5_YEARS",
											},
										],
									},
									type: {
										visualizationType: "chart",
										chartType: "line",
									},
									layout: {
										columns: ["dx"],
										rows: ["pe"],
										filters: ["ou"],
									},
									orgUnitSelection: {
										levels: [],
										groups: [],
										orgUnits: [
											{
												id: orgUnit.uid,
											},
										],
									},
									dataSources,
								});
							}}
							label={i18n.t("Last 5 Years")}
							icon={<IconVisualizationColumnStacked24 />}
						/>
					</MenuItem>
				</Menu>
			</Popover>
		</>
	);
}
