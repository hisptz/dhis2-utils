export interface FieldProps {
    name: string;
    value: any;
    onChange: (value: any) => void;
    error?: string | boolean
}

export interface RHFFieldProps {
    name: string;
    validations?: Record<string, any>
}
