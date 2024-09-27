import { useDataQuery } from "@dhis2/app-runtime";
import DataSource from "../../../models/dataSource.js";
import { useMemo } from "react";

export default function useDataGroups(initialSelectedDataType: DataSource): {
	groups: Array<{ id: string; displayName: string }>;
	loading: boolean;
	error: any;
} {
	const { loading, data, error } = useDataQuery<{
		groups: Record<string, unknown>;
	}>(initialSelectedDataType.groupsQuery, {
		lazy: !initialSelectedDataType.groupResource,
	});

	const groups = useMemo(() => {
		return (
			(data?.groups?.[
				initialSelectedDataType.groupResource as string
			] as Array<{
				id: string;
				displayName: string;
			}>) ?? []
		);
	}, [initialSelectedDataType.groupResource, data]);

	return {
		loading,
		groups,
		error,
	};
}
