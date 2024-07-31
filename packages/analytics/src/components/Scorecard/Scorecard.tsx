import type { ScorecardConfig, ScorecardState } from "./schemas/config";
import React from "react";
import { ScorecardConfigProvider } from "./components/ConfigProvider";
import { ScorecardMetaProvider } from "./components/MetaProvider";
import { ScorecardStateProvider } from "./components/StateProvider";
import { TableStateProvider } from "./components/TableStateProvider";
import { ScorecardTable } from "./components/ScorecardTable";
import { ScorecardDataProvider } from "./components/DataProvider";

export interface ScorecardProps {
	config: ScorecardConfig;
	state: ScorecardState;
}

export function Scorecard({
	config,
	state,
}: ScorecardProps): React.ReactElement {
	return (
		<ScorecardConfigProvider config={config}>
			<ScorecardStateProvider config={state}>
				<ScorecardMetaProvider>
					<ScorecardDataProvider>
						<TableStateProvider>
							<ScorecardTable />
						</TableStateProvider>
					</ScorecardDataProvider>
				</ScorecardMetaProvider>
			</ScorecardStateProvider>
		</ScorecardConfigProvider>
	);
}
