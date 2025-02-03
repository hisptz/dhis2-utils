import { FieldProps } from "../../interfaces";
import React from "react";
import { CustomCheckboxField } from "../CustomCheckboxField";

export interface TrueOnlyFieldProps extends FieldProps {
	value?: "true";
}

export const TrueOnlyField = React.forwardRef<unknown, TrueOnlyFieldProps>(
	(props, ref) => {
		// @ts-ignore
		return <CustomCheckboxField {...props} trueOnly />;
	},
);
