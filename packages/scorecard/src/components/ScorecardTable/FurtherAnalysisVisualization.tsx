import { getOrgUnitsForAnalytics } from "../../utils/orgUnits";
import type { FurtherAnalysisConfig } from "./components/FurtherAnalysisModal";
import { Visualization } from "@hisptz/dhis2-analytics";

export type DataItemType = "dataElement" | "indicator" | "programIndicator";

export interface FurtherAnalysisVisualizationProps {
	config: FurtherAnalysisConfig;
}

export function FurtherAnalysisVisualization({
	config,
}: FurtherAnalysisVisualizationProps) {
	const orgUnits = getOrgUnitsForAnalytics(config.orgUnitSelection);
	const periods = config.periodSelection.periods.map(({ id }) => id);
	const dataItems = config.dataSources.map(({ id }) => id);
	return (
		<div
			style={{
				width: "100%",
				height: 400,
				padding: 32,
				minHeight: 500,
				maxHeight: "80dvh",
			}}
		>
			<Visualization
				height={400}
				layout={{
					columns: ["dx"],
					filters: ["pe"],
					rows: ["ou"],
				}}
				showToolbar
				showOrgUnitSelector
				showPeriodSelector
				defaultVisualizationType={"chart"}
				dimensions={{
					ou: orgUnits,
					pe: periods,
					dx: dataItems,
				}}
				config={{
					chart: {
						type: "column",
						layout: {
							filter: ["pe"],
							category: ["ou"],
							series: ["dx"],
						},
					},
					pivotTable: {},
					map: {
						showPeriodTitle: true,
						thematicLayers: config.dataSources.map((item) => ({
							enabled: true,
							name: item.label,
							id: item.id,
							type: "choropleth",
							dataItem: {
								type: item.type as DataItemType,
								displayName: item.label!,
								id: item.id,
								legendConfig: {
									colorClass: "YlOrBr",
									scale: 7,
								},
							},
						})),
					},
				}}
			/>
		</div>
	);
}
