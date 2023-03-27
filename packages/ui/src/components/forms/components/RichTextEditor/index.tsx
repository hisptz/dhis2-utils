import {Field} from "@dhis2/ui";
import JoditEditor from "jodit-react";
import React, {forwardRef} from "react";
import {FieldProps} from "../../interfaces";


export interface RichTextEditorProps extends FieldProps {


}

export const RichTextEditor: React.FC<RichTextEditorProps> = forwardRef(function ({
                                                                                      name,
                                                                                      label,
                                                                                      value,
                                                                                      onChange,
                                                                                      ...props
                                                                                  }: RichTextEditorProps, ref: React.Ref<any>) {
    const config = {
        readonly: false,
        defaultFontSizePoints: "pt"
    };
    return (
        <Field {...props} name={name} label={label} value={value}>
            <JoditEditor
                ref={ref}
                value={value}
                onBlur={(newValue: any) => onChange(newValue)}
                config={config}
            />
        </Field>
    );
});
