import { Analytics, LegendSet } from "@hisptz/dhis2-utils";
import { DHIS2PivotTableEngine, type EngineConfig } from "./services/engine.js";
import React, { useMemo } from "react";
import { DHIS2PivotTableEngineProvider } from "./state/engine.js";
import { PivotTable } from "./components/Table/index.js";
import { TableHeaders } from "./components/TableHeaders/index.js";
import { CustomPivotTableBody } from "./components/TableBody/index.js";
import { DataTableProps } from "@dhis2/ui";

export interface DHIS2PivotTableOptions {
	legendSets?: LegendSet[];
	hideEmptyColumns?: boolean;
	hideEmptyRows?: boolean;
	showRowTotals?: boolean;
	showColumnTotals?: boolean;
	showRowSubtotals?: boolean;
	showColumnSubtotals?: boolean;
	fixColumnHeaders?: boolean;
	fixRowHeaders?: boolean;
	showFilterAsTitle?: boolean;
}

export interface DHIS2PivotTableProps {
	analytics: Analytics;
	tableProps?: DataTableProps;
	setRef?: (ref: HTMLTableElement) => void;
	config: EngineConfig;
}

export function DHIS2PivotTable({
	analytics,
	config,
	tableProps,
	setRef,
}: DHIS2PivotTableProps) {
	const engine = useMemo(
		() => new DHIS2PivotTableEngine({ analytics, config }),
		[analytics, config],
	);

	return (
		<DHIS2PivotTableEngineProvider engine={engine}>
			<PivotTable setRef={setRef} tableProps={tableProps}>
				<TableHeaders />
				<CustomPivotTableBody />
			</PivotTable>
		</DHIS2PivotTableEngineProvider>
	);
}
