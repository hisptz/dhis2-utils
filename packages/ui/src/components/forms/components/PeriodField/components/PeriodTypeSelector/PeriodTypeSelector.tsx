import i18n from "@dhis2/d2-i18n";
import {SingleSelectField, SingleSelectOption} from "@dhis2/ui";
import React, {useMemo} from "react";
import classes from "./PeriodTypeSelector.module.css";
import {PeriodTypeCategory, PeriodUtility} from "@hisptz/dhis2-utils";
import {FieldProps} from "../../../../interfaces";


export interface PeriodTypeSelectorProps extends FieldProps {
    fixed?: boolean;
    relative?: boolean;
}

export function PeriodTypeSelector({
                                       label,
                                       name,
                                       value,
                                       onChange,
                                       error,
                                       warning,
                                       required,
                                       fixed,
                                       relative,
                                       ...props
                                   }: PeriodTypeSelectorProps) {
    const fixedPeriodTypes = useMemo(() => fixed || !relative ? PeriodUtility.fromObject({
        category: PeriodTypeCategory.FIXED,
        year: new Date().getFullYear()
    }).periodTypes : [], []);
    const relativePeriodTypes = useMemo(() => relative || !fixed ? PeriodUtility.fromObject({
        category: PeriodTypeCategory.RELATIVE,
        year: new Date().getFullYear()
    }).periodTypes : [], []);

    return (
        <SingleSelectField
            {...props}
            name={name}
            label={label}
            required={required}
            filterable
            selected={value}
            onChange={({selected}: { selected: string }) => onChange(selected)}
            validationText={error ?? warning}
            error={!!error}>
            <SingleSelectOption value={"disabled"} disabled className={classes["select-header"]}
                                label={i18n.t("Fixed Periods")}/>
            {
                fixedPeriodTypes?.map((periodType) => {
                    return (
                        <SingleSelectOption
                            key={periodType.id}
                            value={periodType.id}
                            label={periodType.config.name}
                        />
                    );
                })
            }
            <SingleSelectOption value="disabled" disabled className={classes["select-header"]}
                                label={i18n.t("Relative Periods")}/>
            {
                relativePeriodTypes?.map((periodType) => {
                    return (
                        <SingleSelectOption
                            key={periodType.id}
                            value={periodType.id}
                            label={periodType.config.name}
                        />
                    );
                })
            }
        </SingleSelectField>
    );
}

