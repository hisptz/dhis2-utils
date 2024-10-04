import { useScorecardDataFetchProgress } from "./DataProvider";
import { DataTableRow, LinearLoader } from "@dhis2/ui";
import { useTableState } from "./TableStateProvider";
import type { RefObject } from "react";
import styles from "./ScorecardTable/ScorecardTable.module.css";

export function LoadingIndicator({
	tableRef,
}: {
	tableRef: RefObject<HTMLTableElement>;
}) {
	const { progress } = useScorecardDataFetchProgress();
	const table = useTableState();
	const colSpan = table.getVisibleFlatColumns().length;

	const width =
		tableRef.current?.parentElement?.getBoundingClientRect().width;

	if (progress === 1 || isNaN(progress!)) {
		return null;
	}

	return (
		<DataTableRow>
			<td
				style={{ position: "static", left: 0, top: 0 }}
				colSpan={colSpan}
			>
				<LinearLoader
					className={styles["loader"]}
					margin={"0"}
					width={width ? `${Math.trunc(width)}px` : "100%"}
					amount={(progress ?? 0) * 100}
				/>
			</td>
		</DataTableRow>
	);
}
