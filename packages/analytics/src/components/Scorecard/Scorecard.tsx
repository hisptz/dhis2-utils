import React from "react";
import { TableStateProvider } from "./components/TableStateProvider";
import {
	ScorecardTable,
	type ScorecardTableProps,
} from "./components/ScorecardTable";
import { ScorecardDataProvider } from "./components/DataProvider";

export interface ScorecardProps {
	tableProps?: ScorecardTableProps;
}

export function Scorecard({ tableProps }: ScorecardProps): React.ReactElement {
	return (
		<ScorecardDataProvider>
			<TableStateProvider>
				<ScorecardTable {...(tableProps ?? {})} />
			</TableStateProvider>
		</ScorecardDataProvider>
	);
}
