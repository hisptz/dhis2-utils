import { createContext, type ReactNode, useContext } from "react";
import type {
	ScorecardAnalyticsData,
	ScorecardTableData,
} from "../schemas/config";
import { useGetScorecardData } from "../hooks/data";
import { CircularLoader } from "@dhis2/ui";

export interface ScorecardData {
	loading: boolean;
	progress?: number;
	data: ScorecardTableData[];
	rawData: ScorecardAnalyticsData[];
}

const ScorecardDataContext = createContext<ScorecardData>({
	loading: false,
	data: [],
	rawData: [],
});

export function useScorecardData() {
	return useContext(ScorecardDataContext);
}

export function ScorecardDataProvider({ children }: { children: ReactNode }) {
	const value = useGetScorecardData();

	if (value.loading) {
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
		<ScorecardDataContext.Provider value={value}>
			{children}
		</ScorecardDataContext.Provider>
	);
}
