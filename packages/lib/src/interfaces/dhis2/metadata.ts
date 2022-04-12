import {DHIS2Access, DHIS2AccessString, DHIS2Resource, DHIS2ValueType} from "./base";
import {TrackedEntityAttribute, TrackedEntityType} from "./tracker";


export interface DataElement extends DHIS2Resource {
    valueType: DHIS2ValueType;
    optionSet?: OptionSet;
    legendSets?: LegendSet[];
    dataElementGroups?: { id: string; }[];
}

export interface DataElementGroup extends DHIS2Resource {
    dataElements?: { id: string; }[];
}

export interface OrganisationUnit extends DHIS2Resource {
    path?: string;
    level?: number;
    organisationUnitGroups?: OrganisationUnitGroup[];
    children: OrganisationUnit[];
    parent?: OrganisationUnit;
    ancestors?: OrganisationUnit[];

}

export interface OrganisationUnitGroup extends DHIS2Resource {
    organisationUnits: OrganisationUnit[];
}

export interface OrganisationUnitLevel extends DHIS2Resource {
    level?: number;
}

export interface Legend extends DHIS2Resource {
    startValue: number;
    endValue: number;
    color: string;


}

export interface LegendSet extends DHIS2Resource {
    id: string;
    name: string;
    legends: Legend[];
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

export interface Option extends DHIS2Resource {
    code: string;
    legendSets?: LegendSet[];
    sortOrder?: number;
    optionSet?: OptionSet;
}

export interface OptionGroup extends DHIS2Resource {
    optionSet: OptionSet;
    options: Option[];
}

export interface OptionSet extends DHIS2Resource {
    options?: Option[];
    valueType?: DHIS2ValueType;
}


export interface Program extends DHIS2Resource {
    trackedEntityType?: TrackedEntityType;
    programType?: string;
    programStages?: ProgramStage[];
    programTrackedEntityAttributes?: {
        trackedEntityAttribute: TrackedEntityAttribute;
        program: Program

    };
}

export interface ProgramRuleAction extends DHIS2Resource{
   content?: string;
   displayContent?: string;
   programRuleActionType?: string;
   evaluationTime?: string;
   programRule: ProgramRule;
   evaluationEnvironments: string[];

}

export interface ProgramRule extends DHIS2Resource {
    description?: string;
    condition?: string;
    program?: Program;
    programRuleActions?: ProgramRuleAction[];
}


export interface ProgramStageSection {
   displayFormName?: string;
   sortOrder?: number;
   programStage?: ProgramStage;
   dataElements?: DataElement[];
   programIndicators?: ProgramIndicator[];
}

export interface ProgramStageDataElements {
    dataElement: DataElement;
    compulsory?: boolean;
    allowProvidedElsewhere?: boolean;
    displayInReports?: boolean;
    sortOrder?: number;
    programStageSection: ProgramStageSection;
    programStage?: ProgramStage;
}

export interface ProgramStage extends DHIS2Resource {
    program?: Program;
    programStageDataElements?: ProgramStageDataElements[];
    programStageSections?: ProgramStageSection[];
    repeatable?: boolean;
}


export interface AnalyticsPeriodBoundaries extends DHIS2Resource {
    boundaryTarget?: string;
    analyticsPeriodBoundaryType?: string;
}

export interface ProgramIndicator extends DHIS2Resource {
    program: Program;
    programIndicatorGroups: { id: string }[];
    analyticsPeriodBoundaries: AnalyticsPeriodBoundaries[];
}

export interface Indicator extends DHIS2Resource {
    indicatorType: { id: string };
    indicatorGroups: { id: string }[];
    legendSets: { id: string }[];
    displayNumeratorDescription: string;
    displayDenominatorDescription: string;
    numeratorDescription: string;
    denominatorDescription: string;
    numerator: string;
    denominator: string;
}
