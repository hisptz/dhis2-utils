import type { ScorecardDataSource } from "../../../schemas/config";
import { useMemo } from "react";
import {
	getLegend,
	getTextColorFromBackgroundColor,
} from "../../../utils/legends";
import { useScorecardMeta } from "../../MetaProvider";
import { useScorecardConfig } from "../../ConfigProvider";
import { colors } from "@dhis2/ui";

export function HighlightedItem({
	item,
	data,
}: {
	item: ScorecardDataSource;
	data?: string;
}) {
	const config = useScorecardConfig();
	const meta = useScorecardMeta();
	const legendDefinition = useMemo(() => {
		return data
			? getLegend({
					dataSource: item,
					value: parseFloat(data),
					orgUnitLevels: meta!.orgUnitLevels,
					config: config!,
				})
			: undefined;
	}, [item, data, meta, config]);

	return (
		<div
			style={{
				display: "flex",
				gap: 16,
				justifyContent: "space-between",
				border: `1px solid ${colors.grey500}`,
				borderRadius: 4,
				minHeight: 48,
				alignItems: "center",
				width: "100%",
			}}
		>
			<span style={{ padding: 8, fontSize: 14 }}>
				{item.label ?? item.name}
			</span>
			<div
				style={{
					minHeight: 48,
					height: "100%",
					width: 100,
					display: "flex",
					justifyContent: "center",
					borderLeft: `1px solid ${colors.grey500}`,
					alignItems: "center",
					padding: 8,
					background: legendDefinition?.color,
					color: legendDefinition?.color
						? getTextColorFromBackgroundColor(
								legendDefinition?.color,
							)
						: undefined,
				}}
			>
				<b>{data}</b>
			</div>
		</div>
	);
}
