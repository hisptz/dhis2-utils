export interface FieldProps {
    /**
     * The name of the field . Useful (required) in tools like react hook form to track field changes. For multiple fields, this value must be unique
     * */
    name: string;
    /**
     * Field label that will appear on top of the field
     * */
    label?: string;
    /**
     * Field value
     * */
    value?: any;
    /**
     * A function that is called whenever the value of the field changes
     * */
    onChange: (value: any) => void;
    /**
     * An error message to display when the field has an error. Also accepts boolean for only showing the field's error state without any message
     * */
    error?: string | boolean
}

export interface RHFFieldProps {
    name: string;
    validations?: Record<string, any>;
    label?: string;

    [key: string]: any

}

export type LegendDefinition = {
    id: string;
    color: string;
    name: string;
};
