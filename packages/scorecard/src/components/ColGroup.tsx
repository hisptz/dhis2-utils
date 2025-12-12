import { useScorecardViewStateValue } from "../utils/viewState";

export function ColGroup() {
	const inPrintMode = useScorecardViewStateValue<boolean>("printMode");
	const itemNumber = useScorecardViewStateValue<boolean>("itemNumber");

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
