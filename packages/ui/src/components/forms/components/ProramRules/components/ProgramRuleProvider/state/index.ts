import {atomFamily} from 'recoil';

export const FieldVisibilityState = atomFamily({
    key: 'field-visibility-state',
    default: true,
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
