import { FieldProps } from "../../interfaces";
import React, { useCallback, useEffect } from "react";
import {
	Button,
	colors,
	Field,
	IconDimensionOrgUnit16,
	Tooltip,
} from "@dhis2/ui";
import { useDataQuery } from "@dhis2/app-runtime";
import {
	CustomOrgUnitProvider,
	OrgUnitSelectorModal,
} from "../../../selectors";
import { OrgUnitSelection } from "@hisptz/dhis2-utils";
import { useBoolean } from "usehooks-ts";
import i18n from "@dhis2/d2-i18n";
import { OrgUnitSelectorProps } from "../../../selectors/OrgUnitSelector";
import { truncate } from "lodash";

export interface OrgUnitSelectFieldProps extends FieldProps {
	/**
	 * Selected organisation unit id
	 * */
	value?: OrgUnitSelection;
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

const orgUnitQuery: any = {
	ou: {
		resource: "analytics",
		params: ({ ous }: { ous: string[] }) => {
			return {
				dimension: [`ou:${ous.join(";")}`, `pe:TODAY`],
				skipData: true,
			};
		},
	},
};

type QueryResponse = {
	ou: {
		metaData: {
			items: {
				[key: string]: { name: string };
			};
			dimensions: {
				ou: string[];
			};
		};
	};
};

export function getOrgUnitsForAnalytics(
	orgUnitSelection: OrgUnitSelection,
): string[] {
	const {
		userOrgUnit,
		orgUnits,
		userSubUnit,
		userSubX2Unit,
		levels,
		groups,
	} = orgUnitSelection ?? {};
	const results = [];

	if (userOrgUnit) {
		results.push("USER_ORGUNIT");
	}
	if (userSubUnit) {
		results.push("USER_ORGUNIT_CHILDREN");
	}
	if (userSubX2Unit) {
		results.push("USER_ORGUNIT_GRANDCHILDREN");
	}

	if (orgUnits) {
		results.push(...orgUnits.map((orgUnit) => orgUnit.id));
	}
	if (groups) {
		results.push(...groups.map((group) => `OU_GROUP-${group}`));
	}
	if (levels) {
		results.push(...levels.map((level) => `LEVEL-${level}`));
	}
	return results;
}

export const OrgUnitObjectSelectField = ({
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
}: OrgUnitSelectFieldProps) => {
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
	} = useDataQuery<QueryResponse>(orgUnitQuery, {
		lazy: true,
		variables: {
			id: value,
		},
	});

	useEffect(() => {
		if (value) {
			refetch({
				ous: getOrgUnitsForAnalytics(value),
			});
		}
	}, []);

	const onUpdate = (orgUnit: OrgUnitSelection) => {
		closeModal();
		onChange(orgUnit);
		refetch({
			ous: getOrgUnitsForAnalytics(orgUnit),
		});
	};

	const onClear = useCallback(() => {
		onChange(undefined);
	}, [onChange]);

	const displayName = data?.ou?.metaData?.dimensions?.ou
		?.map((ou) => data.ou.metaData.items[ou].name)
		.join(", ");

	const Icon = customIcon ?? IconDimensionOrgUnit16;

	return (
		<Field
			{...props}
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
				<Button loading={loading} onClick={openModal} icon={<Icon />}>
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
						<Tooltip content={displayName}>
							<div
								style={{
									display: "flex",
									gap: 4,
								}}
							>
								{i18n.t("Selected")}:
								<span>
									{truncate(displayName, {
										length: 30,
										omission: "...",
									})}
								</span>
							</div>
						</Tooltip>
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
						value={value}
						onClose={closeModal}
						hide={hidden}
					/>
				)}
			</CustomOrgUnitProvider>
		</Field>
	);
};
