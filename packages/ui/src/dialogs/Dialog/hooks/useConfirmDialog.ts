import { useContext } from "react";
import { DialogContext } from "../states/dialog";

/**
 * @deprecated Use `useDialog` instead
 * Exposes `confirm` function that displays a confirmation dialog when called.
 *
 *
 *
 *
 * @returns {
 *     confirm: DialogContext.confirm
 * }
 * */
export function useConfirmDialog() {
	return useContext(DialogContext);
}
