import {compact, flatten, forEach, groupBy, head, isEmpty, last, mapValues, reduce, uniq,} from 'lodash';
import {ActionCallbacks, ActionData, RuleAction, RuleExecutionOptions, RunnableAction} from '../interfaces';
import {evaluateFromDataExpression} from './evaluator';
import type {OptionGroup} from '../../../interfaces';

function joinHideFieldActions(actions: RunnableAction[]): RunnableAction | undefined {
    const hideFieldActions = actions.filter((action) => action.type === 'HIDEFIELD');
    if (!isEmpty(hideFieldActions)) {
        const fieldHidden = reduce(
            hideFieldActions,
            (acc, {hide}) => acc || Boolean(hide),
            false
        );

        return {
            ...(head(hideFieldActions) as RunnableAction),
            hide: fieldHidden,
        };
    }
}

function joinHideOptionGroupActions(actions: RunnableAction[]): RunnableAction | undefined {
    const hideOptionGroupActions = actions.filter((action) =>
        ['HIDEOPTIONGROUP'].includes(action.type)
    );
    if (!isEmpty(hideOptionGroupActions)) {
        return {
            ...(head(hideOptionGroupActions) as RunnableAction),
            hide: true,
            optionGroups: reduce(
                hideOptionGroupActions,
                (acc: any, action: RunnableAction) => {
                    const {optionGroups, hide} = action;
                    if (hide) {
                        return uniq([...acc, head(optionGroups)]);
                    } else {
                        return uniq([...acc, head(optionGroups)]);
                    }
                },
                []
            ),
        };
    }
}

function joinShowOptionGroupActions(actions: RunnableAction[]): RunnableAction | undefined {
    const hideOptionGroupActions = actions.filter((action) =>
        ['SHOWOPTIONGROUP'].includes(action.type)
    );
    if (!isEmpty(hideOptionGroupActions)) {
        return {
            ...(head(hideOptionGroupActions) as RunnableAction),
            hide: false,
            optionGroups: reduce(
                hideOptionGroupActions,
                (acc: any, action: RunnableAction) => {
                    return uniq([...acc, head(action.optionGroups)]);
                },
                []
            ),
        };
    }
}

function joinHideOptionActions(actions: RunnableAction[]): RunnableAction | undefined {
    const hideOptionsActions = actions.filter((action) =>
        ['HIDEOPTION'].includes(action.type)
    );

    if (!isEmpty(hideOptionsActions)) {
        return hideOptionsActions.reduce(
            (acc, action) => {
                return {
                    ...acc,
                    options: uniq([...acc?.options, ...(action.options ?? [])]),
                };
            },
            {...(head(hideOptionsActions) as RunnableAction)}
        );
    }
}

function joinShowOptionActions(actions: RunnableAction[]): RunnableAction | undefined {
    const hideOptionsActions = actions.filter((action) =>
        ['SHOWOPTION'].includes(action.type)
    );
    if (!isEmpty(hideOptionsActions)) {
        return hideOptionsActions.reduce(
            (acc, action) => {
                return {
                    ...(acc as RunnableAction),
                    options: acc?.options?.filter(
                        (option: string) => !action.option?.includes(option)
                    ),
                };
            },
            {...(head(hideOptionsActions) as RunnableAction)}
        );
    }
}

function joinAssignActions(actions: RunnableAction[]): RunnableAction | undefined {
    const assignActions = actions.filter((action) => action.type === 'ASSIGN');
    if (!isEmpty(assignActions)) {
        return {
            ...(head(assignActions) as RunnableAction),
            value: last(assignActions)?.value,
        };
    }
}

function joinShowWarningActions(actions: RunnableAction[]): RunnableAction | undefined {
    const showWarningActions = actions.filter((action) => action.type === 'SHOWWARNING');
    if (!isEmpty(showWarningActions)) {
        return {
            ...(head(showWarningActions) as RunnableAction),
            warning: last(showWarningActions)?.warning,
        };
    }
}

