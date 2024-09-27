import React from "react";
import { DataSourceSelectorProps } from "./types";
import { DataSourceSelectorProvider } from "./components/ConfigProvider";
import { MemoSelector } from "./components/Selector";

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
	return (
		<DataSourceSelectorProvider
			selected={selected}
			dataSources={dataSources}
		>
			<MemoSelector
				onSelect={onSelect}
				maxSelections={maxSelections}
				disabled={disabled}
			/>
		</DataSourceSelectorProvider>
	);
}
