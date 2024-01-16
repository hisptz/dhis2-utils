import { useContext } from "react";
import { DialogContext } from "../states/dialog";

/**
 * Returns the dialog context.
 *
 * @returns {DialogContext} The dialog context.
 */
export function useDialog() {
	return useContext(DialogContext);
}
