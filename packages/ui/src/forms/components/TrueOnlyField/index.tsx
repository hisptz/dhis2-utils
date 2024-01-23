import { FieldProps } from "../../interfaces/index.js";
import React from "react";
import { CustomCheckboxField } from "../CustomCheckboxField/index.js";

export interface TrueOnlyFieldProps extends FieldProps {}

export const TrueOnlyField = React.forwardRef(
	(props: TrueOnlyFieldProps, ref) => {
		return <CustomCheckboxField ref={ref} {...props} trueOnly />;
	},
);
