import { useScorecardMeta } from "../../MetaProvider";
import { useScorecardConfig } from "../../ConfigProvider";
import { useEffect, useMemo } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import type { Analytics } from "@hisptz/dhis2-utils";
import { useScorecardViewStateValue } from "../../../utils";

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
	const showHighlightedItems = useScorecardViewStateValue<boolean>(
		"highlightedIndicators",
	);
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
	const { data, loading, error, refetch } = useDataQuery<{ data: Analytics }>(
		query,
		{
			variables: dimensions,
			lazy: true,
		},
	);

	useEffect(() => {
		if (showHighlightedItems) {
			refetch();
		}
	}, [showHighlightedItems, dimensions]);

	return {
		data: data?.data,
		loading,
		error,
	};
}
