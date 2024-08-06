import type { ScorecardTableCellData } from "../../../schemas/config";
import type { ItemMeta } from "../../../hooks/metadata";
import { useCellData } from "../../../hooks/cellData";
import { LinkedCell } from "./LinkedCell";
import { useState } from "react";
import { FurtherAnalysisMenu } from "./FurtherAnalysisMenu";
import {
	FurtherAnalysis,
	type FurtherAnalysisConfig,
} from "./FurtherAnalysisModal";

export interface LinkedDataCellProps {
	dataSources: ScorecardTableCellData["dataSources"];
	orgUnit: ItemMeta & { hierarchy: string };
	period: string;
}

export function LinkedDataCell({
	dataSources,
	orgUnit,
	period,
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
				}}
				bottom={{
					legendDefinition: bottomLegendDefinition,
					dataSource: bottom,
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
