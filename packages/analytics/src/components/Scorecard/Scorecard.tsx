import type { ScorecardConfig, ScorecardState } from "./schemas/config";
import React from "react";
import { ScorecardConfigProvider } from "./components/ConfigProvider";
import { ScorecardMetaProvider } from "./components/MetaProvider";
import { ScorecardStateProvider } from "./components/StateProvider";
import { TableStateProvider } from "./components/TableStateProvider";
import { ScorecardTable } from "./components/ScorecardTable";
import { ScorecardDataProvider } from "./components/DataProvider";
import {
	type ScorecardSetState,
	ScorecardSetStateProvider,
} from "./components/StateSetProvider";

export interface ScorecardProps {
	config: ScorecardConfig;
	state: ScorecardState;
	setState: ScorecardSetState;
}

export function Scorecard({
	config,
	state,
	setState,
}: ScorecardProps): React.ReactElement {
	return (
		<ScorecardConfigProvider config={config}>
			<ScorecardStateProvider config={state}>
				<ScorecardSetStateProvider setState={setState}>
					<ScorecardMetaProvider>
						<ScorecardDataProvider>
							<TableStateProvider>
								<ScorecardTable />
							</TableStateProvider>
						</ScorecardDataProvider>
					</ScorecardMetaProvider>
				</ScorecardSetStateProvider>
			</ScorecardStateProvider>
		</ScorecardConfigProvider>
	);
}
