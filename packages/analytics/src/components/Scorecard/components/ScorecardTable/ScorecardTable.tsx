import { DataTable, type DataTableProps } from "@dhis2/ui";
import { TableHeader } from "./components/TableHeader";
import { TableBody } from "./components/TableBody";
import { TableFoot } from "./components/TableFoot";
import { DndContext } from "@dnd-kit/core";
import { useScorecardSetState } from "../StateProvider";
import { memo } from "react";

export interface ScorecardTableProps extends Omit<DataTableProps, "children"> {}

export const ScorecardTable = memo(function TableComponent(
	props: ScorecardTableProps,
) {
	const updateState = useScorecardSetState();
	return (
		<DndContext
			onDragEnd={(event) => {
				if (updateState) {
					if (!event.over || event.over.id === event.active.id) {
						updateState((prevState) => {
							return {
								...prevState,
								options: {
									...prevState.options,
									showDataInRows:
										!prevState.options.showDataInRows,
								},
							};
						});
					}
				}
			}}
		>
			<DataTable {...props} layout="auto">
				<TableHeader />
				<TableBody />
				<TableFoot />
			</DataTable>
		</DndContext>
	);
});
