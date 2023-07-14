import React, {ReactNode, useCallback, useState} from "react";
import {ConfirmDialogContext} from "../states/dialog";
import {ConfirmDialog, CustomAction} from "./ConfirmDialog";
import {useBoolean} from "usehooks-ts";

export interface ConfirmDialogConfig {
    title: string;
    message: string | ReactNode;
    onConfirm: () => Promise<void> | void;
    onCancel?: () => void;
    size?: "small" | "large";
    position?: "top" | "bottom" | "middle";
    cancelButtonText?: string;
    confirmButtonText?: string;
    loadingText?: string;
    confirmButtonColor?: "primary" | "secondary" | "destructive";
    customActions?: CustomAction[];
}



export function ConfirmDialogProvider({children}: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const {value: confirming, setTrue, setFalse} = useBoolean(false)
    const [config, setConfig] = useState<ConfirmDialogConfig | null>();

    const confirm = useCallback( (config: ConfirmDialogConfig) => {
        setConfig(config);
        setOpen(true);
    }, []);

    const onCancel = useCallback(() => {
        setOpen(false);
        setConfig(null);
        if (config?.onCancel) {
            config.onCancel();
        }
    }, [config]);

    const onConfirm = useCallback(async () => {
        if (config) {
            setTrue();
            await config.onConfirm();
            setFalse();
        }
        setOpen(false);
        setConfig(null);
    }, [config, setFalse, setTrue]);

    const customActions = config?.customActions?.map((actions) => ({
        ...actions,
        onClick: () => {
            setOpen(false);
            setConfig(null);
            actions.onClick();
        },
    }));

    return (
        <ConfirmDialogContext.Provider value={{confirm}}>
            {children}
            {config && <ConfirmDialog loading={confirming} hide={!open} {...config} customActions={customActions}
                                      onConfirm={onConfirm}
                                      onCancel={onCancel}/>}
        </ConfirmDialogContext.Provider>
    );
}
