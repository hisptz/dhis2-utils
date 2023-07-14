import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Button} from "@dhis2/ui";
import {RHFDHIS2FormField, RHFDHIS2FormFieldProps} from "@hisptz/dhis2-ui";

type Story = StoryObj<typeof RHFDHIS2FormField>;

export const TextField: Story = {
    args: {
        name: "text",
        valueType: "TEXT",
    }
}
export const DateField: Story = {
    args: {
        name: "date",
        valueType: "DATE",
    }
}
export const WithOptionSets: Story = {
    args: {
        name: "text",
        valueType: "TEXT",
        optionSet: {
            id: "string",
            options: [{
                id: "one",
                code: "one",
                name: "One"
            }]
        }
    }
}

export const LegendMinMaxGroup: Story = {
    args: {
        name: "legends",
        valueType: "LEGEND_MIN_MAX_GROUP",
        min: 0,
        max: 100,
        highIsGood: false,
        legendDefinitions: [
            {
                name: "Hooray!",
                id: "perfect",
                color: "#0f630f"
            },
            {
                name: "Not bad",
                id: "not-bad",
                color: "#dcc211"
            },
            {
                name: "Um, yeah it's bad",
                id: "bad",
                color: "#ea0823"
            },
        ],
    }
}
export const FileUploadField: Story = {
    args: {
        name: "file",
        valueType: "FILE_RESOURCE",
    }
}
export const WithValidations: Story = {
    args: {
        name: "text",
        valueType: "TEXT",
        validations: {
            required: "Field is required"
        }
    }
}

const meta: Meta<RHFDHIS2FormFieldProps> = {
    title: "Form/RHF Form fields",
    component: RHFDHIS2FormField,
    decorators: [
        (Story: any) => {
            const form = useForm();
            const onSubmit = (data: any) => {
                console.log(data);
            };
            return (
                <FormProvider {...form}>
                    <form style={{display: "flex", gap: 16, alignItems: "center"}}
                          onSubmit={form.handleSubmit(onSubmit)}>
                        <Story/>
                        <Button type="submit">Submit</Button>
                    </form>
                </FormProvider>
            );

        }
    ]
};

export default meta;
