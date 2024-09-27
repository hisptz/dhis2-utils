import { CssReset } from "@dhis2/ui";
import GroupSelector from "./GroupSelector";
import DataSource from "./DataSource";
import React, { memo, useState } from "react";
import styled from "styled-components";
import { DataSourceList } from "./DataSourceList";
import { type DataSourceSelectorProps, SelectedDataItem } from "../types";
import { useSelectedDataSource } from "./ConfigProvider";

function Selector({
	maxSelections,
	onSelect,
	disabled,
	dataSources,
}: Pick<
	DataSourceSelectorProps,
	"maxSelections" | "onSelect" | "disabled" | "dataSources"
>) {
	const BorderedContainer = styled.div`{
        box-sizing: border-box;
        border-radius: 4px;
        border: 1px solid #A0ADBA;
        display: flex;
        flex-direction: column;
        padding: 8px;
    }`;

	const [selectedGroup, setSelectedGroup] = useState();
	const onGroupChange = (group: React.SetStateAction<undefined>) => {
		setSelectedGroup(group);
	};

	const onDataSourceSelect = (selected: Array<SelectedDataItem>) => {
		onSelect(selected);
	};

	useSelectedDataSource();

	return (
		<div className="start">
			<CssReset />
			<BorderedContainer>
				<DataSourceList dataSources={dataSources} />
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 16,
					}}
				>
					<GroupSelector
						selectedGroup={selectedGroup}
						onSelect={onGroupChange}
					/>
					<DataSource
						maxSelections={maxSelections}
						disabled={disabled}
						onChange={onDataSourceSelect}
						selectedGroup={selectedGroup}
					/>
				</div>
			</BorderedContainer>
		</div>
	);
}

export const MemoSelector = memo(Selector);
