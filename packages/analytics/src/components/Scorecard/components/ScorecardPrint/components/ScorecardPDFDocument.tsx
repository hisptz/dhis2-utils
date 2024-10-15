import { Document } from "@react-pdf/renderer";
import {
	PDFTableStateProvider,
	usePDFTableState,
} from "./PDFTableStateProvider";
import { chunk } from "lodash";
import i18n from "@dhis2/d2-i18n";
import type { ScorecardConfig } from "../../../schemas/config";
import { ScorecardPDFPage } from "./ScorecardPDFPage";

export function ScorecardPDFDocument({
	config,
	table,
}: {
	config: ScorecardConfig;
	table: ReturnType<typeof usePDFTableState>;
}) {
	const pageSize = 5;
	const chunks = chunk(table.getRowModel().rows, pageSize);

	return (
		<PDFTableStateProvider table={table}>
			<Document
				title={config.title}
				style={{
					fontSize: "8px",
				}}
				author={i18n.t("DHIS2 Scorecard App")}
			>
				{chunks.map((rows, index) => (
					<ScorecardPDFPage key={`${index}-page`} rows={rows} />
				))}
			</Document>
		</PDFTableStateProvider>
	);
}
