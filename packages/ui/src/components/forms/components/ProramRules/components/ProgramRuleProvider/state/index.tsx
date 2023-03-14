import React from "react";
import {atomFamily, RecoilRoot, selectorFamily} from "recoil";


export const FieldVisibilityState = atomFamily({
    key: 'field-visibility-state',
    default: false,
});

export const FieldHiddenOptionsState = atomFamily<string[], string>({
    key: 'field-hidden-options-state',
    default: [],
});

export const FieldWarningState = atomFamily<string, string>({
    key: 'field-warning-state',
    default: '',
});

export const FieldLoadingState = atomFamily<boolean, string>({
    key: 'field-loading-state',
    default: false,
});

export const FieldDisabledState = atomFamily<boolean, string>({
    key: 'field-disabled-state',
    default: false,
});

export const FieldMinMaxState = atomFamily<
    { min?: number | string; max?: number | string },
    string
>({
    key: 'field-min-max-state',
    default: undefined,
});


export const FieldState = selectorFamily({
    key: 'field-state',
    get: (field: string) => ({get}) => {

        return {
            hidden: get(FieldVisibilityState(field)),
            hiddenOptions: get(FieldHiddenOptionsState(field)),
            warning: get(FieldWarningState(field)),
            disabled: get(FieldDisabledState(field)),
            minMax: get(FieldMinMaxState(field)),
            loading: get(FieldLoadingState(field))
        }
    }
})

export const FieldStateProvider = React.memo(function FieldStateProvider({children}: { children: React.ReactNode }) {
    return (
        <RecoilRoot>
            {children}
        </RecoilRoot>
    )
})
