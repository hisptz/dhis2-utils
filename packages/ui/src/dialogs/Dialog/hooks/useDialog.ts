import { useContext } from "react";
import { DialogContext } from "../states/dialog.js";

/**
 * Returns the dialog context.
 *
 * @returns {DialogContext} The dialog context.
 */
export function useDialog() {
	return useContext(DialogContext);
}
