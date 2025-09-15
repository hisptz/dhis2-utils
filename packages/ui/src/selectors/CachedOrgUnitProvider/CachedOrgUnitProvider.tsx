import { type ReactNode } from "react";
import { useOrganisationUnitData } from "./hooks/index.js";

interface OfflineOrgUnitProviderProps {
	children: ReactNode;
	fallback?: ReactNode;
	pageSize?: number;
}

/**
 * The `OfflineOrgUnitProvider` is a component that enabled caching of organisation unit requests to an indexed database in the browser.
 * The implementation motivation came from having a bad user experience of the `OrgUnitSelector` in areas of low-speed internet connectivity.
 * The component works by downloading and saving the organisationUnits, organisationUnitGroups and organisationUnitLevels when the component is first mounted.
 * The downloading is done in the background except when the fallback component is specified.
 *
 * To use the caching functionality, You can wrap your component with the `CachedOrgUnits` component.
 *
 * @example
 *
 * ```tsx
 * <OfflineOrgUnitProvider>
 *     <CachedOrgUnits>
 *         <ComponentThatUsesCachedOrgUnits>
 *     </CachedOrgUnits>
 * </OfflineOrgUnitProvider>
 * ```
 *
 * This component was designed to work with `OrgUnitSelector` component but can be modified to work in other scenarios.
 *
 *
 * @param {OfflineOrgUnitProviderProps} props
 *
 * @param [props.children] Components that will utilize cached organisation units
 * @param [props.fallback] A fallback component to show when the organisation units are being downloaded. Only provide this if you want the loading to be in the foreground.
 * @param [props.pageSize] Number of organisation unit to download at once. default is 1000
 *
 * */
export function OfflineOrgUnitProvider({
	children,
	fallback,
	pageSize,
}: OfflineOrgUnitProviderProps) {
	const { loading } = useOrganisationUnitData(pageSize);

	if (fallback && loading) {
		return <>{fallback}</>;
	}

	return <>{children}</>;
}

export type { OfflineOrgUnitProviderProps };
