import { IconArrowDown16, IconArrowUp16 } from "@dhis2/ui";
import { useMemo } from "react";
import type { ScorecardTableCellData } from "../../../schemas/config";
import { useScorecardState } from "../../StateProvider";

export function DataValue({
	dataSource,
	value,
}: {
	dataSource: ScorecardTableCellData["dataSources"][number];
	value?: number;
}) {
	const state = useScorecardState();
	const currentValue = dataSource.data.current;
	const previousValue = dataSource.data.previous;
	const showArrow: "decreasing" | "increasing" | undefined = useMemo(() => {
		if (!state?.options?.arrows) {
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
	}, [currentValue, dataSource.effectiveGap, state?.options?.arrows]);

	if (value) {
		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: 4,
				}}
			>
				<b>{value?.toString() ?? ""}</b>
			</div>
		);
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
			{showArrow === "decreasing" && <IconArrowDown16 />}
			{showArrow === "increasing" && <IconArrowUp16 />}
			{currentValue?.toString() ?? ""}
		</div>
	);
}
