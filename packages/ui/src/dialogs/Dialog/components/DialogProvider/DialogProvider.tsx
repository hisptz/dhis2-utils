import React, { ReactNode, useCallback, useState } from "react";
import { DialogContext } from "../../states/dialog";
import { ContentDialog } from "../ContentDialog";
import { useBoolean } from "usehooks-ts";
import {
	ConfirmDialogConfig,
	ContentDialogConfig,
	DialogConfig,
} from "../../types";
import { ConfirmDialog } from "../ConfirmDialog";

/**
 * Provides a dialog context and methods to show different types of dialogs.
 *
 * @param {ReactNode} children - The content of the dialog provider.
 * @returns {ReactNode} - The result of rendering the dialog provider.
 *
 * @example
 * <DialogProvider>
 *   <App />
 * </DialogProvider>
 */
export function DialogProvider({ children }: { children: ReactNode }) {
	const [open, setOpen] = useState(false);
	const { value: confirming, setTrue, setFalse } = useBoolean(false);
	const [config, setConfig] = useState<DialogConfig | null>();

	const confirm = useCallback((config: Omit<ConfirmDialogConfig, "type">) => {
		setConfig({ ...config, type: "confirm" });
		setOpen(true);
	}, []);

	const onCancel = useCallback(() => {
		setOpen(false);
		setConfig(null);
		if (config && "onCancel" in config && config?.onCancel) {
			config.onCancel();
		}
	}, [config]);

	const onConfirm = useCallback(async () => {
		if (config && config.type === "confirm") {
			setTrue();
			await config.onConfirm();
			setFalse();
		}
		setOpen(false);
		setConfig(null);
	}, [config, setFalse, setTrue]);

	const show = useCallback((config: Omit<ContentDialogConfig, "type">) => {
		setConfig({ ...config, type: "content" });
		setOpen(true);
	}, []);

	return (
		<DialogContext.Provider value={{ confirm, show }}>
			{children}
			<>
				{config?.type === "confirm" && (
					<ConfirmDialog
						loading={confirming}
						hide={!open}
						{...config}
						customActions={config?.customActions?.map(
							(actions) => ({
								...actions,
								onClick: () => {
									setOpen(false);
									setConfig(null);
									actions.onClick();
								},
							}),
						)}
						onConfirm={onConfirm}
						onCancel={onCancel}
					/>
				)}
				{config?.type === "content" && (
					<ContentDialog
						onClose={onCancel}
						hide={!open}
						{...config}
					/>
				)}
			</>
		</DialogContext.Provider>
	);
}

/**
 * @deprecated since v2.
 * Use `DialogProvider` instead
 *
 * A wrapper for `DialogProvider` for v1 compatibility.
 *
 * */
export function ConfirmDialogProvider({ children }: { children: ReactNode }) {
	return <DialogProvider>{children}</DialogProvider>;
}
