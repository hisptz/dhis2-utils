import { type ScorecardTableCellData } from "../../../schemas/config";
import { type ItemMeta } from "../../../hooks/metadata";
import { type ReactNode, useMemo } from "react";
import { useScorecardConfig } from "../../ConfigProvider";
import { useScorecardMeta } from "../../MetaProvider";
import { head } from "lodash";
import { DataTableCell, IconArrowDown16, IconArrowUp16 } from "@dhis2/ui";
import {
	getLegend,
	getTextColorFromBackgroundColor,
} from "../../../utils/legends";
import { useScorecardState } from "../../StateProvider";

export interface SingleDataCellProps {
	dataSources: ScorecardTableCellData["dataSources"];
	orgUnit: ItemMeta & { hierarchy: string };
	period: string;
}

export function SingleDataCell({
	dataSources,
	period,
	orgUnit,
}: SingleDataCellProps): ReactNode {
	const state = useScorecardState();
	const config = useScorecardConfig();
	const meta = useScorecardMeta();
	const dataSource = head(dataSources)!;

	const currentValue = dataSource.data.current;
	const previousValue = dataSource.data.previous;

	const legendDefinition = useMemo(() => {
		return getLegend({
			dataSource,
			value: currentValue,
			orgUnitLevels: meta!.orgUnitLevels,
			config: config!,
			orgUnit,
			periodId: period,
		});
	}, [dataSource, currentValue, meta, orgUnit, period]);

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

	return (
		<DataTableCell
			bordered
			style={{
				background: legendDefinition?.color,
				textAlign: "center",
				minWidth: 100,
				color: legendDefinition
					? getTextColorFromBackgroundColor(legendDefinition?.color)
					: undefined,
			}}
		>
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
		</DataTableCell>
	);
}
