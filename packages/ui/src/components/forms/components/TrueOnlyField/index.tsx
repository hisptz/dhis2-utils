import {FieldProps} from "../../interfaces";
import React from "react";
import {CustomCheckboxField} from "../CustomCheckboxField";


export interface TrueOnlyFieldProps extends FieldProps {

}


export const TrueOnlyField = React.forwardRef((props: TrueOnlyFieldProps, ref) => {
    return (<CustomCheckboxField ref={ref} {...props} trueOnly/>)
})
