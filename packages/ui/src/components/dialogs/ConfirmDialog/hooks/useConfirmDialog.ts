import {useContext} from "react";
import {ConfirmDialogContext} from "../states/dialog";

export function useConfirmDialog() {
  return useContext(ConfirmDialogContext);
}
