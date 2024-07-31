import type {
	ScorecardAnalyticsData,
	ScorecardDataSource,
	ScorecardTableCellData,
	ScorecardTableData,
} from "../../../schemas/config";
import { useScorecardConfig } from "../../ConfigProvider";
import type { ItemMeta } from "../../../hooks/metadata";
import { useScorecardMeta } from "../../MetaProvider";
import { SingleDataCell } from "./SingleDataCell";
import { LinkedDataCell } from "./LinkedDataCell";
import type { CellContext } from "@tanstack/react-table";
import { DataTableCell } from "@dhis2/ui";

export interface DataContainerProps {
	dataSources: Array<
		ScorecardDataSource & { data: ScorecardAnalyticsData[] }
	>;
	orgUnit: ItemMeta & { hierarchy: string };
	period: string;
}

export function DataContainer(
	props: CellContext<ScorecardTableData, ScorecardTableCellData>,
) {
	const data = props.getValue();
	const config = useScorecardConfig();
	const meta = useScorecardMeta();
	if (!config || !meta) {
		return <DataTableCell />;
	}
	if (data.dataSources.length === 1) {
		return <SingleDataCell {...data} />;
	}

	return <LinkedDataCell {...data} />;
}
