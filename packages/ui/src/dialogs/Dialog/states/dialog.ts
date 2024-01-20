import { createContext } from "react";
import { ConfirmDialogConfig, ContentDialogConfig } from "../types";

export const DialogContext = createContext<{
	confirm: (config: Omit<ConfirmDialogConfig, "type">) => void;
	show: (config: Omit<ContentDialogConfig, "type">) => void;
}>({
	confirm: () => {
		return;
	},
	show: () => {
		return;
	},
});
