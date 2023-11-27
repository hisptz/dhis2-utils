import {FieldState,} from '../state';
import type {OptionSet} from '@hisptz/dhis2-utils';
import React, {useMemo} from "react"
import {useRecoilValue} from "recoil";

export interface FieldProgramRuleChildrenProps {
		hidden: boolean;
		warning?: string;
		min?: number | string;
		max?: number | string;
		optionSet?: OptionSet;
		loading?: boolean;
		validations?: Record<string, any>
}

export const FieldProgramRule = React.memo(function FieldProgramRule({
																																				 name,
																																				 children,
																																				 optionSet,
																																				 validations
																																		 }: {
		name: string;
		children: any;
		optionSet?: OptionSet;
		validations?: Record<string, any>;
}) {
		const {loading, minMax, warning, disabled, hiddenOptions, hidden, error} = useRecoilValue(FieldState(name)) ?? {};
		const filteredOptions =
				optionSet?.options?.filter((option: { code: string; }) => !hiddenOptions?.includes(option.code)) ?? [];

//Inject an error of a program rule as a validation error. This will ensure it will persist as log as the error value is not null
		const filteredValidations = useMemo(() => {
				//If no error just pass the validations as they were
				if (!error) {
						if (!validations) {
								return {
										validate: {
												programRule: () => true
										}
								}
						}
						if (!validations.validate) {
								return {
										...validations,
										validate: {
												programRule: () => true
										}
								}
						}
						if (typeof validations.validate === "object") {
								return {
										...validations,
										validate: {
												...validations.validate,
												programRule: () => true
										}
								}
						}

						return {
								...validations,
								validate: {
										default: validations.validate,
										programRule: () => true
								}
						}
				}

				//If there were no validations passed down pass the error as the only validation
				if (!validations) {
						return {
								validate: {
										programRule: () => error
								}
						}
				} else {
						//If the validate key from validations is passed as an object, spread it adding the new error validation
						if (typeof validations.validate === "object") {
								return {
										...validations,
										validate: {
												...validations.validate,
												programRule: () => error
										}
								}
						} else {
								//If the validate variable was passed as a function call it within the validate function and OR it with the error
								return {
										...validations,
										validate: {
												default: validations.validate,
												programRule: () => error
										}
								}
						}
				}
		}, [validations, error, name]);

		return children({
				optionSet: optionSet ? {...optionSet, options: filteredOptions} : undefined,
				hidden,
				warning,
				loading,
				disabled,
				min: minMax?.min,
				max: minMax?.max,
				validations: filteredValidations
		} as FieldProgramRuleChildrenProps);
})
