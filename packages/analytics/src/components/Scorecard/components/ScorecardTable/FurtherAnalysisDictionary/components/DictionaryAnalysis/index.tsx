import React from "react";
import TopBar from "./modules/TopBar";
import DataSourceSelector from "./modules/TopBar/Components/DataSourceSelector";
import type { ScorecardDataSource } from "../../../../../schemas/config";
import { DictionaryConfigProvider } from "../ConfigProvider";
import { head } from "lodash";

export interface DictionaryAnalysisProps {
	dataSources: ScorecardDataSource[];
}

export default function DictionaryAnalysis({
	dataSources,
}: DictionaryAnalysisProps) {
	return (
		<DictionaryConfigProvider
			initialConfig={{
				dataSources,
				selectedDataSource: head(dataSources),
			}}
		>
			<div style={{ overflow: "hidden" }} className="column">
				<TopBar />
				<div
					style={{
						overflow: "auto",
						maxHeight: "100%",
						flex: 1,
						padding: " 0 16px",
					}}
				>
					<DataSourceSelector />
				</div>
			</div>
		</DictionaryConfigProvider>
	);
}
