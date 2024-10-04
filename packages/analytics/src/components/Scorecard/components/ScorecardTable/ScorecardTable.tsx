import { CircularLoader, DataTable, type DataTableProps } from "@dhis2/ui";
import { TableHeader } from "./components/TableHeader";
import { TableBody } from "./components/TableBody";
import { TableFoot } from "./components/TableFoot";
import { DndContext } from "@dnd-kit/core";
import { useScorecardSetState } from "../StateProvider";
import { memo, useRef, useTransition } from "react";

export interface ScorecardTableProps extends Omit<DataTableProps, "children"> {}

export const ScorecardTable = memo(function TableComponent(
	props: ScorecardTableProps,
) {
	const tableRef = useRef<HTMLTableElement>(null);
	const [isPending, startTransition] = useTransition();
	const updateState = useScorecardSetState();

	if (isPending) {
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
		<DndContext
			onDragEnd={(event) => {
				startTransition(() => {
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
				});
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
