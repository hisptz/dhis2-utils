import { DataTable } from "@dhis2/ui";
import { TableHeader } from "./components/TableHeader";
import { TableBody } from "./components/TableBody";

export function ScorecardTable() {
	return (
		<DataTable layout="auto">
			<TableHeader />
			<TableBody />
		</DataTable>
	);
}
