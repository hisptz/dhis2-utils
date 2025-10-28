import { useScorecardConfig } from "./ConfigProvider";
import { useMemo } from "react";
import { PeriodUtility } from "@hisptz/dhis2-utils";
import { head } from "lodash";
import { colors } from "@dhis2/ui";
import JsxParser from "react-jsx-parser";
import { useScorecardViewStateValue } from "../utils";
import { usePeriodSelectionValue } from "../utils";

export function ScorecardHeader() {
	const config = useScorecardConfig();
	const { customHeader, title, subtitle } = config ?? {};

	const periodSelection = usePeriodSelectionValue();
	const showTitle = useScorecardViewStateValue<boolean>("title");

	const periods = useMemo(
		() => periodSelection.periods,
		[periodSelection.periods],
	);

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
		<>
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
						width: "100%",
						gap: 16,
					}}
				>
					<h1 style={{ margin: 8 }} id={"data-test-score-card-title"}>
						{title}{" "}
						{`${periods.length === 1 ? ` - ${period?.name}` : ""}`}
					</h1>
					<h3 style={{ color: colors.grey600, margin: 0 }}>
						{subtitle}
					</h3>
				</div>
			)}
		</>
	);
}
