import {
	createContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useContext,
	useState,
} from "react";
import type { dataSource, SelectedDataItem } from "../types";
import DataSource from "../models/dataSource";
import DataSourceModel from "../models/dataSource";
import NativeDataSource from "../models/nativeDataSource";
import { DATA_SOURCES } from "../constants";
import { head } from "lodash";
import { getDataSourcesList } from "../utils";

const SelectedValueContext = createContext<Array<SelectedDataItem>>([]);

export function useSelectedValue() {
	return useContext(SelectedValueContext);
}

const DataSourceContext = createContext<DataSource>(
	new NativeDataSource(DATA_SOURCES[0]),
);
const SetDataSourceContext = createContext<Dispatch<
	SetStateAction<DataSource>
> | null>(null);

export function useSelectedDataSourceState() {
	return [
		useContext(DataSourceContext),
		useContext(SetDataSourceContext)!,
	] as const;
}

export function useSelectedDataSource() {
	return useContext(DataSourceContext);
}

export function DataSourceSelectorProvider({
	children,
	selected,
	dataSources,
}: {
	selected?: SelectedDataItem[];
	dataSources?: dataSource[];
	children: ReactNode;
}) {
	const [selectedDataSourceType, setSelectedDataSourceType] =
		useState<DataSourceModel>(
			head(getDataSourcesList(dataSources ?? [])) ??
				new NativeDataSource(DATA_SOURCES[0]),
		);
	return (
		<SelectedValueContext.Provider value={selected ?? []}>
			<DataSourceContext.Provider value={selectedDataSourceType}>
				<SetDataSourceContext.Provider
					value={setSelectedDataSourceType}
				>
					{children}
				</SetDataSourceContext.Provider>
			</DataSourceContext.Provider>
		</SelectedValueContext.Provider>
	);
}
