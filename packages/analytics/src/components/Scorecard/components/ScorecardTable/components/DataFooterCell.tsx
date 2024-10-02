import type { HeaderContext } from "@tanstack/react-table";
import type {
	ScorecardTableCellConfig,
	ScorecardTableData,
} from "../../../schemas/config";
import { useMemo } from "react";
import { head } from "lodash";
import { useScorecardStateSelector } from "../../StateProvider";
import { SingleDataFooterCell } from "./SingleDataFooterCell";
import { LinkedDataFooterCell } from "./LinkedDataFooterCell";
import { DataTableCell } from "@dhis2/ui";

export function DataFooterCell({
	table,
	column,
	header,
}: HeaderContext<ScorecardTableData, ScorecardTableCellConfig>) {
	const showDataInRows = useScorecardStateSelector<boolean>([
		"options",
		"showDataInRows",
	]);
	const dataSources = useMemo(() => {
		const dataValue = head(table.getRowModel().rows)?.getValue(
			column.id,
		) as ScorecardTableCellConfig;

		return dataValue.dataSources;
	}, [table.getRowModel().rows]);

	if (dataSources?.length === 1 || showDataInRows) {
		return (
			<SingleDataFooterCell
				header={header}
				column={column}
				table={table}
				dataSource={head(dataSources)!}
			/>
		);
	}

	if (!dataSources) {
		return <DataTableCell />;
	}

	return (
		<LinkedDataFooterCell
			column={column}
			header={header}
			table={table}
			dataSources={dataSources}
		/>
	);
}
