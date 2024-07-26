import type { ScorecardConfig, ScorecardState } from "./schemas/config";
import React from "react";
import { ScorecardConfigProvider } from "./components/ConfigProvider";
import { ScorecardMetaProvider } from "./components/MetaProvider";
import { ScorecardStateProvider } from "./components/StateProvider";

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
					<></>
				</ScorecardMetaProvider>
			</ScorecardStateProvider>
		</ScorecardConfigProvider>
	);
}
