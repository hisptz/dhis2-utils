import { createContext, type ReactNode, useContext } from "react";
import { type ItemMeta, useGetScorecardMeta } from "../hooks/metadata";
import { CircularLoader } from "@dhis2/ui";

export interface ScorecardMeta {
	periods: Array<ItemMeta>;
	orgUnits: Array<ItemMeta>;
	dataItems: Array<ItemMeta>;
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
	const { loading, ...meta } = useGetScorecardMeta();

	if (loading) {
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
