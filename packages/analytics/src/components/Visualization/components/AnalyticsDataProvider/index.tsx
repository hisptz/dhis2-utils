import React, {createContext, useMemo} from "react";
import {Analytics, AnalyticsDimension} from "@hisptz/dhis2-utils";
import {useDimensions} from "../DimensionsProvider";
import {useDataQuery} from "@dhis2/app-runtime";
import {useLayout} from "../LayoutProvider";
import {forEach, set} from "lodash";

const AnalyticsContext = createContext<{ loading: boolean; analytics: Analytics } | undefined>(undefined);

const analyticsQuery = {
    analytics: {
        resource: "analytics",
        params: ({dimensions, filters}: any) => {
            return {
                dimension: Object.keys(dimensions).map((dimension) => `${dimension}:${dimensions[dimension]?.join(';')}`),
                filters: Object.keys(filters).map((dimension) => `${dimension}:${dimensions[dimension]?.join(';')}`),
            }
        }
    }
}

export interface DataProviderProps {
    children: React.ReactNode
}

export function AnalyticsDataProvider({children}: DataProviderProps) {
    const [analyticsDimensions] = useDimensions();
    const [layout] = useLayout();
    const {dimensions, filters} = useMemo(() => {
        const dimensions = {};
        const filters = {};

        forEach([...(layout?.columns ?? []), ...(layout?.rows ?? [])], (dimension) => {
            set(dimensions, [dimension], (analyticsDimensions as AnalyticsDimension)?.[dimension])
        })
        forEach([...(layout?.filters ?? [])], (dimension) => {
            set(dimensions, [dimension], (analyticsDimensions as AnalyticsDimension)?.[dimension])
        })

        return {
            dimensions,
            filters
        }
    }, [layout, analyticsDimensions]);
    const {data: analytics, loading,} = useDataQuery(analyticsQuery, {
        variables: {
            dimensions,
            filters
        }
    });

    return (
        <AnalyticsContext.Provider value={{analytics: analytics as Analytics, loading}}>
            {children}
        </AnalyticsContext.Provider>
    )
}
