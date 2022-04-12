import {DHIS2Resource} from "./base";
import {DataElement} from "./metadata";

export interface DataSet extends DHIS2Resource {
    categoryCombo?: { id: string };
    dataSetElements?: { dataElement: DataElement, dataSet: DataSet }[];
    organisationUnits?: { id: string }[];
    indicators?: { id: string }[];
    dataInputPeriods?: { id: string }[];
    periodType?: string;
    dimensionItemType?: string;
    openFuturePeriods?: number;
    expiryDays?: number;
    fieldCombinationRequired?: boolean;
    periodOffset?: number;
    timelyDays?: number;
    version?: number;
    validCompleteOnly?: boolean;
}
