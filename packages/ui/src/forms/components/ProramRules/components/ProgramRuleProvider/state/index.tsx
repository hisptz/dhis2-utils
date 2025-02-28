import React from "react";
import { atomFamily, RecoilRoot, selectorFamily } from "recoil";

export const FieldVisibilityState = atomFamily({
	key: "field-visibility-state",
	default: false,
});
export const SectionVisibilityState = atomFamily({
	key: "section-visibility-state",
	default: false,
});
export const FieldMandatoryState = atomFamily({
	key: "field-mandatory-state",
	default: false,
});

export const FieldHiddenOptionsState = atomFamily<string[], string>({
	key: "field-hidden-options-state",
	default: [],
});

export const FieldWarningState = atomFamily<string, string>({
	key: "field-warning-state",
	default: "",
});

export const FieldLoadingState = atomFamily<boolean, string>({
	key: "field-loading-state",
	default: false,
});

export const FieldDisabledState = atomFamily<boolean, string>({
	key: "field-disabled-state",
	default: false,
});

export const FieldErrorState = atomFamily<string | null, string>({
	key: "field-error-state",
	default: null,
});

export const FieldMinMaxState = atomFamily<
	{ min?: number | string; max?: number | string } | null,
	string
>({
	key: "field-min-max-state",
	default: null,
});
export const FieldState = selectorFamily({
	key: "field-state",
	get:
		(field: string) =>
		({ get, getCallback }) => {
			const setFieldState = getCallback(
				({ set }) =>
					(
						type:
							| "hidden"
							| "hiddenOptions"
							| "warning"
							| "disabled"
							| "minMax"
							| "loading"
							| "mandatory"
							| "error",
						value: any,
					) => {
						switch (type) {
							case "hidden":
								set(FieldVisibilityState(field), value);
								break;
							case "mandatory":
								set(FieldMandatoryState(field), value);
								break;
							case "hiddenOptions":
								set(FieldHiddenOptionsState(field), value);
								break;
							case "warning":
								set(FieldWarningState(field), value);
								break;
							case "disabled":
								set(FieldDisabledState(field), value);
								break;
							case "error":
								set(FieldErrorState(field), value);
								break;
							case "minMax":
								set(FieldMinMaxState(field), value);
								break;
							case "loading":
								set(FieldLoadingState(field), value);
								break;
							default:
								break;
						}
					},
			);
			return {
				hidden: get(FieldVisibilityState(field)),
				mandatory: get(FieldMandatoryState(field)),
				hiddenOptions: get(FieldHiddenOptionsState(field)),
				warning: get(FieldWarningState(field)),
				disabled: get(FieldDisabledState(field)),
				minMax: get(FieldMinMaxState(field)),
				loading: get(FieldLoadingState(field)),
				error: get(FieldErrorState(field)),
				setFieldState: setFieldState,
			};
		},
});
export const SectionState = selectorFamily({
	key: "field-state",
	get:
		(section: string) =>
		({ get, getCallback }) => {
			const setFieldState = getCallback(
				({ set }) =>
					(type: "hidden", value: any) => {
						switch (type) {
							case "hidden":
								set(SectionVisibilityState(section), value);
								break;
							default:
								break;
						}
					},
			);
			return {
				hidden: get(FieldVisibilityState(section)),
			};
		},
});

export const FieldStateProvider = React.memo(function FieldStateProvider({
	children,
	includeRoot,
}: {
	children: React.ReactNode;
	includeRoot?: boolean;
}) {
	if (includeRoot) {
		return <RecoilRoot>{children}</RecoilRoot>;
	}

	return <>{children}</>;
});
