import { Button, colors, Field, IconDelete24 } from "@dhis2/ui";
import React from "react";
import { useManageLegendDefinitions } from "../hooks/useManageLegendDefinitions.js";
import { AddLegendDefinition } from "./AddLegendDefinition.js";
import { LegendDefinitionField } from "../../LegendDefinitionField/index.js";
import { FieldProps, LegendDefinition } from "../../../interfaces/index.js";
import i18n from "@dhis2/d2-i18n";

export interface LegendDefinitionsFormFieldProps extends FieldProps {
	value?: LegendDefinition[];
	shouldVerify?: boolean;
	onResetLegends?: (newDefinitions: LegendDefinition[]) => void;
}

export function LegendDefinitionsFormField({
	value,
	onChange,
	onResetLegends,
	shouldVerify,
	error,
	warning,
	label,
	name,
	...props
}: LegendDefinitionsFormFieldProps) {
	const {
		nonDefaultLegendDefinitions,
		defaultLegendDefinitions,
		onAdd,
		onDelete,
		onEdit,
	} = useManageLegendDefinitions(value ?? [], {
		onChange,
		onResetLegends,
		shouldVerify: shouldVerify ?? false,
	});

	return (
		<div
			className="p-8"
			style={
				error
					? {
							border: `1px solid ${colors.red600}`,
							borderRadius: 4,
							padding: 8,
						}
					: { padding: 8 }
			}
		>
			<Field
				{...props}
				error={Boolean(error)}
				warning={Boolean(warning)}
				validationText={
					typeof props.warning === "string"
						? props.warning
						: typeof error === "string"
							? error
							: undefined
				}
				label={label}
				name={name}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 32,
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: 16,
						}}
					>
						{defaultLegendDefinitions?.map((legendDefinition) => (
							<LegendDefinitionField
								dataTest={`${legendDefinition.id}-default-definition-area`}
								key={`${legendDefinition.id}`}
								value={legendDefinition}
								onChange={onEdit}
							/>
						))}
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: 16,
						}}
					>
						{nonDefaultLegendDefinitions?.map(
							(legendDefinition) => (
								<div
									style={{
										display: "flex",
										gap: 16,
										alignItems: "center",
									}}
								>
									<LegendDefinitionField
										dataTest={`${legendDefinition.id}-definition-area`}
										key={`${legendDefinition.id}`}
										value={legendDefinition}
										onChange={onEdit}
									/>
									<Button
										onClick={onDelete({
											id: legendDefinition.id,
										})}
										icon={<IconDelete24 />}
									>
										{i18n.t("Delete")}
									</Button>
								</div>
							),
						)}
					</div>
					<AddLegendDefinition onAdd={onAdd} />
				</div>
			</Field>
		</div>
	);
}
