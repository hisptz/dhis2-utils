import {DHIS2Resource} from "./base";
import { LegendSet, OptionSet, Program} from "./metadata";
import {DHIS2AccessString, DHIS2ValueType} from "./base";

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
    trackedEntityInstance: string;
    trackedEntityType?: string;
    potentialDuplicate?: boolean;
    orgUnit?: string;
    enrollments?: Enrollment[]
    relationships?: Relationship[];
    attributes?: { attribute: string, value: string }[];
}

export interface TrackedEntityType extends DHIS2Resource {
}

export interface DataValue {
    value: string;
    dataElement: string;
}

export interface Event extends Omit<DHIS2Resource, "id"> {
    event: string;
    program: string;
    programStage: string;
    orgUnit: string;
    orgUnitName: string;
    trackedEntityInstance?: string;
    eventDate: string;
    status: string;
    dataValues: DataValue[];
    enrollmentStatus: string;
    enrollment: string;

}


export interface Enrollment extends DHIS2Resource {
    program?: string;
    events?: Event[];
    enrollment?: string;
    trackedEntityInstance?: string;
    orgUnit?: string;
    enrollmentDate?: string;
}

export interface Relationship extends DHIS2Resource {
  relationshipType: string;
  relationshipName: string;
  relationship: string;
  from: TrackedEntityInstance | Event | Enrollment;
  to: TrackedEntityInstance | Event | Enrollment;
}


export type ProgramType = "WITH_REGISTRATION" | "WITHOUT_REGISTRATION"
