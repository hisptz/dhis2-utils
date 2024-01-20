import { useDataQuery } from "@dhis2/app-runtime";

export function useDataFetch(query: any, options?: any): Record<string, any> {
	const responses = useDataQuery(query, { ...options, lazy: true });

	return {
		...responses,
		fetch: responses.refetch,
	};
}
