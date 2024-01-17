export type OrganisationUnitGroup = {
	id: string;
	displayName?: string;
	shortName?: string;
	name?: string;
	code?: string;
	href?: string;
	lastUpdated?: string;
	created?: string;
	sharing?:
		| string
		| {
				external: boolean;
				users: Record<string, any>;
				userGroups: Record<string, any>;
		  };
	translations?: any[];
	organisationUnits: OrganisationUnit[];
};

export type OrganisationUnit = {
	path?: string;
	level?: number;
	organisationUnitGroups?: OrganisationUnitGroup[];
	children: OrganisationUnit[];
	parent?: OrganisationUnit;
	ancestors?: OrganisationUnit[];
	id: string;
	displayName?: string;
	shortName?: string;
	name?: string;
	code?: string;
	href?: string;
	lastUpdated?: string;
	created?: string;
	sharing?:
		| string
		| {
				external: boolean;
				users: Record<string, any>;
				userGroups: Record<string, any>;
		  };
	translations?: any[];
};

export type OrgUnitSelection = {
	orgUnits?: Array<OrganisationUnit>;
	levels?: Array<string>;
	groups?: Array<string>;
	userOrgUnit?: boolean;
	userSubUnit?: boolean;
	userSubX2Unit?: boolean;
};

export type OrgUnitSelectorProps = {
	value?: OrgUnitSelection;
	onUpdate?: (value: OrgUnitSelection) => void;
	showLevels?: boolean;
	showGroups?: boolean;
	showUserOptions?: boolean;
	singleSelection?: boolean;
	searchable?: boolean;
	limitSelectionToLevels?: number[];
	filterByGroups?: string[];
	roots?: OrganisationUnit[];
};
