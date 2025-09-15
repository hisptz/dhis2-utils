import { FieldProps } from "../../interfaces";
import { forwardRef } from "react";
import { CustomCheckboxField } from "../CustomCheckboxField";

export interface TrueOnlyFieldProps extends FieldProps {
	value?: "true";
}

export const TrueOnlyField = forwardRef<unknown, TrueOnlyFieldProps>(
	(props, ref) => {
		// @ts-ignore
		return <CustomCheckboxField {...props} trueOnly />;
	},
);
