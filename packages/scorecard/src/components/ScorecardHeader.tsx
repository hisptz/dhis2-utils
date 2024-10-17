import { useScorecardConfig } from "./ConfigProvider";
import { useMemo } from "react";
import { useScorecardStateSelectorValue } from "../state";
import type { PeriodSelection } from "../schemas/config";
import { PeriodUtility } from "@hisptz/dhis2-utils";
import { head } from "lodash";
import { colors } from "@dhis2/ui";
import JsxParser from "react-jsx-parser";

export function ScorecardHeader() {
	const config = useScorecardConfig();
	const { customHeader, title, subtitle } = config ?? {};

	const periodSelection =
		useScorecardStateSelectorValue<PeriodSelection>("periodSelection");
	const showTitle = useScorecardStateSelectorValue<boolean>([
		"options",
		"title",
	]);

	const periods = useMemo(() => periodSelection.periods, [periodSelection]);

	const period = useMemo(() => {
		if (periods.length > 1) {
			return;
		}
		return PeriodUtility.getPeriodById(head(periods)?.id as string);
	}, [periods]);

	if (!showTitle) {
		return null;
	}

	return (
		<div className="row space-between" id={"scorecard-header"}>
			<div className="row">
				{customHeader ? (
					/*
      // @ts-ignore */
					<JsxParser
						autoCloseVoidElements
						className="w-100"
						onError={console.error}
						bindings={{
							title,
							subtitle,
							period: periods.length === 1 ? period?.name : "",
						}}
						jsx={customHeader}
					/>
				) : (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							gap: 16,
						}}
					>
						<h1
							style={{ margin: 8 }}
							id={"data-test-score-card-title"}
						>
							{title}{" "}
							{`${
								periods.length === 1 ? ` - ${period?.name}` : ""
							}`}
						</h1>
						<h3 style={{ color: colors.grey600, margin: 0 }}>
							{subtitle}
						</h3>
					</div>
				)}
			</div>
		</div>
	);
}
