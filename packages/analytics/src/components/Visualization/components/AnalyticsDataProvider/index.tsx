import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useMemo,
} from "react";
import { Analytics, AnalyticsDimension } from "@hisptz/dhis2-utils";
import { useDimensions } from "../DimensionsProvider/index.js";
import { useDataQuery } from "@dhis2/app-runtime";
import { useLayout } from "../LayoutProvider/index.js";
import { forEach, set } from "lodash";

const AnalyticsContext = createContext<
	{ loading: boolean; analytics: Analytics } | undefined
>(undefined);

const analyticsQuery = {
	analytics: {
		resource: "analytics",
		params: ({ dimensions, filters }: any) => {
			return {
				dimension: Object.keys(dimensions).map(
					(dimension) =>
						`${dimension}:${dimensions[dimension]?.join(";")}`,
				),
				filter: Object.keys(filters).map(
					(dimension) =>
						`${dimension}:${filters[dimension]?.join(";")}`,
				),
				includeMetadataDetails: true,
			};
		},
	},
};

export interface DataProviderProps {
	children: ReactNode;
}

export function useAnalyticsData() {
	return useContext(AnalyticsContext) ?? { analytics: {}, loading: false };
}

export function AnalyticsDataProvider({ children }: DataProviderProps) {
	const [analyticsDimensions] = useDimensions();
	const [layout] = useLayout();
	const { dimensions, filters } = useMemo(() => {
		const dimensions = {};
		const filters = {};

		forEach(
			[...(layout?.columns ?? []), ...(layout?.rows ?? [])],
			(dimension) => {
				set(
					dimensions,
					[dimension],
					(analyticsDimensions as AnalyticsDimension)?.[dimension],
				);
			},
		);
		forEach([...(layout?.filters ?? [])], (dimension) => {
			set(
				filters,
				[dimension],
				(analyticsDimensions as AnalyticsDimension)?.[dimension],
			);
		});

		return {
			dimensions,
			filters,
		};
	}, [layout, analyticsDimensions]);

	const {
		data: analytics,
		error,
		loading,
		refetch,
		called,
	} = useDataQuery(analyticsQuery, {
		variables: {
			dimensions,
			filters,
		},
		lazy: true,
	});

	useEffect(() => {
		refetch({
			dimensions,
			filters,
		});
	}, [dimensions, filters]);

	useEffect(() => {
		if (error) {
			throw error;
		}
	}, [error]);

	return (
		<AnalyticsContext.Provider
			value={{ analytics: analytics?.analytics as Analytics, loading }}
		>
			{children}
		</AnalyticsContext.Provider>
	);
}
