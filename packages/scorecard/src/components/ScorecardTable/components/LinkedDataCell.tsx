import type { ScorecardCellData } from "../../../schemas/config";
import type { ItemMeta } from "../../../hooks/metadata";
import { useCellData } from "../../../hooks/cellData";
import { LinkedCell } from "./LinkedCell";
import { memo, useState } from "react";
import { FurtherAnalysisMenu } from "./FurtherAnalysisMenu";
import {
	FurtherAnalysis,
	type FurtherAnalysisConfig,
} from "./FurtherAnalysisModal";
import { isEqual } from "lodash";

export interface LinkedDataCellProps {
	dataSources: ScorecardCellData[];
	orgUnit: ItemMeta & { hierarchy: string };
	period: string;
	size: number;
}

function LinkedDataCellComponent({
	dataSources,
	orgUnit,
	period,
	size,
}: LinkedDataCellProps) {
	const [furtherAnalysisConfig, setFurtherAnalysisConfig] =
		useState<FurtherAnalysisConfig | null>(null);
	const [stateActionRef, setStateActionRef] = useState(undefined);

	const [top, bottom] = dataSources ?? [];
	const { legendDefinition: topLegendDefinition } = useCellData({
		dataSource: top,
		orgUnit,
		period,
	});
	const { legendDefinition: bottomLegendDefinition } = useCellData({
		dataSource: bottom,
		orgUnit,
		period,
	});

	console.log({
		top,
		bottom,
	});

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
			<LinkedCell
				size={size}
				onContextMenu={(e: any) => {
					e.preventDefault();
					setStateActionRef(e.target);
				}}
				onClick={(event: MouseEvent) => {
					event.stopPropagation();
					setFurtherAnalysisConfig({
						periodSelection: {
							periods: [
								{
									id: period,
								},
							],
						},
						orgUnitSelection: {
							levels: [],
							groups: [],
							orgUnits: [
								{
									id: orgUnit.uid,
								},
							],
						},
						dataSources,
					});
				}}
				top={{
					legendDefinition: topLegendDefinition,
					dataSource: top,
					value: top?.data?.current,
				}}
				bottom={{
					legendDefinition: bottomLegendDefinition,
					dataSource: bottom,
					value: bottom?.data?.current,
				}}
			/>
			{stateActionRef && (
				<FurtherAnalysisMenu
					dataSources={dataSources}
					onSelect={setFurtherAnalysisConfig}
					stateActionRef={stateActionRef}
					setStateActionRef={setStateActionRef}
					orgUnit={orgUnit}
					periodId={period}
				/>
			)}
		</>
	);
}

export const LinkedDataCell = memo(
	LinkedDataCellComponent,
	(prevProps, nowProps) => {
		return isEqual(prevProps, nowProps);
	},
);
