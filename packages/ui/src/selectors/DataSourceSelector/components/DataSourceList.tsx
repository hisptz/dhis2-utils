import { Chip } from "@dhis2/ui";
import React, { useMemo } from "react";
import { getDataSourcesList } from "../utils";
import type { dataSource } from "../types";
import { useSelectedDataSourceState } from "./ConfigProvider";

export function DataSourceList({
	dataSources,
}: {
	dataSources?: dataSource[];
}) {
	const dataSourcesList = useMemo(
		() => getDataSourcesList(dataSources),
		[dataSources],
	);

	const [selectedDataSource, setSelectedDataSource] =
		useSelectedDataSourceState();

	return (
		<div className="row p-8 wrap">
			{dataSourcesList.length > 1 &&
				dataSourcesList?.map((source) => (
					<Chip
						onClick={() => setSelectedDataSource(source)}
						selected={selectedDataSource?.label === source.label}
						key={`chip-${source.label}`}
					>
						{source.label}
					</Chip>
				))}
		</div>
	);
}
