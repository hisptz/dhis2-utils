import { ScorecardConfigProvider } from "./ConfigProvider";
import { ScorecardStateProvider } from "./StateProvider";
import { ScorecardMetaProvider } from "./MetaProvider";
import type { ReactNode } from "react";
import type { ScorecardConfig, ScorecardState } from "../schemas/config";

interface ScorecardContextProps {
	children: ReactNode;
	config: ScorecardConfig;
	initialState?: ScorecardState;
}

export function ScorecardContext({
	config,
	children,
	initialState,
}: ScorecardContextProps) {
	return (
		<ScorecardConfigProvider config={config}>
			<ScorecardStateProvider initialState={initialState}>
				<ScorecardMetaProvider>{children}</ScorecardMetaProvider>
			</ScorecardStateProvider>
		</ScorecardConfigProvider>
	);
}
