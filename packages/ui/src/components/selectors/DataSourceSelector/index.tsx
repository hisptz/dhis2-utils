import {Chip, CssReset} from "@dhis2/ui";
import {head} from "lodash";
import React, {useMemo, useState} from "react";
import DataSource from "./components/DataSource";
import GroupSelector from "./components/GroupSelector";
import {DATA_SOURCES} from "./constants";
import DataSourceModel from "./models/dataSource";
import NativeDataSource from "./models/nativeDataSource";
import {DataSourceSelectorProps} from "./types";
import {getDataSourcesList} from "./utils";
import styled from "styled-components";

export function DataSourceSelector({ onSelect, disabled, dataSources, maxSelections, selected }: DataSourceSelectorProps) {
  const dataSourcesList = useMemo(() => getDataSourcesList(dataSources), [dataSources]);
  const [selectedDataSourceType, setSelectedDataSourceType] = useState<DataSourceModel>(head(dataSourcesList) ?? new NativeDataSource(DATA_SOURCES[0]));
  const [selectedGroup, setSelectedGroup] = useState();
  const onGroupChange = (group: React.SetStateAction<undefined>) => {
    setSelectedGroup(group);
  };

  const onDataSourceSelect = (selected: Array<any>) => {
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
}`

  return (
    <div className="start">
      <CssReset />
      <BorderedContainer >
        <div className="row p-8 wrap">
          {dataSourcesList.length > 1 &&
            dataSourcesList?.map((source) => (
              <Chip onClick={() => onDataSourceTypeChange(source)} selected={selectedDataSourceType?.label === source.label} key={`chip-${source.label}`}>
                {source.label}
              </Chip>
            ))}
        </div>
        <div style={{display: "flex", flexDirection: "column"}}>
          <GroupSelector selectedGroup={selectedGroup} onSelect={onGroupChange} selectedDataType={selectedDataSourceType} />
          <div style={{paddingTop: 16}}>
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
