import { ScorecardConfigProvider } from "./ConfigProvider";
import { ScorecardStateProvider } from "./StateProvider";
import { ScorecardMetaProvider } from "./MetaProvider";
import type { ReactNode } from "react";
import type { ScorecardConfig } from "../schemas/config";

interface ScorecardContextProps {
	children: ReactNode;
	config: ScorecardConfig;
}

export function ScorecardContext({ config, children }: ScorecardContextProps) {
	return (
		<ScorecardConfigProvider config={config}>
			<ScorecardStateProvider config={config}>
				<ScorecardMetaProvider>{children}</ScorecardMetaProvider>
			</ScorecardStateProvider>
		</ScorecardConfigProvider>
	);
}
