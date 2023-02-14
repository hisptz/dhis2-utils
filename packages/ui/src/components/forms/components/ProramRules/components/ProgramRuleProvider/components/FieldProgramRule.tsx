import {useRecoilValue} from 'recoil';
import {
    FieldDisabledState,
    FieldHiddenOptionsState,
    FieldLoadingState,
    FieldMinMaxState,
    FieldVisibilityState,
    FieldWarningState,
} from '../state';
import type {OptionSet} from '@hisptz/dhis2-utils';

export interface FieldProgramRuleChildrenProps {
    visible: boolean;
    warning: string;
    optionSet: OptionSet;
    loading: boolean;
}

export default function FieldProgramRule({
    name,
    children,
    optionSet,
}: {
    name: string;
    children: any;
    optionSet: OptionSet;
}) {
    const hiddenOptionSets: string[] = useRecoilValue(FieldHiddenOptionsState(name));
    const visible = useRecoilValue(FieldVisibilityState(name));
    const loading = useRecoilValue(FieldLoadingState(name));
    const disabled = useRecoilValue(FieldDisabledState(name));
    const minMax = useRecoilValue(FieldMinMaxState(name));
    const filteredOptions =
        optionSet?.options?.filter((option) => !hiddenOptionSets.includes(option.code)) ?? [];
    const warning: string = useRecoilValue(FieldWarningState(name));

    return children({
        optionSet: { ...optionSet, options: filteredOptions },
        visible,
        warning,
        loading,
        disabled,
        min: minMax?.min,
        max: minMax?.max,
    } as FieldProgramRuleChildrenProps);
}
