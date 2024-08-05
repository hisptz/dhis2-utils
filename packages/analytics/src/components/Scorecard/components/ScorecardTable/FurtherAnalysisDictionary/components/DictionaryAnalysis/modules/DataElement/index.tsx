import React from "react";
import Introduction from "./components/introduction/introduction";
import { DetailsProvider } from "../../../DetailsProvider";
import { useDictionaryConfigState } from "../../../ConfigProvider";
import DataSource from "./components/DataSource/dataSource";

export default function DataElementPage() {
	const [config] = useDictionaryConfigState();

	return (
		<DetailsProvider fields={["*"]} dataItem={config.selectedDataSource!}>
			<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
				<Introduction />
				<DataSource />
				{/*<Facts id={id} />*/}
				{/*<AnalyticsDetails id={id} />*/}

				{/*<RelatedIndicator id={id} resourceType={"Data Element"} />*/}

				{/*<AccessibilityAndSharing*/}
				{/*	id={id}*/}
				{/*	resourceType={"dataElements"}*/}
				{/*/>*/}
			</div>
		</DetailsProvider>
	);
}
