import type { ScorecardTableData } from "../../../schemas/config";
import type { Row } from "@tanstack/react-table";
import { Page, View } from "@react-pdf/renderer";
import { PDFTableHead } from "./Table/TableHead";

const pageStyling = {
	padding: 16,
	display: "flex",
} as const;

const tableStyling = {
	display: "flex",
	flexDirection: "column",
	border: "1px solid black",
	height: "100%",
} as const;

export function ScorecardPDFPage({
	rows,
}: {
	rows: Row<ScorecardTableData>[];
}) {
	return (
		<Page dpi={30} orientation="landscape" style={pageStyling} size="A2">
			<View style={tableStyling}>
				<PDFTableHead />
			</View>
		</Page>
	);
}
