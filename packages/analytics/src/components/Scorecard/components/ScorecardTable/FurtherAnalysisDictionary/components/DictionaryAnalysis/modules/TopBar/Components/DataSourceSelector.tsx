import React from "react";
import { dataSourceTypes } from "../../../Utils/Models";
import DataElementPage from "../../DataElement";
import Indicator from "../../Indicator/Indicator";
import { useDictionaryConfigState } from "../../../../ConfigProvider";

export default function DataSourceSelector() {
	const [config] = useDictionaryConfigState();
	const dataType = config.selectedDataSource!.type;
	const id = config.selectedDataSource!.id;

	if (dataType === dataSourceTypes.INDICATOR) {
		return <Indicator />;
	}
	if (dataType === dataSourceTypes.DATA_ELEMENT) {
		return <DataElementPage />;
	}
	// if (dataType === dataSourceTypes.PROGRAM_DATA_ELEMENT) {
	// 	return <DataElementPage id={id} />;
	// }
	// if (dataType === dataSourceTypes.PROGRAM_INDICATOR) {
	// 	return <ProgramIndicatorPage id={id} />;
	// }
	// if (dataType === dataSourceTypes.DATA_ELEMENT_GROUP) {
	// 	return <DataElementGroupPage id={id} />;
	// }
	// if (dataType === dataSourceTypes.INDICATOR_GROUP) {
	// 	return <IndicatorGroupPage id={id} />;
	// }
	// if (dataType === dataSourceTypes.FUNCTION) {
	// 	return <FunctionPage2 id={id} />;
	// }
	return null;
}
