import { getCoreRowModel, type TableOptions } from "@tanstack/react-table";
import { useTableColumns } from "./columns";
import type { ScorecardTableData } from "../schemas/config";
import { useScorecardData } from "../components/DataProvider";

export function useTableSetup(): TableOptions<ScorecardTableData> {
	const columns = useTableColumns();
	const { data } = useScorecardData();

	return {
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
	};
}
