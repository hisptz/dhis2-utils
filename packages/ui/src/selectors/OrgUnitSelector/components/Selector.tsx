import {
	Box,
	CenteredContent,
	CircularLoader,
	colors,
	IconError24,
} from "@dhis2/ui";
import React, { Fragment, useMemo } from "react";
import { useOrgUnitsRoot } from "../hooks";
import { OrgUnitSelectorProps } from "../types";
import { LevelAndGroupSelector } from "./LevelAndGroupSelector";
import { OrgUnitSearch } from "./OrgUnitSearch";
import { OrgUnitTree } from "./OrgUnitTree";
import { OrgUnitUserOptions } from "./OrgUnitUserOptions";
import styled from "styled-components";

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

	const BorderedContainer = styled.div`{
      box-sizing: border-box;
      border-radius: 4px;
      border: 1px solid #A0ADBA;
      display: flex;
      flex-direction: column;
      min-height: 400px;
      max-height: 500px;
      overflow: hidden;
    }`;

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
				<IconError24 style={{ color: colors.grey700 }} />
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
					<BorderedContainer>
						{showUserOptions && (
							<OrgUnitUserOptions
								value={value}
								onUpdate={onUpdate}
							/>
						)}
						{error && (
							<CenteredContent>
								<p>{error?.message || error.toString()}</p>
							</CenteredContent>
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
								<CenteredContent>
									<CircularLoader small />
								</CenteredContent>
							)}
						</div>
					</BorderedContainer>
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
