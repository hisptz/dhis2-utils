import { IconArrowDown16, IconArrowUp16 } from "@dhis2/ui";
import { memo, useMemo } from "react";
import type { ScorecardCellData } from "../../../schemas/config";
import { useScorecardStateSelectorValue } from "../../../state";

export const DataValue = memo(function DataValue({
	dataSource,
	value,
	bold,
}: {
	dataSource: ScorecardCellData;
	value?: number;
	bold?: boolean;
}) {
	const showArrows = useScorecardStateSelectorValue<boolean>([
		"options",
		"arrows",
	]);
	const currentValue = dataSource.data.current;
	const previousValue = dataSource.data.previous;
	const showArrow: "decreasing" | "increasing" | undefined = useMemo(() => {
		if (!showArrows) {
			return;
		}

		if (!previousValue || !currentValue) {
			return;
		}

		const effectiveGap = dataSource.effectiveGap;
		const gap = Math.abs(previousValue - currentValue);
		if (gap < effectiveGap) {
			return;
		}

		if (previousValue === currentValue) {
			return;
		}

		return currentValue > previousValue ? "increasing" : "decreasing";
	}, [currentValue, dataSource.effectiveGap, showArrows]);

	if (value) {
		if (isNaN(value as number)) {
			return "";
		}
		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: 4,
				}}
			>
				{bold ? (
					<b>{value?.toFixed(2).toString() ?? ""}</b>
				) : (
					value?.toFixed(2).toString() ?? ""
				)}
			</div>
		);
	}

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				gap: 2,
			}}
		>
			{showArrow === "decreasing" && <IconArrowDown16 />}
			{showArrow === "increasing" && <IconArrowUp16 />}
			{currentValue?.toFixed(2).toString() ?? ""}
		</div>
	);
});
