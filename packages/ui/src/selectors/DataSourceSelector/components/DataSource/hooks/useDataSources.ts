import { useDataQuery } from "@dhis2/app-runtime";
import { useEffect, useMemo, useState } from "react";
import type { Pager } from "../../../types";
import { isEmpty } from "lodash";
import { CustomDataSource } from "../../../models/customDataSource";
import { useSelectedDataSource } from "../../ConfigProvider";

export default function useDataSources(selectedGroup?: { id: string }) {
	const selectedDataSourceType = useSelectedDataSource();

	const query = useMemo(
		() => selectedDataSourceType.dataSourcesQuery,
		[selectedDataSourceType.dataSourcesQuery],
	);

	const [dataSources, setDataSources] = useState<
		| Array<{
				id: string;
				displayName: string;
		  }>
		| undefined
	>();
	const { data, loading, error, refetch } = useDataQuery<{
		sources: { pager: Pager; [key: string]: unknown };
	}>(query, {
		variables: {
			page: 1,
			...(selectedGroup
				? {
						filter: [
							...(selectedDataSourceType.filter ?? []),
							`${selectedDataSourceType.groupKey}:eq:${selectedGroup?.id}`,
						],
					}
				: {
						filter: [...(selectedDataSourceType.filter ?? [])],
					}),
		},
		lazy: true,
	});

	const getSources = (data: {
		sources: { pager: Pager; [key: string]: unknown };
	}): Array<{ id: string; displayName: string }> => {
		if (data) {
			if (selectedDataSourceType instanceof CustomDataSource) {
				return selectedDataSourceType.getSources(data);
			}
			return data?.sources?.[
				selectedDataSourceType.resource as string
			] as Array<{
				id: string;
				displayName: string;
			}>;
		}
		return [];
	};

	useEffect(() => {
		const get = async () => {
			const data = (await refetch()) as {
				sources: { pager: Pager; [key: string]: unknown };
			};
			setDataSources(getSources(data));
		};
		get();
	}, [selectedDataSourceType.label, selectedGroup, refetch]);

	const nextPage = async () => {
		if (data) {
			const pager = data.sources.pager;
			const currentPage = pager.page;
			const pageCount = pager.pageCount;
			if (currentPage < pageCount) {
				const nextPage = currentPage + 1;
				const data = (await refetch({
					page: nextPage,
				})) as {
					sources: { pager: Pager; [key: string]: unknown };
				};
				//We need to append the data to the existing data
				setDataSources((prev) => {
					return [...(prev ?? []), ...getSources(data)];
				});
			}
		}
	};

	const search = async (keyword: string) => {
		const filter = [...(selectedDataSourceType.filter ?? [])];
		if (selectedGroup?.id) {
			filter.push(
				`${selectedDataSourceType.groupKey}:eq:${selectedGroup?.id}`,
			);
		}
		if (!isEmpty(keyword)) {
			filter.push(`identifiable:token:${keyword}`);
		}
		const data = (await refetch({
			page: 1,
			filter,
		})) as {
			sources: { pager: Pager; [key: string]: unknown };
		};
		setDataSources(getSources(data));
	};

	return { data: dataSources, error, loading, nextPage, search };
}
