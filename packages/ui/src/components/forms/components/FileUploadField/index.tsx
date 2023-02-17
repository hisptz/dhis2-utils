import React from 'react'
import {FileInputField as FileField, FileList as FileListComponent, FileListItem} from "@dhis2/ui"
import i18n from '@dhis2/d2-i18n';
import {FieldProps} from "../../interfaces";


export interface FileInputFieldProps extends FieldProps {
    name: string,
    accept?: string;

    [key: string]: any
}

export const FileUploadField = React.forwardRef(({
                                                     name,
                                                     value,
                                                     error,
                                                     onChange,
                                                     validations,
                                                     accept,
                                                     ...props
                                                 }: FileInputFieldProps, ref): React.ReactElement => {

    return (
        <FileField
            {...props}
            files={[value]}
            validationText={error}
            error={!!error}
            accept={accept ?? "image/*,.jpg,.png,.pdf,.doc,.docx"}
            name={name}
            onChange={({files}: { files: FileList }) => {
                onChange(files.item(0));
            }}
            ref={ref}
        >
            {
                value && (<FileListComponent>
                    <FileListItem removeText={i18n.t("Remove")} onRemove={() => onChange(undefined)}
                                  label={value?.name} file={value}/>
                </FileListComponent>)
            }
        </FileField>
    )
})
