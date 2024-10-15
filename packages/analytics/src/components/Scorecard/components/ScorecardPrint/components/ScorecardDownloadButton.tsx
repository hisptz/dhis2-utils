import {
	DropdownButton,
	FlyoutMenu,
	IconDownload24,
	MenuItem,
	MenuSectionHeader,
} from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { type RefObject, useEffect, useRef, useState } from "react";
import { useScorecardData } from "../../DataProvider";
import { useReactToPrint } from "react-to-print";
import { useScorecardConfig } from "../../ConfigProvider";
import { ScorecardPreviewArea } from "./ScorecardPreviewArea";
import * as xlsx from "xlsx";
import { useScorecardMeta } from "../../MetaProvider";
import { downloadALMAData, downloadALMAMeta } from "../utils/download";

function DownloadMenu({
	previewRef,
	onClose,
}: {
	previewRef: RefObject<HTMLDivElement>;
	onClose: () => void;
}) {
	const config = useScorecardConfig();
	const { data: dataEngine } = useScorecardData();
	const meta = useScorecardMeta();
	const print = useReactToPrint({
		contentRef: previewRef,
		preserveAfterPrint: false,
		documentTitle: config.title,
	});

	const onDownload = (type: "excel" | "csv" | "alma" | "almaMeta") => () => {
		onClose();
		switch (type) {
			case "csv":
			case "excel":
				const extension = type === "csv" ? "csv" : "xlsx";
				const workbook = xlsx.utils.table_to_book(previewRef.current);
				xlsx.writeFile(workbook, `${config.title}.${extension}`);
				break;
			case "almaMeta":
				downloadALMAMeta({ config, meta: meta! });
				break;
			case "alma":
				downloadALMAData({
					config,
					meta: meta!,
					data: dataEngine.data,
				});
				break;
		}
	};

	return (
		<>
			<FlyoutMenu>
				<MenuItem
					onClick={onDownload("excel")}
					label={i18n.t("Excel")}
				/>
				<MenuItem onClick={onDownload("csv")} label={i18n.t("CSV")} />
				<MenuItem
					onClick={() => {
						print();
					}}
					label={i18n.t("PDF")}
				/>
				<MenuSectionHeader label={i18n.t("ALMA")} />
				<MenuItem
					onClick={onDownload("alma")}
					label={i18n.t("Data(JSON)")}
				/>
				<MenuItem
					onClick={onDownload("almaMeta")}
					label={i18n.t("Metadata")}
				/>
			</FlyoutMenu>
		</>
	);
}

export function ScorecardDownloadButton() {
	const { data: dataEngine } = useScorecardData();
	const [menuRef, setMenuRef] = useState<boolean>(false);
	const [completed, setCompleted] = useState<boolean>(dataEngine.isDone);
	const previewRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		return dataEngine.addOnCompleteListener(setCompleted);
	}, [dataEngine]);

	return (
		<>
			{completed && <ScorecardPreviewArea previewRef={previewRef} />}
			<DropdownButton
				type="button"
				disabled={!completed}
				open={menuRef}
				onClick={(_, e) => {
					setMenuRef(true);
				}}
				icon={<IconDownload24 />}
				component={
					<DownloadMenu
						onClose={() => setMenuRef(false)}
						previewRef={previewRef}
					/>
				}
			>
				{!completed ? i18n.t("Please wait...") : i18n.t("Download")}
			</DropdownButton>
		</>
	);
}