function joinShowErrorActions(actions: RunnableAction[]): RunnableAction | undefined {
    const showErrorActions = actions.filter((action) => action.type === 'SHOWERROR');
    if (!isEmpty(showErrorActions)) {
        return {
            ...(head(showErrorActions) as RunnableAction),
            error: last(showErrorActions)?.error,
        };
    }
}

function joinDisableFieldActions(actions: RunnableAction[]): RunnableAction | undefined {
    const disableFieldActions = actions.filter((action) => action.type === 'DISABLEFIELD');
    if (!isEmpty(disableFieldActions)) {
        return {
            ...(head(disableFieldActions) as RunnableAction),
            disabled: last(disableFieldActions)?.disabled,
        };
    }
}

function joinMinMaxActions(actions: RunnableAction[]): RunnableAction | undefined {
    const minMaxActions = actions.filter((action) => action.type === 'SETMINMAXVALUE');
    if (!isEmpty(minMaxActions)) {
        return {
            ...(head(minMaxActions) as RunnableAction),
            min: last(minMaxActions)?.min,
            max: last(minMaxActions)?.max,
        };
    }
}

export function sanitizeActions(actions: RunnableAction[]): RunnableAction[] {
    const groupedByField = groupBy(actions, 'field');
    const groupedActions = mapValues(groupedByField, (actions) => {
        return compact([
            joinHideOptionActions(actions),
            joinShowOptionActions(actions),
            joinHideFieldActions(actions),
            joinAssignActions(actions),
            joinShowWarningActions(actions),
            joinShowErrorActions(actions),
            joinHideOptionGroupActions(actions),
            joinShowOptionGroupActions(actions),
            joinDisableFieldActions(actions),
            joinMinMaxActions(actions),
        ]);
    });

    return flatten(Object.values(groupedActions));
}

export function getAction(
    shouldRunActions: boolean,
    action: RuleAction,
    options: RuleExecutionOptions
): RunnableAction | undefined {
    switch (action.type) {
        case 'HIDEFIELD':
            return getHideFieldAction(action, shouldRunActions);
        case 'ASSIGN':
            return getAssignAction(action, shouldRunActions, options);
        case 'HIDEOPTION':
            return getHideOptionAction(action, shouldRunActions);
        case 'SHOWOPTION':
            return getShowOptionAction(action, shouldRunActions);
        case 'HIDEOPTIONGROUP':
            return getHideOptionGroupAction(action, shouldRunActions);
        case 'SHOWOPTIONGROUP':
            return getShowOptionGroupAction(action, shouldRunActions);
        case 'SHOWWARNING':
            return getShowWarningAction(action, shouldRunActions);
        case 'SHOWERROR':
            return getShowErrorAction(action, shouldRunActions);
        case 'DISABLEFIELD':
            return getDisableFieldAction(action, shouldRunActions);
        case 'SETMINMAXVALUE':
            return getSetMinMaxValueAction(action, shouldRunActions, options);
        default:
            console.warn(`Action ${action.type} is not yet supported`);
            return;
    }
}

function getDisableFieldAction(action: RuleAction, shouldRunAction: boolean) {
    return {
        field: action.target.id,
        type: action.type,
        disabled: shouldRunAction,
    };
}

function getSetMinMaxValueAction(
    action: RuleAction,
    shouldRunActions: boolean,
    options: RuleExecutionOptions
) {
    if (shouldRunActions && action.data) {
        const value = getActionData(action.data, options);
        return {
            field: action.target.id,
            type: action.type,
            min: (value as Record<string, any>)?.min,
            max: (value as Record<string, any>)?.max,
        };
    }
}

function getHideFieldAction(action: RuleAction, shouldRunActions: boolean) {
    return {
        field: action.target.id,
        type: action.type,
        hide: shouldRunActions,
    };
}

function getActionData(
    data: ActionData,
    options: RuleExecutionOptions
): number | string | boolean | Record<string, any> {
    let value: number | boolean | string;
    if (typeof data === 'string') {
        value = evaluateFromDataExpression(data, options);
    } else if (typeof data === 'number' || typeof data === 'boolean') {
        value = data;
    } else if (typeof data === 'function') {
        value = data(options);
    } else {
        value = '';
    }
    return value;
}

