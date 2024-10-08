import { CircularLoader, DataTable, type DataTableProps } from "@dhis2/ui";
import { TableHeader } from "./components/TableHeader";
import { TableBody } from "./components/TableBody";
import { TableFoot } from "./components/TableFoot";
import { memo, useEffect, useRef, useTransition } from "react";
import { PaginatedToolbar } from "./components/PaginatedToolbar";
import { useDragDropManager } from "react-dnd";
import { useScorecardSetState } from "../StateProvider";

export interface ScorecardTableProps extends Omit<DataTableProps, "children"> {}

export const ScorecardTable = memo(function TableComponent(
	props: ScorecardTableProps,
) {
	const tableRef = useRef<HTMLTableElement>(null);
	const manager = useDragDropManager();
	const [isPending, startTransition] = useTransition();
	const updateState = useScorecardSetState();

	useEffect(() => {
		return manager.getMonitor().subscribeToStateChange(() => {
			const dropResult = manager.getMonitor().getDropResult();
			if (dropResult) {
				startTransition(() => {
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
				});
			}
		});
	}, [manager]);

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
		<>
			<DataTable
				layout="auto"
				{...props} /*
      // @ts-ignore */
				ref={tableRef}
			>
				<TableHeader />
				<TableBody tableRef={tableRef} />
				<TableFoot />
			</DataTable>
			<PaginatedToolbar />
		</>
	);
});
