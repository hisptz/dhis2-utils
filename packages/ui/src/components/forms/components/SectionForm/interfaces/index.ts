import {VALUE_TYPE} from "../../../constants";
import {OptionSet} from "@hisptz/dhis2-utils";

export interface FormElement {
    id: string;
    displayFormName: string;
    formName?: string;
    valueType: VALUE_TYPE;
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


interface StepperColorModeStyle {
    step?: {
        pending?: {
            background?: string;
            color?: string;
        },
        progress?: {
            background?: string;
            color?: string;
        },
        completed?: {
            background?: string;
            color?: string;
        }
    },
    content?: {
        pending?: {
            stepNumber?: { color?: string };
            title?: { color?: string; };
            status?: { background?: string; color?: string }
            description?: {
                color?: string;
            }
        },
        progress?: {
            stepNumber?: { color?: string };
            title?: { color?: string; };
            status?: { background?: string; color?: string }
            description?: {
                color?: string;
            }
        },
        completed?: {
            stepNumber?: { color?: string };
            title?: { color?: string; };
            status?: { background?: string; color?: string }
            description?: {
                color?: string;
            }
        }
    },
    progressBar?: {
        pending?: {
            background?: string;
        },
        progress?: {
            background?: string;
            fill?: string;
        },
        completed?: {
            background?: string;
            fill?: string;
        }
    }
}

export interface StepperStyles {
    light?: StepperColorModeStyle,
    dark?: StepperColorModeStyle
}
