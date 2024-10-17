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
import { memo } from "react";
import { useCellValue } from "../../../hooks/value";
import { CellLoader } from "./CellLoader";

function DataContainerComponent(
	props: CellContext<ScorecardTableData, ScorecardTableCellConfig>,
) {
	const size = props.cell.column.getSize();
	const dataConfig = props.getValue();
	const config = useScorecardConfig();
	const meta = useScorecardMeta();
	const { loading, cellData } = useCellValue(props.getValue());

	if (!config || !meta) {
		return <DataTableCell style={{ width: size }} bordered />;
	}

	if (loading) {
		return <CellLoader size={size} />;
	}

	if (!dataConfig) {
		return <DataTableCell bordered />;
	}

	if (cellData?.length === 1) {
		return (
			<SingleDataCell
				{...dataConfig}
				size={size}
				period={dataConfig.currentPeriod!}
				dataSources={cellData}
			/>
		);
	}

	console.log({
		cellData,
		dataConfig,
	});

	return (
		<LinkedDataCell
			{...dataConfig}
			size={size}
			period={dataConfig.currentPeriod!}
			dataSources={cellData}
		/>
	);
}

export const DataContainer = memo(function DataContainer(
	props: CellContext<ScorecardTableData, ScorecardTableCellConfig>,
) {
	const config = props.getValue();

	if (!config) {
		return <DataTableCell bordered tag="th" width="auto" />;
	}

	return <DataContainerComponent {...props} />;
});
