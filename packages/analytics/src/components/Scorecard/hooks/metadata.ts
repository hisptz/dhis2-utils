import { useScorecardConfig } from "../components/ConfigProvider";
import { useScorecardState } from "../components/StateProvider";
import { getDataSourcesFromGroups } from "../utils/dataSources";
import { getOrgUnitsForAnalytics } from "../utils/orgUnits";
import { useDataQuery } from "@dhis2/app-runtime";

const query: any = {
	meta: {
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
				skipData: true,
				hierarchyData: true,
				showHierarchy: true,
				enhancedConditions: true,
				includeMetadataDetails: true,
				dimension: [
					`pe:${periods.join(";")}`,
					`dx:${dataItems.join(";")}`,
					`ou:${orgUnits.join(";")}`,
				],
			};
		},
	},
};

type MetaResponse = {
	meta: {
		columns: any[];
		rows: [];
		metaData: any;
	};
};

export function useGetScorecardMeta() {
	const config = useScorecardConfig();
	const state = useScorecardState();

	if (!config || !state) {
		throw new Error(
			"Invalid scorecard setup. Make sure the valid config and state props are passed.",
		);
	}

	const dataItemObjects = getDataSourcesFromGroups(
		config?.dataSelection?.dataGroups ?? [],
	);
	const dataItems = dataItemObjects?.map((item) => item?.id);
	const orgUnits = getOrgUnitsForAnalytics(
		state?.orgUnitSelection ?? config?.orgUnitSelection,
	);
	const periods = state.periodSelection.periods;
	const { loading, data } = useDataQuery<MetaResponse>(query, {
		variables: {
			periods,
			orgUnits,
			dataItems,
		},
	});

	console.log({ data });

	return {
		loading,
	};
}
