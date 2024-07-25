import type { ScorecardConfig } from "./schemas/config";
import React from "react";
import { ScorecardConfigProvider } from "./components/ConfigProvider";
import { ScorecardMetaProvider } from "./components/MetaProvider";

export interface ScorecardProps {
	config: ScorecardConfig;
}

export function Scorecard({ config }: ScorecardProps): React.ReactElement {
	return (
		<ScorecardConfigProvider config={config}>
			<ScorecardMetaProvider>
				<></>
			</ScorecardMetaProvider>
		</ScorecardConfigProvider>
	);
}
