import { Button } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { useReactToPrint } from "react-to-print";
import type { RefObject } from "react";

export function PDFPrintButton({
	previewRef,
	loading,
}: {
	previewRef: RefObject<HTMLDivElement>;
	loading: boolean;
}) {
	const print = useReactToPrint({
		contentRef: previewRef,
		preserveAfterPrint: true,
	});

	return (
		<Button disabled={loading} onClick={() => print()}>
			{i18n.t("PDF")}
		</Button>
	);
}
