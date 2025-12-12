import { SectionVisibilityState } from "../state";
import type { OptionSet } from "@hisptz/dhis2-utils";
import { memo } from "react";
import { useRecoilValue } from "recoil";

export interface SectionProgramRuleChildrenProps {
	hidden: boolean;
}

export const SectionProgramRule = memo(function SectionProgramRule({
	id,
	children,
}: {
	id: string;
	children: any;
	optionSet?: OptionSet;
	validations?: Record<string, any>;
	mandatory?: boolean;
}) {
	const hidden = useRecoilValue(SectionVisibilityState(id)) ?? {};
	return children({
		hidden,
	} as SectionProgramRuleChildrenProps);
});
