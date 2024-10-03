import type {
	ScorecardTableCellConfig,
	ScorecardTableData,
} from "../../../schemas/config";
import { useScorecardConfig } from "../../ConfigProvider";
import { useScorecardMeta } from "../../MetaProvider";
import { SingleDataCell } from "./SingleDataCell";
import { LinkedDataCell } from "./LinkedDataCell";
import type { CellContext } from "@tanstack/react-table";
import { DataTableCell } from "@dhis2/ui";
import { memo, useMemo } from "react";
import { useCellValue } from "../../../hooks/value";
import { CellLoader } from "./CellLoader";

function DataContainerComponent(
	props: CellContext<ScorecardTableData, ScorecardTableCellConfig>,
) {
	const dataConfig = useMemo(() => props.getValue(), [props.getValue()]);
	const config = useScorecardConfig();
	const meta = useScorecardMeta();
	const { loading, cellData } = useCellValue(props.getValue());

	if (!config || !meta) {
		return <DataTableCell />;
	}

	if (loading) {
		return <CellLoader />;
	}

	if (cellData?.length === 1) {
		return (
			<SingleDataCell
				{...dataConfig}
				period={dataConfig.currentPeriod!}
				dataSources={cellData}
			/>
		);
	}

	return (
		<LinkedDataCell
			{...dataConfig}
			period={dataConfig.currentPeriod!}
			dataSources={cellData}
		/>
	);
}

export const DataContainer = memo(DataContainerComponent);
