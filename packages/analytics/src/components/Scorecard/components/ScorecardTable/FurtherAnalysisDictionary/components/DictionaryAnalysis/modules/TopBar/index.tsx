import { Tab, TabBar } from "@dhis2/ui";
import React from "react";
import { useDictionaryConfigState } from "../../../ConfigProvider";

export default function TopBar() {
	const [config, setConfig] = useDictionaryConfigState();
	const selectedTab = config.selectedDataSource;
	return (
		<TabBar>
			{config.dataSources?.map((dataSource) => (
				<Tab
					selected={selectedTab?.id === dataSource?.id}
					onClick={() =>
						setConfig((prev) => {
							return {
								...prev,
								selectedDataSource: dataSource,
							};
						})
					}
					key={`${dataSource?.id}-tab`}
				>
					{dataSource?.label}
				</Tab>
			))}
		</TabBar>
	);
}
