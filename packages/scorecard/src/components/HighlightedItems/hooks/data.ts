import { useScorecardMeta } from "../../MetaProvider";
import { useScorecardConfig } from "../../ConfigProvider";
import { useMemo } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import type { Analytics } from "@hisptz/dhis2-utils";

const query: any = {
	data: {
		resource: "analytics",
		params: ({
			periods,
			orgUnits,
			dataItems,
		}: {
			periods: string[];
			orgUnits: string[];
			dataItems: string[];
		}) => {
			return {
				skipMeta: true,
				dimension: [`dx:${dataItems.join(";")}`],
				filter: [`ou:${orgUnits.join(";")}`, `pe:${periods.join(";")}`],
			};
		},
	},
};

export function useHighlightedItemsData() {
	const meta = useScorecardMeta();

	const { highlightedIndicators } = useScorecardConfig();
	const dimensions = useMemo(() => {
		const periods = meta?.periods.map((period) => period.uid) || [];
		const orgUnits = meta?.orgUnits.map((orgUnit) => orgUnit.uid) || [];
		const dataItems = highlightedIndicators.map(
			(indicator) => indicator.id,
		);
		return {
			periods,
			orgUnits,
			dataItems,
		};
	}, [highlightedIndicators, meta]);
	const { data, loading, error } = useDataQuery<{ data: Analytics }>(query, {
		variables: dimensions,
	});

	return {
		data: data?.data,
		loading,
		error,
	};
}
