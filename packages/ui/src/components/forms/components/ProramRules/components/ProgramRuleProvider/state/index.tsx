import React, {Dispatch, useCallback, useMemo} from "react";
import {isEqual, set} from "lodash";
import {useMap} from "usehooks-ts";
import {createContext, useContext, useContextSelector} from "use-context-selector";

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

export type FieldStateContextInterface = Omit<Map<string, FieldStateInterface>, 'set' | 'clear' | 'delete'>

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

export const FieldsStateContext = createContext<FieldStateContextInterface | undefined>(undefined)
export const FieldStateDispatchContext = createContext<Dispatch<FieldStateDispatchInterface> | undefined>(undefined)

export const FieldStateProvider = React.memo(function FieldStateProvider({children}: { children: React.ReactNode }) {
    const [map, actions] = useMap<string, FieldStateInterface>();
    const state = useMemo(() => map, [map]);
    const setter = useCallback(
        ({field, value, property}: FieldStateDispatchInterface) => {
            if (property) {
                const updatedValue = {...(map.get(field) ?? {})} as FieldStateInterface;
                if (updatedValue[property] === value) {
                    return;
                }
                set(updatedValue, property, value);
                actions.set(field, updatedValue);
            } else {
                if (isEqual(state.get(field), value)) {
                    return;
                }
                actions.set(field, value as FieldStateInterface)
            }
        },
        [actions.set],
    );

    return (
        <FieldsStateContext.Provider value={state}>
            <FieldStateDispatchContext.Provider value={setter}>
                {children}
            </FieldStateDispatchContext.Provider>
        </FieldsStateContext.Provider>
    )
})

export function useFieldState(id: string): [FieldStateInterface, (value: FieldStateInterface) => void] {
    const state = useContextSelector(FieldsStateContext, (context) => context?.get(id) as FieldStateInterface);
    const setter = useContextSelector(FieldStateDispatchContext, (context) => context);

    const setState = useCallback((value: FieldStateInterface) => {
        if (setter) {
            setter({field: id, value})
        }
    }, [setter, id]);


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
                value: typeof value === 'function' ? value(state?.get(field) as FieldControlValue) : value
            })
        },
        [dispatch, state],
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

