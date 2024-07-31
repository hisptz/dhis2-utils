import type { ScorecardTableCellData } from "../../../schemas/config";
import { useScorecardConfig } from "../../ConfigProvider";

export function LinkedDataCell({ dataSources }: ScorecardTableCellData) {
	const config = useScorecardConfig();
	const legendDefinitions = config!.legendDefinitions;
	const [top, bottom] = dataSources ?? [];

	return <td>Linked Here!</td>;
}
