import { useScorecardConfig } from "../components/ConfigProvider";
import { useScorecardState } from "../components/StateProvider";
import { useConfig, useDataQuery } from "@dhis2/app-runtime";
import { useMemo } from "react";
import { getDimensions } from "../utils/analytics";
import type { SupportedCalendar } from "@dhis2/multi-calendar-dates/build/types/types";

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
	ouLevel: {
		resource: "organisationUnitLevels",
		params: {
			fields: ["id", "displayName", "level"],
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
	ouLevel: {
		organisationUnitLevels: Array<{
			id: string;
			level: number;
			displayName: string;
		}>;
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
					return {
						...data?.meta?.metaData.items[ou],
						hierarchy: data?.meta?.metaData?.ouNameHierarchy[ou],
					};
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
	const orgUnitLevels = useMemo(
		() => data?.ouLevel?.organisationUnitLevels ?? [],
		[data?.ouLevel?.organisationUnitLevels],
	);

	return {
		loading,
		orgUnits,
		periods,
		dataItems,
		orgUnitLevels,
	};
}

export function useCalendar() {
	const { systemInfo } = useConfig();
	return (
		(systemInfo as unknown as { calendar?: SupportedCalendar })?.calendar ??
		"iso8601"
	);
}
