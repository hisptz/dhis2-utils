import {
	type ScorecardAnalyticsData,
	type ScorecardDataSource,
} from "../../../schemas/config";
import { type ItemMeta, useCalendar } from "../../../hooks/metadata";
import { type ReactNode, useMemo } from "react";
import { useScorecardConfig } from "../../ConfigProvider";
import { useScorecardMeta } from "../../MetaProvider";
import { head } from "lodash";
import { DataTableCell, IconArrowDown16, IconArrowUp16 } from "@dhis2/ui";
import {
	getLegend,
	getTextColorFromBackgroundColor,
} from "../../../utils/legends";
import {
	createFixedPeriodFromPeriodId,
	getAdjacentFixedPeriods,
} from "@dhis2/multi-calendar-dates";
import { useScorecardState } from "../../StateProvider";

export interface SingleDataCellProps {
	dataSources: Array<
		ScorecardDataSource & { data: ScorecardAnalyticsData[] }
	>;
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
	const calendar = useCalendar();

	const dataValue = useMemo(() => {
		return dataSource.data.find(({ pe, ou, dx }) => {
			return pe === period && ou === orgUnit.uid && dx === dataSource.id;
		});
	}, [dataSource, orgUnit, period]);

	const legendDefinition = useMemo(() => {
		return getLegend({
			dataSource,
			value: dataValue,
			orgUnitLevels: meta!.orgUnitLevels,
			config: config!,
			orgUnit,
			periodId: period,
		});
	}, [dataSource, dataValue, meta, orgUnit, period]);

	const previousPeriodDataValue = useMemo(() => {
		const previousPeriod = getAdjacentFixedPeriods({
			calendar,
			period: createFixedPeriodFromPeriodId({
				calendar,
				periodId: period,
			}),
			steps: -1,
		});
		return dataSource.data.find(({ pe, ou, dx }) => {
			return (
				pe === head(previousPeriod)!.id &&
				ou === orgUnit.uid &&
				dx === dataSource.id
			);
		});
	}, [period]);

	const showArrow: "decreasing" | "increasing" | undefined = useMemo(() => {
		if (!state?.options?.arrows) {
			return;
		}

		if (!previousPeriodDataValue || !dataValue) {
			return;
		}
		const currentValue = parseFloat(dataValue.value as string);
		const previousValue = parseFloat(
			previousPeriodDataValue?.value as string,
		);

		if (isNaN(currentValue) || isNaN(previousValue)) {
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
	}, [
		previousPeriodDataValue,
		dataValue,
		dataSource.effectiveGap,
		state?.options?.arrows,
	]);

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
				{dataValue?.value}
			</div>
		</DataTableCell>
	);
}
