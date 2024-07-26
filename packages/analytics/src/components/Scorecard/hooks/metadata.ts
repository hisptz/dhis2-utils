import { useScorecardConfig } from "../components/ConfigProvider";
import { useScorecardState } from "../components/StateProvider";
import { getDataSourcesFromGroups } from "../utils/dataSources";
import { getOrgUnitsForAnalytics } from "../utils/orgUnits";
import { useDataQuery } from "@dhis2/app-runtime";
import { useMemo } from "react";
import type { ScorecardConfig, ScorecardState } from "../schemas/config";

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

export type ItemMeta = {
	uid: string;
	name: string;
	code?: string;
	description?: string;
	valueType?: string;
	totalAggregationType?: string;
	aggregationType?: string;
	[key: string]: string | number | undefined;
};

type MetaResponse = {
	meta: {
		columns: any[];
		rows: [];
		headers: [];
		metaData: {
			dimensions: {
				dx: string[];
				ou: string[];
				pe: string[];
				co: string[];
				[key: string]: string[];
			};
			items: {
				[key: string]: ItemMeta;
			};
			ouNameHierarchy: {
				[key: string]: string;
			};
		};
	};
};

export function getDimensions({
	config,
	state,
}: {
	config: ScorecardConfig;
	state: ScorecardState;
}) {
	const dataItemObjects = getDataSourcesFromGroups(
		config?.dataSelection?.dataGroups ?? [],
	);

	const dataItemsIds = dataItemObjects?.map((item) => item?.id);
	const orgUnitsIds = getOrgUnitsForAnalytics(
		state?.orgUnitSelection ?? config?.orgUnitSelection,
	);
	const periodsIds = state.periodSelection.periods;

	return {
		dataItemsIds,
		orgUnitsIds,
		periodsIds,
	};
}

export function useGetScorecardMeta() {
	const config = useScorecardConfig();
	const state = useScorecardState();

	if (!config || !state) {
		throw new Error(
			"Invalid scorecard setup. Make sure the valid config and state props are passed.",
		);
	}

	const { dataItemsIds, orgUnitsIds, periodsIds } = getDimensions({
		config,
		state,
	});

	const { loading, data } = useDataQuery<MetaResponse>(query, {
		variables: {
			periods: periodsIds,
			orgUnits: orgUnitsIds,
			dataItems: dataItemsIds,
		},
	});

	const orgUnits = useMemo(() => {
		return (
			data?.meta?.metaData.dimensions["ou"]
				.map((ou) => {
					return data?.meta?.metaData.items[ou];
				})
				.filter(Boolean) ?? []
		);
	}, [data?.meta]);
	const periods = useMemo(() => {
		return (
			data?.meta?.metaData.dimensions["pe"]
				.map((pe) => {
					return data?.meta?.metaData.items[pe];
				})
				.filter(Boolean) ?? []
		);
	}, [data?.meta]);
	const dataItems = useMemo(() => {
		return (
			data?.meta?.metaData.dimensions["dx"]
				.map((dx) => {
					return data?.meta?.metaData.items[dx];
				})
				.filter(Boolean) ?? []
		);
	}, [data?.meta]);

	return {
		loading,
		orgUnits,
		periods,
		dataItems,
	};
}
