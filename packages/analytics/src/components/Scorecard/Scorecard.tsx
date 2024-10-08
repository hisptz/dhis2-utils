import React from "react";
import { TableStateProvider } from "./components/TableStateProvider";
import {
	ScorecardTable,
	type ScorecardTableProps,
} from "./components/ScorecardTable";
import { ScorecardDataProvider } from "./components/DataProvider";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

export interface ScorecardProps {
	tableProps?: ScorecardTableProps;
}

export function Scorecard({ tableProps }: ScorecardProps): React.ReactElement {
	return (
		<ScorecardDataProvider>
			<TableStateProvider>
				<DndProvider backend={HTML5Backend}>
					<ScorecardTable {...(tableProps ?? {})} />
				</DndProvider>
			</TableStateProvider>
		</ScorecardDataProvider>
	);
}
