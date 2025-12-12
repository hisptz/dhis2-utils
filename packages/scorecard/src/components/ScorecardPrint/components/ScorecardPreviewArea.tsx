import { memo, type RefObject } from "react";
import { TableStateProvider } from "../../TableStateProvider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ScorecardTable } from "../../ScorecardTable";
import { ScorecardHeader } from "../../ScorecardHeader";
import { ScorecardLegendsView } from "../../ScorecardLegendsView";
import { ScorecardStateProvider } from "../../StateProvider";
import { useScorecardConfig } from "../../ConfigProvider";
import type { ScorecardState } from "../../../schemas/config";
import "../print.css";
import {
	useOrgUnitSelectionValue,
	usePeriodSelectionValue,
	useScorecardViewOptions,
} from "../../../utils";

export const ScorecardPreviewArea = memo(function ScorecardPreviewArea({
	previewRef,
}: {
	previewRef: RefObject<HTMLDivElement>;
}) {
	const config = useScorecardConfig();
	const options = useScorecardViewOptions();
	const periodSelection = usePeriodSelectionValue();
	const orgUnitSelection = useOrgUnitSelectionValue();

	const updatedState = {
		periodSelection,
		orgUnitSelection,
		options: {
			...(options ?? {}),
			disableExpanding: true,
			disablePagination: true,
			printMode: true,
		},
	} as ScorecardState;

	return (
		<ScorecardStateProvider initialState={updatedState} config={config}>
			<div style={{ display: "none" }}>
				<div
					className="print-preview"
					style={{
						height: "100%",
						display: "flex",
						gap: 16,
						flexDirection: "column",
					}}
					ref={previewRef}
				>
					<ScorecardHeader />
					<ScorecardLegendsView />
					<TableStateProvider>
						<DndProvider backend={HTML5Backend}>
							<ScorecardTable
								layout="fixed"
								scrollHeight="100%"
								scrollWidth="100%"
								width="100%"
							/>
						</DndProvider>
					</TableStateProvider>
				</div>
			</div>
		</ScorecardStateProvider>
	);
});
