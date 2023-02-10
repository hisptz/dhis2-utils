import {VALUE_TYPE} from "../../../constants";
import {OptionSet} from "@hisptz/dhis2-utils";

export interface FormElement {
    id: string;
    displayFormName: string;
    formName?: string;
    valueType: VALUE_TYPE;
    value: unknown;
    optionSet?: OptionSet;
    mandatory?: boolean;
    compulsory?: boolean;
    type: 'dataElement' | 'trackedEntityAttribute' | 'attribute' | 'custom',
    validations?: Record<string, any>
}

export interface FormSectionInterface {
    id: string;
    displayFormName: string;
    dataItems: Array<FormElement>

}
