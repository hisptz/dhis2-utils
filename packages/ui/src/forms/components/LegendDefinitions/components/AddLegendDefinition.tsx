import i18n from "@dhis2/d2-i18n";
import { Button, Field, IconAdd24 } from "@dhis2/ui";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RHFDHIS2FormField } from "../../react-hook-form-fields";
import { VALUE_TYPES } from "../../../constants";

export function AddLegendDefinition({
	onAdd,
}: {
	onAdd: (legendDefinition: any) => void;
}) {
	const form = useForm({
		mode: "onSubmit",
		reValidateMode: "onSubmit",
	});

	const onAddClick = () => {
		form.handleSubmit(({ newLegendDefinition }) =>
			onAdd(newLegendDefinition),
		)();
		form.reset({ newLegendDefinition: { color: "", name: "" } });
	};

	const value = form.watch("newLegendDefinition");
	const disableButton = !value?.color || !value?.name;
	const error = form.getFieldState("newLegendDefinition")?.error;

	return (
		<FormProvider {...form}>
			<Field
				error={!!error}
				validationText={error?.message as string}
				label={i18n.t("New Legend Definition")}
			>
				<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
					<RHFDHIS2FormField
						validations={{
							validate: (value: any) => {
								if (!value?.color) {
									return i18n.t("Color is required");
								}
								if (!value?.name) {
									return i18n.t("Label is required");
								}
								return true;
							},
						}}
						name="newLegendDefinition"
						valueType={VALUE_TYPES.LEGEND_DEFINITION.name}
					/>
					<Button
						disabled={disableButton}
						icon={<IconAdd24 />}
						onClick={onAddClick}
					>
						{i18n.t("Add")}
					</Button>
				</div>
			</Field>
		</FormProvider>
	);
}
