import {
	type ScorecardAnalyticsData,
	type ScorecardDataSource,
} from "../../../schemas/config";
import type { ItemMeta } from "../../../hooks/metadata";
import type { ReactNode } from "react";
import { useScorecardConfig } from "../../ConfigProvider";
import { useScorecardMeta } from "../../MetaProvider";
import { head } from "lodash";
import { DataTableCell } from "@dhis2/ui";
import {
	getLegend,
	getTextColorFromBackgroundColor,
} from "../../../utils/legends";

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
	const config = useScorecardConfig();
	const meta = useScorecardMeta();
	const dataSource = head(dataSources)!;

	const dataValue = dataSource.data.find(({ pe, ou, dx }) => {
		return pe === period && ou === orgUnit.uid && dx === dataSource.id;
	});

	const legendDefinition = getLegend({
		dataSource,
		value: dataValue,
		orgUnitLevels: meta!.orgUnitLevels,
		config: config!,
		orgUnit,
		periodId: period,
	});

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
			{dataValue?.value}
		</DataTableCell>
	);
}
