export interface DHIS2Resource {
    id: string;
    displayName?: string;
    shortName?: string;
    name?: string;
    code?: string;
    href?: string;
    lastUpdated?: string;
    created?: string;
    sharing?: string;
    translations?: any[];

    [key: string]: any;
}

//TODO: Add more acceptable types
export type DHIS2AccessString = "rw------" | "r-------" | "-------"

//TODO: Copy from react library
export type DHIS2ValueType = "LONG_TEXT" | ""

export interface DHIS2Access {
    read?: boolean;
    write?: boolean;
    delete?: boolean;
    externalize?: boolean;
    manage?: boolean;
    update?: boolean;
}

export interface DHIS2Sharing {
    owner: string;
    external: boolean;
    public: DHIS2AccessString;
    users: {
        [key: string]: DHIS2AccessString;
    };
    userGroups: {
        [key: string]: DHIS2AccessString;
    };
}

export interface Legend {

}

export interface LegendSet {
    id: string;
    name: string;
    legends: Legend[];
}

export interface Attribute extends DHIS2Resource {
    mandatory: boolean;
    publicAccess: DHIS2AccessString;
    externalAccess: boolean;
    valueType: DHIS2ValueType;
}

export interface TrackedEntityAttribute extends DHIS2Resource {
    valueType?: DHIS2ValueType;
    optionSet?: OptionSet;
    legendSets?: LegendSet[];
    attributeValues?: { value: string, attribute: { id: string } }[];
}

export interface TrackedEntityInstance extends DHIS2Resource {

}

export interface Event extends DHIS2Resource {
}

export interface DataElement extends DHIS2Resource {
}

export interface DataElementGroup extends DHIS2Resource {
}

export interface OrganisationUnit extends DHIS2Resource {
}

export interface OrganisationUnitGroup extends DHIS2Resource {
}

export interface OrganisationUnitLevel extends DHIS2Resource {
}

export interface Program extends DHIS2Resource {
}

export interface ProgramRule extends DHIS2Resource {
}

export interface ProgramStage extends DHIS2Resource {
}

export interface Enrollment extends DHIS2Resource {
}


export interface DHIS2UserGroup extends DHIS2Resource {
    externalAccess?: boolean;
    publicAccess?: DHIS2AccessString;
    users?: DHIS2User[];

}

export interface DHIS2User extends DHIS2Resource {
    firstName?: string;
    surname?: string;
    email?: string;
    userGroupAccesses?: DHIS2Access[];
    userAccesses: DHIS2Access[];
    userGroups?: DHIS2UserGroup[];
    organisationUnits?: OrganisationUnit[];
    dataViewOrganisationUnits?: OrganisationUnit[];
}


export interface ProgramIndicator extends DHIS2Resource {

}

export interface Indicator extends DHIS2Resource {

}

export interface Relationship extends DHIS2Resource {

}

export interface Option extends DHIS2Resource {

}

export interface OptionGroup extends DHIS2Resource {

}

export interface OptionSet extends DHIS2Resource {

}

export interface Icon extends DHIS2Resource {

}

export interface DataSet extends DHIS2Resource {

}
