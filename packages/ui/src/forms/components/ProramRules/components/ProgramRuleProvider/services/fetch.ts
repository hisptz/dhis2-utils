import { useDataQuery } from "@dhis2/app-runtime";

export function useFetch(query: any, options?: any) {
	const responses = useDataQuery(query, { ...options, lazy: true });

	return {
		...responses,
		fetch: responses.refetch,
	};
}
