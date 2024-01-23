import { OrganisationUnit } from "../dhis2/index.js";

/**
 * Standard access object
 * */
export interface AccessObject {
	read: boolean;
	write: boolean;
	delete?: boolean;
}

/**
 *
 *  Organisation unit selection from the organisation unit tree component in `@hisptz/react-ui`
 * */
export interface OrgUnitSelection {
	orgUnits?: Array<OrganisationUnit>;
	levels?: Array<string>;
	groups?: Array<string>;
	userOrgUnit?: boolean;
	userSubUnit?: boolean;
	userSubX2Unit?: boolean;
}

/**
 *
 * Standard legend definition object
 * */
export interface LegendDefinition {
	id: string;
	label: string;
	color: string;
}

/**
 *
 * Custom legend object for use with Legend definition object
 * */
export interface CustomLegend {
	id: string; // legend definition id
	startValue: number;
	endValue: number;
}
