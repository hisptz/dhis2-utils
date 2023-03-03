import {Story} from "@storybook/react"
import React from "react";
import {SectionForm, SectionFormProps, StepperSectionForm, StepperSectionFormProps} from ".";
import {FormSectionInterface} from "./interfaces";
import {FormProvider, useForm} from "react-hook-form";

const exampleForm: { sections: FormSectionInterface[] } = {
    sections: [
        {
            id: "test-section",
            displayFormName: "Test",
            dataItems: [
                {
                    "valueType": "TEXT",
                    "displayFormName": "First name",
                    "id": "w75KJ2mc4zz",
                    type: "trackedEntityAttribute",
                    mandatory: true
                },
                {
                    "valueType": "TEXT",
                    "displayFormName": "Gender",
                    "id": "cejWyOfXge6",
                    type: "trackedEntityAttribute",
                    mandatory: true

                },
                {
                    "valueType": "TEXT",
                    "displayFormName": "Last name",
                    "id": "zDhUuAYrxNC",
                    type: "trackedEntityAttribute",
                    mandatory: true

                },
                {
                    "valueType": "TEXT",
                    "displayFormName": "Unique ID",
                    "id": "lZGmxYbs97q",
                    type: "trackedEntityAttribute"

                }
            ]
        },
        {
            id: "test-section-2",
            displayFormName: "Test",
            dataItems: [
                {
                    "valueType": "TEXT",
                    "displayFormName": "First name",
                    "id": "w75KJ2mc4zz",
                    type: "trackedEntityAttribute",
                    mandatory: true
                },
                {
                    "valueType": "TEXT",
                    "displayFormName": "Gender",
                    "id": "cejWyOfXge6",
                    type: "trackedEntityAttribute",
                    mandatory: true

                },
                {
                    "valueType": "TEXT",
                    "displayFormName": "Last name",
                    "id": "zDhUuAYrxNC",
                    type: "trackedEntityAttribute",
                    mandatory: true

                },
                {
                    "valueType": "TEXT",
                    "displayFormName": "Unique ID",
                    "id": "lZGmxYbs97q",
                    type: "trackedEntityAttribute"

                }
            ]
        },
        {
            id: "test-section-3",
            displayFormName: "Test",
            dataItems: [
                {
                    "valueType": "TEXT",
                    "displayFormName": "First name",
                    "id": "w75KJ2mc4zz",
                    type: "trackedEntityAttribute",
                    mandatory: true
                },
                {
                    "valueType": "TEXT",
                    "displayFormName": "Gender",
                    "id": "cejWyOfXge6",
                    type: "trackedEntityAttribute",
                    mandatory: true

                },
                {
                    "valueType": "TEXT",
                    "displayFormName": "Last name",
                    "id": "zDhUuAYrxNC",
                    type: "trackedEntityAttribute",
                    mandatory: true

                },
                {
                    "valueType": "TEXT",
                    "displayFormName": "Unique ID",
                    "id": "lZGmxYbs97q",
                    type: "trackedEntityAttribute"

                }
            ]
        },
    ]
}
const Template: Story<SectionFormProps> = (args) => <SectionForm {...args} />
const StepperForm: Story<StepperSectionFormProps> = (args) => <StepperSectionForm {...args} />

export const Default = Template.bind({});

Default.args = {
    sections: exampleForm.sections,
    collapsible: false,
    showProgress: false
}
export const CollapsibleSections = Template.bind({});

CollapsibleSections.args = {
    sections: exampleForm.sections,
    collapsible: true,
    showProgress: false
}


export const StepperDefault = StepperForm.bind({});
StepperDefault.args = {
    sections: exampleForm.sections,

}

export default {
    title: "Form/Section Form",
    component: [SectionForm, StepperSectionForm],
    decorators: [
        (Story: React.JSXElementConstructor<any>) => {
            const form = useForm();
            return (
                <div style={{width: "100%", minWidth: 400, minHeight: 800, maxHeight: "1000px", overflow: "auto"}}>
                        <FormProvider {...form}>
                            <Story/>
                        </FormProvider>
                </div>
            )
        }
    ]
}


