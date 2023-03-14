import {FieldState,} from '../state';
import type {OptionSet} from '@hisptz/dhis2-utils';
import React from "react"
import {useRecoilValue} from "recoil";

export interface FieldProgramRuleChildrenProps {
    hidden: boolean;
    warning: string;
    optionSet: OptionSet;
    loading: boolean;
}

export const FieldProgramRule = React.memo(function FieldProgramRule({
                                                                         name,
                                                                         children,
                                                                         optionSet,
                                                                     }: {
    name: string;
    children: any;
    optionSet?: OptionSet;
}) {
    const {loading, minMax, warning, disabled, hiddenOptions, hidden} = useRecoilValue(FieldState(name)) ?? {};
    const filteredOptions =
        optionSet?.options?.filter((option: { code: string; }) => !hiddenOptions?.includes(option.code)) ?? [];

    return children({
        optionSet: optionSet ? {...optionSet, options: filteredOptions} : undefined,
        hidden,
        warning,
        loading,
        disabled,
        min: minMax?.min,
        max: minMax?.max,
    } as FieldProgramRuleChildrenProps);
})
