import { FieldProps } from "../../interfaces";
import React, { useCallback, useEffect } from "react";
import { Button, colors, Field, IconDimensionOrgUnit16 } from "@dhis2/ui";
import { useDataQuery } from "@dhis2/app-runtime";
import {
	CustomOrgUnitProvider,
	OrgUnitSelectorModal,
} from "../../../selectors";
import { OrganisationUnit, OrgUnitSelection } from "@hisptz/dhis2-utils";
import { compact, head } from "lodash";
import { useBoolean } from "usehooks-ts";
import i18n from "@dhis2/d2-i18n";
import { OrgUnitSelectorProps } from "../../../selectors/OrgUnitSelector";

export interface OrgUnitSelectFieldProps extends FieldProps {
	/**
	 * Selected organisation unit id
	 * */
	value?: string;
	/**
	 *  Label for the select button
	 * */
	buttonLabel?: string;

	/**
	 * Used to override `OrgUnitSelector` component props
	 * */
	orgUnitProps?: OrgUnitSelectorProps;
	customIcon?: React.FC<any>;
}

const orgUnitQuery = {
	ou: {
		resource: "organisationUnits",
		id: ({ id }: any) => id,
		params: {
			fields: ["id", "displayName", "path"],
		},
	},
};

export const OrgUnitSelectField = React.forwardRef(
	(
		{
			value,
			onChange,
			label,
			buttonLabel,
			error,
			warning,
			required,
			orgUnitProps,
			customIcon,
			...props
		}: OrgUnitSelectFieldProps,
		ref,
	) => {
		const {
			value: hidden,
			setTrue: closeModal,
			setFalse: openModal,
		} = useBoolean(true);
		const {
			data,
			loading,
			error: fetchError,
			refetch,
		} = useDataQuery(orgUnitQuery, {
			lazy: true,
			variables: {
				id: value,
			},
		});

		useEffect(() => {
			if (value) {
				refetch({
					id: value,
				});
			}
		}, []);

		const onUpdate = (orgUnit: OrgUnitSelection) => {
			closeModal();
			const orgUnitId = head(orgUnit?.orgUnits)?.id;
			onChange(orgUnitId);
			refetch({
				id: orgUnitId,
			});
		};

		const onClear = useCallback(() => {
			onChange(undefined);
		}, [onChange]);

		const displayName = (data?.ou as any)?.displayName;

		const Icon = customIcon ?? IconDimensionOrgUnit16;

		return (
			<Field
				required={required}
				error={fetchError !== undefined ? !!fetchError : !!error}
				warning={Boolean(warning)}
				validationText={
					fetchError?.message
						? fetchError.message
						: typeof error === "string"
							? error
							: typeof warning === "string"
								? warning
								: undefined
				}
				label={label}
			>
				<div
					style={{
						display: "flex",
						gap: 8,
						alignItems: "flex-start",
						flexDirection: "column",
					}}
					className="row gap-16 align-center"
				>
					<Button
						loading={loading}
						onClick={openModal}
						icon={<Icon />}
					>
						{buttonLabel ??
							(value
								? i18n.t("Change organisation unit")
								: i18n.t("Select organisation unit"))}
					</Button>
					{Boolean(value) && (
						<div
							style={{
								display: "flex",
								gap: 16,
								justifyContent: "space-between",
								alignItems: "center",
								color: colors.grey800,
								fontSize: 12,
							}}
						>
							<div
								style={{
									display: "flex",
									gap: 4,
								}}
							>
								{i18n.t("Selected")}:<span>{displayName}</span>
							</div>
							<a
								role="button"
								onClick={onClear}
								style={{
									textDecoration: "underline",
									cursor: "pointer",
								}}
							>
								{i18n.t("Clear")}
							</a>
						</div>
					)}
				</div>
				<CustomOrgUnitProvider>
					{!hidden && (
						<OrgUnitSelectorModal
							position="middle"
							singleSelection
							searchable
							{...orgUnitProps}
							onUpdate={(data: OrgUnitSelection) => {
								onUpdate(data);
								closeModal();
							}}
							value={{
								orgUnits: value
									? compact([data?.ou as OrganisationUnit])
									: [],
							}}
							onClose={closeModal}
							hide={hidden}
						/>
					)}
				</CustomOrgUnitProvider>
			</Field>
		);
	},
);
