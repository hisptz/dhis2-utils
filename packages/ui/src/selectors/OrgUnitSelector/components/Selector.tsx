import { Box, Center, CircularLoader, colors, IconError24 } from "@dhis2/ui";
import React, { Fragment, useMemo } from "react";
import { useOrgUnitsRoot } from "../hooks/index.js";
import { OrgUnitSelectorProps } from "../types/index.js";
import { LevelAndGroupSelector } from "./LevelAndGroupSelector/index.js";
import { OrgUnitSearch } from "./OrgUnitSearch/index.js";
import { OrgUnitTree } from "./OrgUnitTree/index.js";
import { OrgUnitUserOptions } from "./OrgUnitUserOptions/index.js";

export default function OrgUnitSelector({
	value,
	onUpdate,
	showLevels,
	showUserOptions,
	showGroups,
	singleSelection,
	roots: defaultRoots,
	searchable,
	limitSelectionToLevels,
}: OrgUnitSelectorProps) {
	const { roots, error, loading } = useOrgUnitsRoot(defaultRoots);
	const { userOrgUnit, userSubUnit, userSubX2Unit } = value ?? {};
	const disableSelections = useMemo(
		() => userOrgUnit || userSubX2Unit || userSubUnit,
		[userOrgUnit, userSubUnit, userSubX2Unit],
	);

	if (error) {
		return (
			<div
				style={{
					height: 400,
					width: 500,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<IconError24 color={colors.grey700} />
				<p style={{ color: colors.grey700 }}>
					{error.message ?? "Something went wrong"}
				</p>
			</div>
		);
	}

	return (
		<Box minHeight="400px" maxWidth={"700px"} minWidth={"500px"}>
			{loading ? (
				<div
					style={{
						minHeight: 400,
						width: "100%",
						height: "100%",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<CircularLoader small />
				</div>
			) : (
				<Fragment>
					<div
						style={{
							boxSizing: "border-box",
							borderRadius: 4,
							border: "1px solid #A0ADBA",
							display: "flex",
							flexDirection: "column",
							minHeight: 400,
							maxHeight: 500,
							overflow: "hidden",
						}}
					>
						{showUserOptions && (
							<OrgUnitUserOptions
								value={value}
								onUpdate={onUpdate}
							/>
						)}
						{error && (
							<Center>
								<p>{error?.message || error.toString()}</p>
							</Center>
						)}
						<div
							style={{
								padding: 8,
								gap: 8,
								display: "flex",
								flexDirection: "column",
							}}
						>
							<OrgUnitSearch searchable={searchable} />
							{roots && (
								<OrgUnitTree
									limitSelectionToLevels={
										limitSelectionToLevels
									}
									value={value}
									onUpdate={onUpdate}
									roots={roots}
									disableSelections={disableSelections}
									singleSelection={singleSelection}
								/>
							)}
							{loading && !error && (
								<Center>
									<CircularLoader small />
								</Center>
							)}
						</div>
					</div>
					{(showLevels || showGroups) && (
						<LevelAndGroupSelector
							showLevels={showLevels}
							disableSelections={disableSelections}
							onUpdate={onUpdate}
							value={value}
							showGroups={showGroups}
						/>
					)}
				</Fragment>
			)}
		</Box>
	);
}
