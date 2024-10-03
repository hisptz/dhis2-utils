import { createContext, type ReactNode, useContext } from "react";
import { type ItemMeta, useGetScorecardMeta } from "../hooks/metadata";
import { CircularLoader } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";

export interface ScorecardMeta {
	periods: Array<ItemMeta>;
	orgUnits: Array<ItemMeta & { hierarchy: string }>;
	dataItems: Array<ItemMeta>;
	orgUnitLevels: Array<{
		id: string;
		level: number;
		displayName: string;
	}>;
}

const ScorecardMetaContext = createContext<ScorecardMeta | null>(null);

export function useScorecardMeta() {
	return useContext(ScorecardMetaContext);
}

export const ScorecardMetaProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const { loading, called, ...meta } = useGetScorecardMeta();
	if (loading || !called) {
		return (
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<CircularLoader small />
			</div>
		);
	}

	if (!meta.orgUnits && called) {
		throw Error(i18n.t("Error getting metadata for the scorecard"));
	}

	return (
		<ScorecardMetaContext.Provider
			value={{
				...meta,
			}}
		>
			{children}
		</ScorecardMetaContext.Provider>
	);
};
