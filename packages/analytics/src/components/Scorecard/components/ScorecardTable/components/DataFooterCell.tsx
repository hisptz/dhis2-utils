import type { HeaderContext } from "@tanstack/react-table";
import type {
	ScorecardTableCellData,
	ScorecardTableData,
} from "../../../schemas/config";
import { useMemo } from "react";
import { head } from "lodash";
import { useScorecardState } from "../../StateProvider";
import { SingleDataFooterCell } from "./SingleDataFooterCell";
import { LinkedDataFooterCell } from "./LinkedDataFooterCell";
import { DataTableCell } from "@dhis2/ui";

export function DataFooterCell({
	table,
	column,
	header,
}: HeaderContext<ScorecardTableData, ScorecardTableCellData>) {
	const state = useScorecardState();
	const dataSources = useMemo(() => {
		const dataValue = head(table.getRowModel().rows)?.getValue(
			column.id,
		) as ScorecardTableCellData;

		console.log({ dataValue });

		return dataValue.dataSources;
	}, [state, table.getRowModel().rows]);

	console.log({
		dataSources,
	});

	if (dataSources?.length === 1 || state?.options?.showDataInRows) {
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
