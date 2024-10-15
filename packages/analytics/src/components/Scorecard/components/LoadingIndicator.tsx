import { useScorecardData } from "./DataProvider";
import { DataTableRow, LinearLoader } from "@dhis2/ui";
import { useTableState } from "./TableStateProvider";
import { memo, type RefObject, useEffect, useState } from "react";
import styles from "./ScorecardTable/ScorecardTable.module.css";

export const LoadingIndicator = memo(function LoadingIndicator({
	tableRef,
}: {
	tableRef: RefObject<HTMLTableElement>;
}) {
	const { data: dataEngine } = useScorecardData();
	const [progress, setProgress] = useState<number>(0);
	const [completed, setCompleted] = useState<boolean>(dataEngine.isDone);
	const table = useTableState();
	const colSpan = table.getVisibleFlatColumns().length;

	const width =
		tableRef.current?.parentElement?.getBoundingClientRect().width;

	useEffect(() => {
		return dataEngine.addOnCompleteListener(setCompleted);
	}, [dataEngine]);

	useEffect(() => {
		return dataEngine.addProgressListener((value) => {
			setProgress(value);
		});
	}, [dataEngine]);

	if (progress === 1 || isNaN(progress!) || completed) {
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
});
