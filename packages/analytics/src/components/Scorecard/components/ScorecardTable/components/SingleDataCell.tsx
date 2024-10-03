import { type ScorecardCellData } from "../../../schemas/config";
import { type ItemMeta } from "../../../hooks/metadata";
import { memo, type ReactNode, useState } from "react";
import { head } from "lodash";
import { DataTableCell } from "@dhis2/ui";
import { getTextColorFromBackgroundColor } from "../../../utils/legends";
import { DataValue } from "./DataValue";
import { useCellData } from "../../../hooks/cellData";
import { FurtherAnalysisMenu } from "./FurtherAnalysisMenu";
import {
	FurtherAnalysis,
	type FurtherAnalysisConfig,
} from "./FurtherAnalysisModal";

export interface SingleDataCellProps {
	dataSources: ScorecardCellData[];
	orgUnit: ItemMeta & { hierarchy: string };
	period: string;
}

function SingleDataCellComponent({
	dataSources,
	period,
	orgUnit,
}: SingleDataCellProps): ReactNode {
	const [furtherAnalysisConfig, setFurtherAnalysisConfig] =
		useState<FurtherAnalysisConfig | null>(null);
	const dataSource = head(dataSources);
	const [stateActionRef, setStateActionRef] = useState(undefined);

	const { legendDefinition } = useCellData({
		dataSource,
		period,
		orgUnit,
	});

	if (!dataSource || !dataSource.data) {
		return <DataTableCell bordered />;
	}

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
			<DataTableCell
				onClick={(event) => {
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
				onContextMenu={(e: any) => {
					e.preventDefault();
					setStateActionRef(e.target);
				}}
				bordered
				style={{
					background: legendDefinition?.color,
					textAlign: "center",
					minWidth: 100,
					color: legendDefinition
						? getTextColorFromBackgroundColor(
								legendDefinition?.color,
							)
						: undefined,
				}}
			>
				{dataSource && <DataValue dataSource={dataSource} />}
			</DataTableCell>

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

export const SingleDataCell = memo(SingleDataCellComponent);
