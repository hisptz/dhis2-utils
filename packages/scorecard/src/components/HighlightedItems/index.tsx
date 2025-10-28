import { useHighlightedItemsData } from "./hooks/data";
import { CircularLoader, colors, IconError16 } from "@dhis2/ui";
import { useScorecardConfig } from "../ConfigProvider";
import { HighlightedItem } from "./components/HighlightedItem";
import i18n from "@dhis2/d2-i18n";
import { useScorecardViewStateValue } from "../../utils";

export function HighlightedItems() {
	const showHighlightedItems = useScorecardViewStateValue<boolean>(
		"highlightedIndicators",
	);

	const { highlightedIndicators } = useScorecardConfig();
	const { loading, error, data } = useHighlightedItemsData();

	if (!showHighlightedItems) {
		return null;
	}

	if (loading) {
		return (
			<div
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<CircularLoader small />
			</div>
		);
	}

	if (error) {
		return (
			<span
				style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
			>
				<IconError16 />
				<span style={{ fontSize: 14, color: colors.grey700 }}>
					{`${i18n.t("Error loading highlighted items")}: ${error.message}`}
				</span>
			</span>
		);
	}

	return (
		<div
			style={{
				display: "grid",
				gap: 16,
				gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
			}}
		>
			{highlightedIndicators?.map((item) => {
				const value = data?.rows?.find((row) =>
					row.includes(item.id),
				)?.[1];
				return (
					<HighlightedItem key={item.id} item={item} data={value} />
				);
			})}
		</div>
	);
}
