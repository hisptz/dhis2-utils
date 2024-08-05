import React from "react";
import DataSource from "./Components/DataSource/dataSource";
import IndicatorFacts from "./Components/indicatorFacts/indicatorFacts";
import Introduction from "./Components/introduction/introduction";
import { useDictionaryConfigState } from "../../../ConfigProvider";
import { DetailsProvider } from "../../../DetailsProvider";

export default function Indicator() {
	const [config] = useDictionaryConfigState();

	return (
		<DetailsProvider
			fields={[
				"*",
				"indicatorType[id,displayName]",
				"dataSets[id,displayName,periodType,timelyDays]",
				"indicatorGroups[id,displayName,indicators[id,displayName]]",
			]}
			dataItem={config.selectedDataSource!}
		>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<Introduction />
				<DataSource />
				<IndicatorFacts />
				{/*<LegendsAnalysis id={id} />*/}
				{/*<CalculationDetails id={id} />*/}
				{/*<DataElementSIndicator />*/}
				{/*<ProgramIndicatorIndicator />*/}
				{/*<DatasetsReportingRates />*/}
				{/*<AccessibilityAndSharing id={id} resourceType={"indicators"} />*/}
			</div>
		</DetailsProvider>
	);
}
