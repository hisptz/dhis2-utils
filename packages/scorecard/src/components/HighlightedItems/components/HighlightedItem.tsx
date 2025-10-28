import type { ScorecardDataSource } from "../../../schemas/config";
import { useMemo, useState } from "react";
import {
	getLegend,
	getTextColorFromBackgroundColor,
} from "../../../utils/legends";
import { useScorecardMeta } from "../../MetaProvider";
import { useScorecardConfig } from "../../ConfigProvider";
import { colors } from "@dhis2/ui";
import {
	FurtherAnalysis,
	type FurtherAnalysisConfig,
} from "../../ScorecardTable/components/FurtherAnalysisModal";
import { useScorecardViewStateValue } from "../../../utils";

export function HighlightedItem({
	item,
	data,
}: {
	item: ScorecardDataSource;
	data?: string;
}) {
	const disableFurtherAnalysis = useScorecardViewStateValue<boolean>(
		"disableFurtherAnalysis",
	);
	const config = useScorecardConfig();
	const [furtherAnalysisConfig, setFurtherAnalysisConfig] =
		useState<FurtherAnalysisConfig | null>(null);

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
		<>
			{!!furtherAnalysisConfig && (
				<FurtherAnalysis
					onClose={() => {
						setFurtherAnalysisConfig(null);
					}}
					hide={!furtherAnalysisConfig}
					config={furtherAnalysisConfig}
				/>
			)}
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
					onClick={(event) => {
						event.stopPropagation();
						if (!disableFurtherAnalysis) {
							setFurtherAnalysisConfig({
								periodSelection: {
									periods: meta!.periods.map(({ uid }) => ({
										id: uid,
									})),
								},
								orgUnitSelection: {
									levels: [],
									groups: [],
									orgUnits: meta!.orgUnits.map((orgUnit) => ({
										id: orgUnit.uid,
									})),
								},
								dataSources: [item],
							});
						}
					}}
					style={{
						minHeight: 48,
						cursor: "pointer",
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
		</>
	);
}
