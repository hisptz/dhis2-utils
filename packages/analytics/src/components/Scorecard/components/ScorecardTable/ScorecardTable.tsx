import { DataTable } from "@dhis2/ui";
import { TableHeader } from "./components/TableHeader";
import { TableBody } from "./components/TableBody";
import { TableFoot } from "./components/TableFoot";
import { DndContext } from "@dnd-kit/core";
import { useScorecardSetState } from "../StateSetProvider";

export function ScorecardTable() {
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
			<DataTable layout="auto">
				<TableHeader />
				<TableBody />
				<TableFoot />
			</DataTable>
		</DndContext>
	);
}
