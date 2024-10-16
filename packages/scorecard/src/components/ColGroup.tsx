import { useScorecardStateSelectorValue } from "../state";

export function ColGroup() {
	const inPrintMode = useScorecardStateSelectorValue<boolean>([
		"options",
		"printMode",
	]);

	const itemNumber = useScorecardStateSelectorValue<boolean>([
		"options",
		"itemNumber",
	]);

	if (!inPrintMode) {
		return null;
	}

	return (
		<colgroup>
			{itemNumber && <col width={48} />}
			<col width="auto" />
		</colgroup>
	);
}
