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
                                                                                      error,
                                                                                      warning,
                                                                                      ...props
                                                                                  }: RichTextEditorProps, ref: React.Ref<any>) {
    const config = {
        readonly: false,
        defaultFontSizePoints: "pt"
    };
    return (
        <Field {...props} name={name} label={label} value={value} error={Boolean(error)} warning={Boolean(warning)}
               validationText={error ?? warning}>
            <JoditEditor
                ref={ref}
                value={value}
                onBlur={(newValue: any) => onChange(newValue)}
                config={config}
            />
        </Field>
    );
});
