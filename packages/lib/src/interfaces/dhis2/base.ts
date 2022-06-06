/*
* Base DHIS2 Resource Interface
*
* This interface is the base interface for all DHIS2 resources.
*
*
* */
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
/*
* DHIS2 Access string
* */
export type DHIS2AccessString = "rw------" | "r-------" | "-------" | "rwrw----"

//TODO: Copy from react library
export type DHIS2ValueType = "LONG_TEXT" | "TEXT" | "BOOLEAN" | "DATE" | "AGE" | "NUMBER"

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

export interface Icon extends DHIS2Resource {
  key: string;
  description?: string;
  href?: string;
  keywords?: string[];
}
