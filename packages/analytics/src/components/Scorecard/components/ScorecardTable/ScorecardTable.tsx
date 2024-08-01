import { DataTable } from "@dhis2/ui";
import { TableHeader } from "./components/TableHeader";
import { TableBody } from "./components/TableBody";
import { TableFoot } from "./components/TableFoot";

export function ScorecardTable() {
	return (
		<DataTable layout="auto">
			<TableHeader />
			<TableBody />
			<TableFoot />
		</DataTable>
	);
}
