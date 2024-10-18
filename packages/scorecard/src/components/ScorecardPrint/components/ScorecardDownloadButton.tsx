import {
	DropdownButton,
	FlyoutMenu,
	IconDownload24,
	MenuItem,
} from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import {
	type RefObject,
	useEffect,
	useRef,
	useState,
	useTransition,
} from "react";
import { useScorecardData } from "../../DataProvider";
import { useReactToPrint } from "react-to-print";
import { useScorecardConfig } from "../../ConfigProvider";
import { ScorecardPreviewArea } from "./ScorecardPreviewArea";
import * as xlsx from "xlsx";
import { useScorecardMeta } from "../../MetaProvider";
import { downloadALMAData, downloadALMAMeta } from "../utils/download";
import { useAlert } from "@dhis2/app-runtime";
import "../print.css";

function DownloadMenu({
	previewRef,
	onClose,
}: {
	previewRef: RefObject<HTMLDivElement>;
	onClose: () => void;
}) {
	const config = useScorecardConfig();
	const { show } = useAlert(
		({ message }) => message,
		({ type }) => ({ ...type, duration: 3000 }),
	);
	const { data: dataEngine } = useScorecardData();
	const meta = useScorecardMeta();
	const print = useReactToPrint({
		contentRef: previewRef,
		documentTitle: config.title,
		onPrintError: (errorLocation, error) => {
			console.error(`Error running ${errorLocation}`);
			console.error(error);
			show({
				message: `${i18n.t("Could not open the print dialog")}: ${
					error.message ?? i18n.t("Unknown error")
				}`,
				type: { info: true },
			});
		},
	});

	const onDownload =
		(type: "excel" | "csv" | "alma" | "almaMeta" | "pdf") => () => {
			onClose();
			switch (type) {
				case "pdf":
					print();
					break;
				case "csv":
				case "excel":
					const extension = type === "csv" ? "csv" : "xlsx";
					const workbook = xlsx.utils.table_to_book(
						previewRef.current,
					);
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
			<FlyoutMenu closeMenu={onClose}>
				<MenuItem
					onClick={onDownload("excel")}
					label={i18n.t("Excel")}
				/>
				<MenuItem onClick={onDownload("csv")} label={i18n.t("CSV")} />
				<MenuItem onClick={onDownload("pdf")} label={i18n.t("PDF")} />
				<MenuItem label={i18n.t("ALMA")}>
					<MenuItem
						onClick={onDownload("alma")}
						label={i18n.t("Data(JSON)")}
					/>
					<MenuItem
						onClick={onDownload("almaMeta")}
						label={i18n.t("Metadata")}
					/>
				</MenuItem>
			</FlyoutMenu>
		</>
	);
}

export function ScorecardDownloadButton() {
	const [isPending, startTransition] = useTransition();
	const { data: dataEngine } = useScorecardData();
	const [openMenu, setOpenMenu] = useState<boolean>(false);
	const [completed, setCompleted] = useState<boolean>(dataEngine.isDone);
	const previewRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		return dataEngine.addOnCompleteListener((completed) => {
			startTransition(() => {
				setCompleted(completed);
			});
		});
	}, [dataEngine]);

	return (
		<>
			{completed && <ScorecardPreviewArea previewRef={previewRef} />}
			<DropdownButton
				type="button"
				value="scorecard-download-button"
				disabled={!completed}
				open={openMenu}
				onClick={({ open }) => {
					startTransition(() => {
						setOpenMenu(open);
					});
				}}
				icon={<IconDownload24 />}
				component={
					isPending ? (
						<div>Loading</div>
					) : (
						<DownloadMenu
							onClose={() => setOpenMenu(false)}
							previewRef={previewRef}
						/>
					)
				}
			>
				{!completed
					? i18n.t("Please wait...")
					: isPending
						? i18n.t("Preparing...")
						: i18n.t("Download")}
			</DropdownButton>
		</>
	);
}
