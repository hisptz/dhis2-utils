import { compact, find, isArray, isEmpty, map } from "lodash";
import { DATA_SOURCES } from "../constants/index.js";
import CustomFunctions from "../models/customFunctions.js";
import DataSets from "../models/dataSets.js";
import DataSourceModel from "../models/dataSource.js";
import NativeDataSource from "../models/nativeDataSource.js";
import { DataSourceType } from "../types/index.js";
import { SqlViews } from "../models/sqlViews.js";

export function getDataSourcesList(
	dataSourcesConfig?: Array<string>,
): Array<DataSourceModel> {
	if (isArray(dataSourcesConfig) && !isEmpty(dataSourcesConfig)) {
		return compact(
			map(dataSourcesConfig, (dataSourceType) => {
				const dataSourceConfig: DataSourceType | undefined = find(
					DATA_SOURCES,
					["type", dataSourceType],
				);
				if (dataSourceConfig) {
					if (dataSourceConfig.native) {
						return new NativeDataSource(dataSourceConfig);
					}
					if (dataSourceConfig.type === "customFunction") {
						return new CustomFunctions(dataSourceConfig);
					}
					if (dataSourceConfig.type === "dataSet") {
						return new DataSets(dataSourceConfig);
					}
					if (dataSourceConfig.type === "sqlView") {
						return new SqlViews(dataSourceConfig);
					}
				}
			}),
		);
	}
	return [];
}
