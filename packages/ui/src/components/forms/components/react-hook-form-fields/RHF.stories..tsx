import {Story} from "@storybook/react"
import React from "react";
import {RHFDHIS2FormField, RHFDHIS2FormFieldProps} from "./RHFDHIS2FormField";
import {FormProvider, useForm} from "react-hook-form";
import {Button} from '@dhis2/ui'

const Template: Story<RHFDHIS2FormFieldProps> = (args) => <RHFDHIS2FormField {...args} />


export const Default = Template.bind({});
Default.args = {
    name: "text",
    valueType: "TEXT",
}

export const DateField = Template.bind({});
DateField.args = {
    name: "date",
    valueType: "DATE",
}

export const FileUploadField = Template.bind({});
FileUploadField.args = {
    name: "file",
    valueType: "FILE_RESOURCE",
}

export const WithValidations = Template.bind({});
WithValidations.args = {
    name: "text",
    valueType: "TEXT",
    validations:{
        required: "Field is required"
    }
}

export default {
    title: "Form/RHF Form fields",
    component: RHFDHIS2FormField,
    decorators: [
        (Story: any) => {
            const form = useForm();

            const onSubmit = (data: any) => {
                console.log(data);
            }

            return (
                <FormProvider {...form}>
                    <form style={{display: "flex", gap: 16, alignItems: "center"}} onSubmit={form.handleSubmit(onSubmit)}>
                        <Story/>
                        <Button type="submit">Submit</Button>
                    </form>
                </FormProvider>
            )

        }
    ]
}
