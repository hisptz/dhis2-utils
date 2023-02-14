import React from "react";
import {FormSectionInterface, StepperStyles} from "./interfaces";
import {FormSection} from "./components/FormSection";
import {RHFDHIS2FormField} from "../react-hook-form-fields";
import {Button, ButtonStrip} from '@dhis2/ui';
import i18n from '@dhis2/d2-i18n';
import Collapsible from "react-collapsible";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import {useCounter} from "usehooks-ts";

export interface SectionFormProps {
    sections: FormSectionInterface[];
    showProgress?: boolean;
    collapsible?: boolean;
}

export function SectionForm({sections, showProgress, collapsible}: SectionFormProps) {
    return (
        <form style={{display: "flex", gap: 16, flexDirection: 'column'}}>
            {
                sections.map((section) => (
                    <FormSection collapsible={collapsible} key={`${section.id}-form-section`} section={section}
                                 showProgress={showProgress}/>
                ))
            }
        </form>
    )
}

export interface StepperSectionFormProps {
    sections: FormSectionInterface[];
    showProgress?: boolean;
    style: StepperStyles;
    horizontal?: boolean;
}


export function StepperSectionForm({sections, style, horizontal}: StepperSectionFormProps) {
    const {count: step, increment, decrement} = useCounter(0);
    return (
        <Stepper orientation={horizontal ? "horizontal" : "vertical"}>
            {
                sections.map((section, index) => (
                    <Step key={`${section.id}-stepper-section`}>
                        <StepLabel>{section.displayFormName}</StepLabel>
                        <StepContent>
                            <div style={{width: "100%", height: "100%"}}>
                                <Collapsible open={index === step} trigger={<div/>}>
                                    <div style={{display: "flex", flexDirection: "column", gap: 8}}>
                                        {
                                            section.dataItems?.map((dataItem) => {
                                                const required = dataItem.mandatory ?? dataItem.compulsory;
                                                return (
                                                    <RHFDHIS2FormField
                                                        key={`${dataItem.id}-field`}
                                                        valueType={dataItem.valueType}
                                                        label={dataItem.displayFormName ?? dataItem?.formName}
                                                        name={dataItem.id}
                                                        optionSet={dataItem.optionSet}
                                                        required={required}
                                                        validations={{
                                                            required: required ? `${dataItem.formName} is required` : undefined,
                                                            ...(dataItem?.validations ?? {})
                                                        }}
                                                    />
                                                )
                                            })
                                        }
                                        <ButtonStrip>
                                            {
                                                !(index === 0) && (<Button onClick={decrement}>
                                                    {i18n.t("Previous")}
                                                </Button>)
                                            }
                                            {
                                                !(index === sections.length - 1) && (
                                                    <Button primary onClick={increment}>
                                                        {i18n.t("Next")}
                                                    </Button>)
                                            }
                                        </ButtonStrip>
                                    </div>
                                </Collapsible>
                            </div>
                        </StepContent>
                    </Step>
                ))
            }
        </Stepper>
    )
}