function getAssignAction(
    action: RuleAction,
    shouldRunActions: boolean,
    options: RuleExecutionOptions
): RunnableAction | undefined {
    if (shouldRunActions) {
        if (action.data) {
            const value = getActionData(action.data, options);
            return {
                field: action.target.id,
                type: action.type,
                value,
            };
        }
    }
}

function getHideOptionAction(
    action: RuleAction,
    shouldRunActions: boolean
): RunnableAction | undefined {
    if (action.option) {
        if (shouldRunActions) {
            return {
                field: action.target.id,
                type: action.type,
                options: [action.option.code],
                hide: true,
            };
        }
    }
}

function getShowOptionAction(
    action: RuleAction,
    shouldRunActions: boolean
): RunnableAction | undefined {
    if (action.option) {
        if (shouldRunActions) {
            return {
                field: action.target.id,
                type: action.type,
                options: [action.option.code],
                hide: !shouldRunActions,
            };
        }
    }
}

function getHideOptionGroupAction(
    action: RuleAction,
    shouldRunActions: boolean
): RunnableAction | undefined {
    if (action.optionGroup) {
        if (shouldRunActions) {
            return {
                field: action.target.id,
                type: action.type,
                optionGroups: [action.optionGroup.id],
                hide: true,
            };
        }
    }
}

function getShowOptionGroupAction(
    action: RuleAction,
    shouldRunActions: boolean
): RunnableAction | undefined {
    if (action.optionGroup) {
        if (shouldRunActions) {
            return {
                field: action.target.id,
                type: action.type,
                optionGroups: [action.optionGroup.id],
                hide: false,
            };
        }
    }
}

function getShowWarningAction(action: RuleAction, shouldRunActions: boolean) {
    return {
        field: action.target.id,
        type: action.type,
        warning: shouldRunActions ? action.content ?? '' : '',
    };
}

function getShowErrorAction(
    action: RuleAction,
    shouldRunActions: boolean
): RunnableAction | undefined {
    return {
        field: action.target.id,
        type: action.type,
        error: shouldRunActions ? action.content ?? '' : '',
    };
}

export function runActions(actions: RunnableAction[], callbacks: ActionCallbacks): void {
    const groupedActions = groupBy(actions, 'type');
    forEach(groupedActions, (actions, type) => {
        switch (type) {
            case 'HIDEFIELD':
                hideFields(actions, callbacks);
                break;
            case 'ASSIGN':
                assignValues(actions, callbacks);
                break;
            case 'HIDEOPTION':
            case 'SHOWOPTION':
                runOptionsAction(actions, callbacks);
                break;
            case 'HIDEOPTIONGROUP':
            case 'SHOWOPTIONGROUP':
                runOptionGroupActions(actions, callbacks);
                break;
            case 'SHOWWARNING':
                showWarning(actions, callbacks);
                break;
            case 'SHOWERROR':
                showError(actions, callbacks);
                break;
            case 'DISABLEFIELD':
                disableFields(actions, callbacks);
                break;
            case 'SETMINMAXVALUE':
                setMinMax(actions, callbacks);
                break;
        }
    });
}

function disableFields(actions: RunnableAction[], {toggleFieldDisabled}: ActionCallbacks) {
    toggleFieldDisabled(actions);
}

function setMinMax(actions: RunnableAction[], {setMinMax}: ActionCallbacks) {
    setMinMax(actions);
}

export function hideFields(
    fields: RunnableAction[],
    {toggleFieldVisibility, setValue}: ActionCallbacks
): void {
    toggleFieldVisibility(fields as any);
    const fieldsToHide = compact(
        fields.map((field) => (field.hide ? field.field : undefined))
    );
    if (!isEmpty(fieldsToHide)) {
        setValue(fieldsToHide.map((field) => ({field, value: undefined})));
    }
}

export function assignValues(fields: RunnableAction[], {setValue}: ActionCallbacks): void {
    setValue(fields as any);
}

