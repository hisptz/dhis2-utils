import React, { useMemo } from "react";
import Collapsible from "react-collapsible";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { FormSectionInterface } from "../../interfaces/index.js";
import {
	colors,
	IconChevronDown24,
	IconChevronUp24,
	IconErrorFilled24,
} from "@dhis2/ui";
import { useFormState, useWatch } from "react-hook-form";
import {
	FieldProgramRule,
	type FieldProgramRuleChildrenProps,
	useHiddenFields,
} from "../../../ProramRules/index.js";
import { difference, isEmpty } from "lodash";
import { RHFDHIS2FormField } from "../../../react-hook-form-fields/index.js";

export interface FormSectionProps {
	showProgress?: boolean;
	section: FormSectionInterface;
	collapsible?: boolean;
}

export interface FormSectionHeaderProps {
	section: FormSectionInterface;
	showProgress?: boolean;
}

export function FormSectionHeader({
	showProgress,
	section,
}: FormSectionHeaderProps) {
	const dataItems = useMemo(() => section.dataItems, [section.dataItems]);
	const mandatoryFields = useMemo(
		() =>
			dataItems?.filter(
				(dataItem) =>
					(dataItem.type === "dataElement" && dataItem.compulsory) ||
					dataItem.mandatory,
			) ?? [],
		[dataItems],
	);
	const mandatoryFieldIds = useMemo(
		() => mandatoryFields.map(({ id }) => id),
		[mandatoryFields],
	);
	const hiddenFields = useHiddenFields(mandatoryFieldIds);

	const fieldsToWatch = useMemo(
		() => difference(mandatoryFieldIds, hiddenFields),
		[mandatoryFieldIds, hiddenFields],
	);

	const fieldValues = useWatch({
		name: fieldsToWatch,
	});

	const progress = useMemo(() => {
		const filledFields = fieldValues.filter((value) => value !== undefined);
		return Math.floor(filledFields.length / fieldsToWatch.length) * 100;
	}, [fieldsToWatch.length, fieldValues]);

	const fieldsState = useFormState({
		name: fieldsToWatch,
	});

	const sectionHasErrors = useMemo(() => {
		return !isEmpty(fieldsState.errors);
	}, [fieldsState.errors]);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				width: "100%",
			}}
		>
			<h3 style={{ margin: 0 }}>{section.displayFormName}</h3>
			<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
				{sectionHasErrors && (
					<IconErrorFilled24 color={colors.red500} />
				)}
				{showProgress && (
					<CircularProgressbarWithChildren
						styles={{
							path: {
								stroke: `var(--primary)`,
							},
							text: {
								fill: `var(--primary)`,
								fontSize: 32,
								fontWeight: "bold",
							},
						}}
						strokeWidth={7}
						value={progress}
					>
						<div style={{ fontSize: 12, marginTop: -11 }}>
							<strong>{progress}%</strong>
						</div>
					</CircularProgressbarWithChildren>
				)}
				<div></div>
			</div>
		</div>
	);
}

export function FormSection({
	showProgress,
	section,
	collapsible,
}: FormSectionProps) {
	if (!collapsible) {
		return (
			<div
				style={{
					display: "flex",
					gap: 16,
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<FormSectionHeader
					section={section}
					showProgress={showProgress}
				/>
				<div style={{ display: "flex", flexDirection: "column" }}>
					{section.dataItems?.map((dataItem) => {
						const required =
							dataItem.mandatory ?? dataItem.compulsory;
						return (
							<FieldProgramRule
								key={`${dataItem.id}-key-field`}
								name={dataItem.id}
								optionSet={dataItem.optionSet}
								mandatory={required}
								validations={dataItem.validations}
							>
								{({
									disabled,
									optionSet,
									mandatory,
									max,
									min,
									validations,
									warning,
									loading,
									hidden,
								}: FieldProgramRuleChildrenProps) => {
									if (hidden) {
										return null;
									}

									return (
										<RHFDHIS2FormField
											loading={loading}
											key={`${dataItem.id}-field`}
											disabled={disabled}
											min={min}
											max={max}
											warning={warning}
											valueType={dataItem.valueType}
											label={
												dataItem.displayFormName ??
												dataItem?.formName
											}
											name={dataItem.id}
											optionSet={optionSet}
											required={mandatory}
											validations={{
												required: required
													? `${dataItem.formName} is required`
													: undefined,
												...(validations ?? {}),
											}}
										/>
									);
								}}
							</FieldProgramRule>
						);
					})}
				</div>
			</div>
		);
	}

	return (
		<Collapsible
			triggerWhenOpen={
				<div
					style={{
						width: "100%",
						border: `1px solid ${colors.grey400}`,
						padding: 8,
						display: "flex",
						gap: 8,
					}}
				>
					<FormSectionHeader
						section={section}
						showProgress={showProgress}
					/>
					<IconChevronUp24 />
				</div>
			}
			trigger={
				<div
					style={{
						width: "100%",
						border: `1px solid ${colors.grey400}`,
						padding: 8,
						display: "flex",
						gap: 8,
					}}
				>
					<FormSectionHeader
						section={section}
						showProgress={showProgress}
					/>
					<IconChevronDown24 />
				</div>
			}
		>
			{section.dataItems?.map((dataItem) => {
				const required = dataItem.mandatory ?? dataItem.compulsory;
				return (
					<RHFDHIS2FormField
						key={`${dataItem.id}-field`}
						valueType={dataItem.valueType}
						label={dataItem.displayFormName ?? dataItem?.formName}
						name={dataItem.id}
						optionSet={dataItem.optionSet}
						required={required}
						validations={{
							required: required
								? `${dataItem.formName} is required`
								: undefined,
							...(dataItem?.validations ?? {}),
						}}
					/>
				);
			})}
		</Collapsible>
	);
}
