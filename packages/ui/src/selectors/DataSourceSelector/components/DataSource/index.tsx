import { Field, Transfer } from "@dhis2/ui";
import { debounce, find, findIndex, uniqBy } from "lodash";
import React, { memo, useMemo, useRef, useState } from "react";
import { DataSourceProps } from "../../types";
import DataSourceSearch from "../Search/index.js";
import useDataSources from "./hooks/useDataSources.js";
import type { FetchError } from "@dhis2/app-runtime";
import { useSelectedDataSource, useSelectedValue } from "../ConfigProvider";

function DataSourceField({
	error,
	maxSelections,
	onEndReached,
	loading,
	onChange,
	selectedDataSourceType,
	searchKeyword,
	dataSources,
	selectedIds,
	setSearchChange,
}: {
	error?: FetchError;
	maxSelections?: number | string;
	dataSources: Array<{ label: string; value: string }>;
	searchKeyword?: string;
	loading: boolean;
	onChange: (value: { id: string; type: string; label?: string }[]) => void;
	selectedDataSourceType: any;
	onEndReached: () => void;
	selectedIds: Array<string>;
	setSearchChange: (value: string) => void;
}) {
	return (
		<Field error={!!error} validationText={error?.message}>
			<Transfer
				maxSelections={
					typeof maxSelections === "number"
						? maxSelections
						: undefined
				}
				onEndReached={onEndReached}
				loading={loading}
				onChange={(value: { selected: Array<string> }) => {
					onChange(
						value.selected.map((id) => {
							const selectedDataSource = find(dataSources, [
								"value",
								id,
							]);
							return {
								id,
								...(selectedDataSource ?? {}),
								displayName: selectedDataSource?.label,
								type: selectedDataSourceType?.type,
							};
						}),
					);
				}}
				selected={selectedIds}
				options={dataSources}
				leftHeader={
					<DataSourceSearch
						setSearchKeyword={setSearchChange}
						keyword={searchKeyword}
					/>
				}
			/>
		</Field>
	);
}

const MemoDataSourceField = memo(DataSourceField);

export default function DataSource({
	selectedGroup,
	onChange,
	disabled,
	maxSelections,
}: DataSourceProps) {
	const selected = useSelectedValue();
	const selectedDataSourceType = useSelectedDataSource();

	const [searchKeyword, setSearchKeyword] = useState<string | undefined>();
	const { loading, data, error, nextPage, search } = useDataSources(
		selectedDataSourceType,
		selectedGroup,
	);

	const dataSources = useMemo(() => {
		const loadedData = data ?? [];
		const selectedData = selected ?? [];
		return uniqBy([...loadedData, ...selectedData], "id")?.map(
			(source) => ({
				label: source.displayName,
				value: source.id,
				disabled: findIndex(disabled, (val) => val === source.id) >= 0,
			}),
		);
	}, [data, selected, selectedGroup]);

	const onEndReached = () => {
		if (loading) {
			return;
		}
		nextPage();
	};

	const onSearchChange = useRef(debounce(search, 1000, { maxWait: 1500 }));

	const setSearchChange = (keyword: string) => {
		setSearchKeyword(keyword);
		onSearchChange.current(keyword);
	};
	const selectedIds = useMemo(
		() => selected?.map(({ id }) => id),
		[selected],
	);

	return (
		<MemoDataSourceField
			maxSelections={maxSelections}
			searchKeyword={searchKeyword}
			error={error}
			dataSources={dataSources}
			loading={loading}
			onChange={onChange}
			selectedDataSourceType={selectedDataSourceType}
			onEndReached={onEndReached}
			selectedIds={selectedIds}
			setSearchChange={setSearchChange}
		/>
	);
}
