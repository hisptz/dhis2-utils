import i18n from "@dhis2/d2-i18n";
import { Button, Field, IconAdd24, IconDelete24 } from "@dhis2/ui";
import React from "react";
import { useFieldArray } from "react-hook-form";
import { RHFFieldProps } from "../../../interfaces/index.js";

export interface MultipleFieldsFieldProps extends RHFFieldProps {
	multipleField?: RHFFieldProps;
	initialFieldCount?: number;
	defaultValue?: any;
	multipleFields?: Array<RHFFieldProps>;
	deletable?: boolean;
	addable?: boolean;
	component: React.JSXElementConstructor<RHFFieldProps>;
}

export function RHFMultipleFieldsField(
	{
		name,
		multipleField,
		component,
		initialFieldCount,
		multipleFields,
		deletable,
		addable,
		defaultValue,
		validations,
		...props
	}: MultipleFieldsFieldProps,
	ref: React.Ref<any>,
) {
	const { fields, append, remove } = useFieldArray({
		name,
		rules: validations,
	});
	const onAddField = () => {
		append(defaultValue);
	};

	const onDeleteField = (index: number) => {
		remove(index);
	};
	return (
		<Field {...props} warning={!!props.warning}>
			<div ref={ref} className="column">
				{multipleField
					? fields?.map(({ id: fieldId }, index) => {
							const fieldName = `${name}.${fieldId}`;
							const Input = component;

							return (
								<div
									key={`${fieldId}-${index}`}
									className="row align-items-center w-100 gap-8"
								>
									<div
										className={`column ${
											deletable ? "w-75" : "w-100"
										}`}
									>
										<Input
											name={fieldName}
											validations={validations}
										/>
									</div>
									<div
										className={`column ${
											deletable ? "w-25" : ""
										}`}
									>
										{deletable ? (
											<Button
												disabled={
													index === 0 &&
													fields.length === 1
												}
												icon={<IconDelete24 />}
												onClick={() =>
													onDeleteField(index)
												}
											>
												{i18n.t("Delete")}
											</Button>
										) : null}
									</div>
								</div>
							);
						})
					: multipleFields?.map((field, index) => {
							const Input = component;
							return (
								<div
									key={`${field.name}-${index}`}
									className="row align-items-center w-100"
								>
									<div className="column w-100">
										<Input {...field} />
									</div>
									{multipleField && deletable ? (
										<div className="column">
											<Button
												disabled={
													index === 0 &&
													fields.length === 1
												}
												icon={<IconDelete24 />}
												onClick={() =>
													onDeleteField(index)
												}
											>
												{i18n.t("Delete")}
											</Button>
										</div>
									) : null}
								</div>
							);
						})}
				{multipleField && addable ? (
					<div className="w-50">
						<Button icon={<IconAdd24 />} onClick={onAddField}>
							{i18n.t("Add Item")}
						</Button>
					</div>
				) : null}
			</div>
		</Field>
	);
}