export function hideOptions(fields: RunnableAction[], callbacks: ActionCallbacks): void {
    manageOptions(fields, true, callbacks);
}

export function runOptionsAction(fields: RunnableAction[], callbacks: ActionCallbacks) {
    const optionsToShow = fields.filter((field) => !field.hide);
    const optionsToHide = fields.filter((field) => field.hide);

    if (!isEmpty(optionsToShow)) {
        showOptions(optionsToShow, callbacks);
    }
    if (!isEmpty(optionsToHide)) {
        hideOptions(optionsToHide, callbacks);
    }
}

export function manageOptions(
    fields: RunnableAction[],
    hide: boolean,
    {toggleOptionViews}: ActionCallbacks
) {
    const groupedFields = groupBy(fields, 'field');
    const sanitizedFields = mapValues(groupedFields, (actions, fieldId) => {
        return {
            field: fieldId,
            options: compact(flatten(actions.map((action) => action.options))),
            hide: hide,
        };
    });
    toggleOptionViews(Object.values(sanitizedFields) as any);
}

export function showOptions(fields: RunnableAction[], callbacks: ActionCallbacks): void {
    manageOptions(fields, false, callbacks);
}

async function getOptionsToHide(
    field: { optionGroups: string[]; field: any },
    {getOptionGroups}: any,
    hide: boolean
) {
    if (!isEmpty(compact(field.optionGroups))) {
        const optionGroups = await getOptionGroups(field.optionGroups);
        if (!isEmpty(optionGroups)) {
            const options = flatten(
                optionGroups.map((optionGroup: OptionGroup) => optionGroup.options)
            )?.map((option: any) => option.code);
            if (!isEmpty(options)) {
                return {
                    field: field.field,
                    options,
                    hide,
                };
            }
        }
    }
}

export async function runOptionGroupActions(
    fields: RunnableAction[],
    callbacks: ActionCallbacks
) {
    const optionGroupsToHide = fields.filter((field) => field.hide);
    const optionGroupsToShow = fields.filter((field) => !field.hide);

    if (!isEmpty(optionGroupsToHide)) {
        await hideOptionGroups(optionGroupsToHide, callbacks);
    }
    if (!isEmpty(optionGroupsToShow)) {
        await showOptionGroups(optionGroupsToShow, callbacks);
    }
}

export async function manageOptionGroups(
    fields: RunnableAction[],
    hide: boolean,
    {toggleOptionViews, getOptionGroups, toggleLoading}: ActionCallbacks
) {
    const groupedFields = groupBy(fields, 'field');
    const sanitizeFields = Object.values(
        mapValues(groupedFields, (field, fieldId) => {
            return {
                field: fieldId,
                optionGroups: flatten(field.map(({optionGroups}) => optionGroups)),
            };
        }) as any
    );
    toggleLoading(
        Object.keys(groupedFields).map((fieldId) => ({field: fieldId, loading: true}))
    );
    const promises = sanitizeFields.map(
        async (field: any) => await getOptionsToHide(field, {getOptionGroups}, hide)
    );
    const allOptionsToHide = await Promise.all(promises);
    toggleOptionViews(compact(allOptionsToHide));
    toggleLoading(
        Object.keys(groupedFields).map((fieldId) => ({field: fieldId, loading: false}))
    );
}

export async function hideOptionGroups(
    fields: RunnableAction[],
    callbacks: ActionCallbacks
): Promise<void> {
    return manageOptionGroups(fields, true, callbacks);
}

export async function showOptionGroups(
    fields: RunnableAction[],
    callbacks: ActionCallbacks
): Promise<void> {
    return manageOptionGroups(fields, false, callbacks);
}

export function showWarning(
    fields: RunnableAction[],
    {toggleFieldWarning}: ActionCallbacks
): void {
    toggleFieldWarning(fields as any);
}

export function showError(fields: RunnableAction[], {setError}: ActionCallbacks): void {
    fields.forEach((field) => {
        setError(field.field, field.error);
    });
}
