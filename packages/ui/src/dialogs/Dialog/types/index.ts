import { ReactNode } from "react";
import { CustomAction } from "../components/ConfirmDialog";
import { ButtonProps } from "@dhis2/ui";

export interface Dialog {
	size?: "small" | "large";
	position?: "top" | "bottom" | "middle";
	title: string;
}

export interface ConfirmDialogConfig extends Dialog {
	type: "confirm";
	message: string | ReactNode;
	onConfirm: () => Promise<void> | void;
	onCancel?: () => void;
	cancelButtonText?: string;
	confirmButtonText?: string;
	loadingText?: string;
	confirmButtonColor?: "primary" | "secondary" | "destructive";
	customActions?: CustomAction[];
}

export interface ContentDialogAction {
	props?: ButtonProps;
	label?: string | ReactNode;
	component?: ReactNode;
}

export interface ContentDialogConfig extends Dialog {
	type: "content";
	content: string | ReactNode;
	cancelButtonLabel?: string;
	actions?: ContentDialogAction[];
}

export type DialogConfig = ConfirmDialogConfig | ContentDialogConfig;
