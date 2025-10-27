import { useHighlightedItemsData } from "./hooks/data";
import { CircularLoader } from "@dhis2/ui";
import { useScorecardConfig } from "../ConfigProvider";
import { HighlightedItem } from "./components/HighlightedItem";

export function HighlightedItems() {
	const { highlightedIndicators } = useScorecardConfig();
	const { loading, error, data } = useHighlightedItemsData();

	if (loading) {
		return (
			<div>
				<CircularLoader small />
			</div>
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
