import {atomFamily} from 'recoil';
import React, {Dispatch, Reducer, useCallback, useMemo, useReducer} from "react";
import {get} from "lodash";
import {createContext, useContextSelector, useContextUpdate} from "use-context-selector";

export interface FieldStateInterface {
    hidden: boolean;
    disabled: boolean;
    hiddenOptions?: string[];
    minMax: {
        min?: number | string;
        max?: number | string;
    }
    warning?: string;
    loading?: boolean;

}

export interface FieldsStateContextInterface {
    [key: string]: FieldStateInterface
}

export type FieldControl = keyof FieldStateInterface

export type FieldControlValue = boolean | string | string [] | {
    min?: number | string;
    max?: number | string;
}

export interface FieldStateDispatchInterface {
    field: string,
    property?: FieldControl;
    value: FieldControlValue | FieldStateInterface
}

export const FieldsStateContext = createContext<FieldsStateContextInterface | undefined>(undefined)
export const FieldStateDispatchContext = createContext<Dispatch<FieldStateDispatchInterface> | undefined>(undefined)

function fieldStateReducer(state: FieldsStateContextInterface | undefined, action: FieldStateDispatchInterface): FieldsStateContextInterface {

    if (action.property) {
        return {
            ...(state ?? {}),
            [action.field]: {
                ...get(state ?? {}, action.field),
                [action.property]: action.value
            }
        }
    } else {
        return {
            ...(state ?? {}),
            [action.field]: action.value as FieldStateInterface
        }
    }
}

export function FieldStateProvider({children}: { children: React.ReactNode }) {
    const [reducerState, dispatch] = useReducer<Reducer<FieldsStateContextInterface | undefined, FieldStateDispatchInterface>>(fieldStateReducer, undefined);
    const state = useMemo(() => reducerState, [reducerState]);
    const setter = useCallback(
        dispatch,
        [],
    );
    return (
        <FieldsStateContext.Provider value={state}>
            <FieldStateDispatchContext.Provider value={setter}>
                {children}
            </FieldStateDispatchContext.Provider>
        </FieldsStateContext.Provider>
    )
}

export function useFieldState(id: string): [FieldStateInterface, (value: FieldStateInterface) => void] {
    const contextState = useContextSelector(FieldsStateContext, (state) => get(state, id));
    const dispatch = useContextUpdate(FieldsStateContext);
    const setState = useCallback((value: FieldStateInterface) => {
        if (dispatch) {
            dispatch({field: id, value})
        }
    }, [dispatch, id]);

    const state = useMemo(() => {
        return get(contextState, [id]) as FieldStateInterface
    }, [contextState, id]);

    return [
        state,
        setState
    ]
}

export function useFieldCallback<T>(callback: (callback: { set: (field: string, property: FieldControl, value: (FieldControlValue | ((prevState: FieldControlValue) => FieldControlValue))) => void }) => (props: T) => void, dependencies?: Array<any>) {
    const dispatch = useContext(FieldStateDispatchContext);
    const state = useContext(FieldsStateContext);

    if (!dispatch) {
        throw Error("useFieldCallback state must be in FieldStateProvider")
    }
    const set = useCallback(
        (field: string, property: FieldControl, value: FieldControlValue | ((prevState: FieldControlValue) => FieldControlValue)) => {
            dispatch({
                field,
                property,
                value: typeof value === 'function' ? value(get(state, field) as FieldControlValue) : value
            })
        },
        [state, dispatch],
    );

    return useCallback(
        callback({set}),
        [callback, set],
    );

}

export function useFieldStateValue(id: string): FieldStateInterface {
    const [state] = useFieldState(id);
    return state;
}

export function useSetFieldState(id: string) {
    const [, setState] = useFieldState(id);
    return setState;
}

export const FieldVisibilityState = atomFamily({
    key: 'field-visibility-state',
    default: true,
});

