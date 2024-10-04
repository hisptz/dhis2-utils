import { useScorecardDataFetchProgress } from "./DataProvider";
import { DataTableRow, LinearLoader } from "@dhis2/ui";
import { useTableState } from "./TableStateProvider";

export function LoadingIndicator() {
	const { progress } = useScorecardDataFetchProgress();
	const table = useTableState();
	const colSpan = table.getVisibleFlatColumns().length;

	if (progress === 1 || isNaN(progress!)) {
		return null;
	}

	return (
		<DataTableRow>
			<td colSpan={colSpan}>
				<LinearLoader
					margin={"0"}
					width={"100%"}
					amount={(progress ?? 0) * 100}
				/>
			</td>
		</DataTableRow>
	);
}
