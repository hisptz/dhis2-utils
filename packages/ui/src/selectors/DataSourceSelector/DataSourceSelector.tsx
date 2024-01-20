import { Chip, CssReset } from "@dhis2/ui";
import { head } from "lodash";
import React, { useMemo, useState } from "react";
import DataSource from "./components/DataSource";
import GroupSelector from "./components/GroupSelector";
import { DATA_SOURCES } from "./constants";
import DataSourceModel from "./models/dataSource";
import NativeDataSource from "./models/nativeDataSource";
import { DataSourceSelectorProps, SelectedDataItem } from "./types";
import { getDataSourcesList } from "./utils";
import styled from "styled-components";

/**
 * The `DataSourceSelector` is a component that simplifies the selection of DHIS2 data dimensions.
 * This is useful in creating custom analysis tools.
 * The selector currently supports `indicators`, `programIndicators`, `dataElements`, `dataSets`, and `sqlViews`.
 *
 * The component also allows you to filter out the data items by grouping (This only applies to data sources that can be grouped).
 * You can also filter by using the search area to search for specific data item. Both of the filters are done on the server side.
 *
 * The component also has an infinite scroll on the source side. This allows you to see all the data items in the list if there are more than 100 data items.
 *
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onSelect - The function to be called when a data source is selected.
 * @param {boolean} props.disabled - Disables the selector
 * @param {Array} props.dataSources - Allows you to specify the data sources you want to appear in the selector.
 * @param {number} props.maxSelections - The maximum number of selections allowed.
 * @param {Array} props.selected - The array of currently selected data items.
 *
 * @returns {JSX.Element} The rendered component.
 */
export function DataSourceSelector({
	onSelect,
	disabled,
	dataSources,
	maxSelections,
	selected,
}: DataSourceSelectorProps) {
	const dataSourcesList = useMemo(
		() => getDataSourcesList(dataSources),
		[dataSources],
	);
	const [selectedDataSourceType, setSelectedDataSourceType] =
		useState<DataSourceModel>(
			head(dataSourcesList) ?? new NativeDataSource(DATA_SOURCES[0]),
		);
	const [selectedGroup, setSelectedGroup] = useState();
	const onGroupChange = (group: React.SetStateAction<undefined>) => {
		setSelectedGroup(group);
	};

	const onDataSourceSelect = (selected: Array<SelectedDataItem>) => {
		onSelect(selected);
	};

	const onDataSourceTypeChange = (sourceType: DataSourceModel) => {
		setSelectedGroup(undefined);
		setSelectedDataSourceType(sourceType);
	};

	const BorderedContainer = styled.div`{
        box-sizing: border-box;
        border-radius: 4px;
        border: 1px solid #A0ADBA;
        display: flex;
        flex-direction: column;
        padding: 8px;
    }`;

	return (
		<div className="start">
			<CssReset />
			<BorderedContainer>
				<div className="row p-8 wrap">
					{dataSourcesList.length > 1 &&
						dataSourcesList?.map((source) => (
							<Chip
								onClick={() => onDataSourceTypeChange(source)}
								selected={
									selectedDataSourceType?.label ===
									source.label
								}
								key={`chip-${source.label}`}
							>
								{source.label}
							</Chip>
						))}
				</div>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<GroupSelector
						selectedGroup={selectedGroup}
						onSelect={onGroupChange}
						selectedDataType={selectedDataSourceType}
					/>
					<div style={{ paddingTop: 16 }}>
						<DataSource
							maxSelections={maxSelections}
							disabled={disabled}
							selected={selected ?? []}
							onChange={onDataSourceSelect}
							selectedGroup={selectedGroup}
							selectedDataSourceType={selectedDataSourceType}
						/>
					</div>
				</div>
			</BorderedContainer>
		</div>
	);
}
