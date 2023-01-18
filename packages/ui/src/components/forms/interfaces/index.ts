export interface FieldProps {
    name: string;
    label?: string;
    value?: any;
    onChange: (value: any) => void;
    error?: string | boolean
}

export interface RHFFieldProps {
    name: string;
    validations?: Record<string, any>
}

export type LegendDefinition = {
    id: string;
    color: string;
    name: string;
};
