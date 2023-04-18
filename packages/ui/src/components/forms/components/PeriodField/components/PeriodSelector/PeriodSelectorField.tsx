import React, {useMemo, useState} from "react";
import {CustomSelectField} from "../../../CustomSelectField";
import {FieldProps} from "../../../../interfaces";
import i18n from "@dhis2/d2-i18n";
import {PeriodTypeCategory, PeriodTypeEnum, PeriodUtility} from "@hisptz/dhis2-utils";

export interface PeriodSelectorFieldProps extends FieldProps {
    periodType?: PeriodTypeEnum;
}

export function PeriodSelectorField({value, periodType, onChange}: PeriodSelectorFieldProps) {
    const defaultYear = useMemo(() => {
        const periodObject = PeriodUtility.getPeriodById(value);
        return periodObject.start.year;
    }, [value]);
    const [year, setYear] = useState(defaultYear ?? new Date().getFullYear());
    const options = useMemo(() => {
        if (!periodType) {
            return [];
        }

        const utility = PeriodUtility.fromObject({
            year,
            category: PeriodTypeCategory.FIXED,
        });
        const type = utility.getPeriodType(periodType.toUpperCase());
        return type?.periods?.map(({id, name}) => ({
            name: name,
            code: id
        }));
    }, [periodType, year]);

    const years = useMemo(() => new Array(10).fill("").map((_, index) => ({
            code: (new Date().getFullYear() - index).toString(),
            name: new Date().getFullYear() - index
        })).reverse(),
        []
    );

    return (
        <div style={{display: "flex", gap: 16, width: "100%"}}>
            <CustomSelectField
                fullWidth
                label={i18n.t("Year")}
                value={year.toString()}
                optionSet={{options: years}}
                name="year"
                onChange={setYear}
            />
            <CustomSelectField
                fullWidth
                label={i18n.t("Period")}
                value={value}
                optionSet={{options}}
                name="periodSelection"
                onChange={onChange}
            />
        </div>
    );
}
