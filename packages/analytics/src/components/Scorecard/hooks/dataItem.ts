import { useScorecardMeta } from "../components";
import type { ScorecardDataSource } from "../schemas/config";
import type { ItemMeta } from "./metadata";

export function useGetDataSourceLabel() {
	const meta = useScorecardMeta();
	return (dataSource: ScorecardDataSource) => {
		if (dataSource.label) {
			return dataSource.label;
		}
		const itemMeta: ItemMeta | undefined = meta?.dataItems.find(
			(item) => item.uid === dataSource.id,
		);

		return itemMeta?.name ?? "";
	};
}
