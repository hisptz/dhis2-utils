import React, {useMemo} from "react";
import Collapsible from "react-collapsible";
import {CircularProgressbarWithChildren} from "react-circular-progressbar";
import {FormSectionInterface} from "../../interfaces";
import {colors, IconErrorFilled24} from "@dhis2/ui";
import {useFormState, useWatch} from "react-hook-form";
import {useHiddenFields} from "../../../ProramRules/components/ProgramRuleProvider/hooks";
import {difference, isEmpty} from "lodash";
import {RHFDHIS2FormField} from "../../../react-hook-form-fields";


export interface FormSectionProps {
    showProgress?: boolean;
    section: FormSectionInterface;
    collapsible?: boolean;

}

export interface FormSectionHeaderProps {
    section: FormSectionInterface;
    showProgress?: boolean;
}

export function FormSectionHeader({showProgress, section}: FormSectionHeaderProps) {
    const dataItems = useMemo(() => section.dataItems, [section.dataItems]);
    const mandatoryFields = useMemo(() => dataItems?.filter((dataItem) => (dataItem.type === 'dataElement' && dataItem.compulsory) || (dataItem.mandatory)) ?? [], [dataItems]);
    const mandatoryFieldIds = useMemo(() => mandatoryFields.map(({id}) => id), [mandatoryFields]);
    const hiddenFields = useHiddenFields(mandatoryFieldIds);

    const fieldsToWatch = useMemo(() => difference(mandatoryFieldIds, hiddenFields), [mandatoryFieldIds, hiddenFields]);

    const fieldValues = useWatch({
        name: fieldsToWatch
    })

    const progress = useMemo(() => {
        const filledFields = fieldValues.filter((value) => value !== undefined);
        return Math.floor(filledFields.length / fieldsToWatch.length) * 100
    }, [fieldsToWatch.length, fieldValues]);

    const fieldsState = useFormState({
        name: fieldsToWatch
    });

    const sectionHasErrors = useMemo(() => {
        return !isEmpty(fieldsState.errors);
    }, [fieldsState.errors]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
        }}>
            <h2>
                {section.displayFormName}
            </h2>
            <div style={{display: "flex", gap: 16, alignItems: "center"}}>
                {sectionHasErrors && <IconErrorFilled24 color={colors.red500}/>}
                {
                    showProgress && (<CircularProgressbarWithChildren
                        styles={{
                            path: {
                                stroke: `var(--primary)`,
                            },
                            text: {
                                fill: `var(--primary)`,
                                fontSize: 32,
                                fontWeight: 'bold',
                            },
                        }}
                        strokeWidth={7}
                        value={progress}
                    >
                        <div style={{fontSize: 12, marginTop: -11}}>
                            <strong>{progress}%</strong>
                        </div>
                    </CircularProgressbarWithChildren>)
                }
            </div>
        </div>
    )
}

export function FormSection({showProgress, section, collapsible}: FormSectionProps) {

    if (collapsible) {
        return (
            <div style={{display: "flex", gap: 16, flexDirection: "column", alignItems: "center"}}>
                <FormSectionHeader section={section} showProgress={showProgress}/>
                <div style={{display: 'flex', flexDirection: "column"}}>
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
                </div>
            </div>
        )
    }

    return (
        <Collapsible
            trigger={
                <FormSectionHeader section={section} showProgress={showProgress}/>
            }>
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
        </Collapsible>
    )
}
