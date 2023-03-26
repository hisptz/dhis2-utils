export type VALUE_TYPE =
    | "AGE"
    | "EMAIL"
    | "URL"
    | "FILE_RESOURCE"
    | "IMAGE"
    | "INTEGER"
    | "TRUE_ONLY"
    | "TEXT"
    | "NUMBER"
    | "DATE"
    | "LONG_TEXT"
    | "LEGEND_DEFINITION"
    | "LEGEND_DEFINITIONS"
    | "RICH_TEXT"
    | "LEGEND_MIN_MAX"
    | "NORMAL_LEGEND_MIN_MAX"
    | "LEVEL_LEGEND_MIN_MAX"
    | "MULTIPLE_FIELDS"
    | "PHONE_NUMBER"
    | "BOOLEAN"
    | "ORGANISATION_UNIT";

export const VALUE_TYPES: { [key: string]: { name: VALUE_TYPE; formName: string } } = {
    INTEGER: {
        name: "INTEGER",
        formName: "number",
    },
    PHONE_NUMBER: {
        name: "PHONE_NUMBER",
        formName: "tel",
    },
    EMAIL: {
        name: "EMAIL",
        formName: "email",
    },
    AGE: {
        name: "AGE",
        formName: "date",
    },
    URL: {
        name: "URL",
        formName: "url",
    },
    FILE_RESOURCE: {
        name: "FILE_RESOURCE",
        formName: "file",
    },
    TRUE_ONLY: {
        name: "TRUE_ONLY",
        formName: "checkbox",
    },
    BOOLEAN: {
        name: "BOOLEAN",
        formName: "checkbox",
    },
    TEXT: {
        name: "TEXT",
        formName: "text",
    },
    NUMBER: {
        name: "NUMBER",
        formName: "number",
    },
    DATE: {
        name: "DATE",
        formName: "date",
    },
    LONG_TEXT: {
        name: "LONG_TEXT",
        formName: "textarea",
    },
    LEGEND_DEFINITION: {
        name: "LEGEND_DEFINITION",
        formName: "legendDefinition",
    },
    LEGEND_DEFINITIONS: {
        name: "LEGEND_DEFINITIONS",
        formName: "legendDefinitions",
    },
    RICH_TEXT: {
        name: "RICH_TEXT",
        formName: "richText",
    },
    LEGEND_MIN_MAX: {
        name: "LEGEND_MIN_MAX",
        formName: "legendMinMax",
    },
    NORMAL_LEGEND_MIN_MAX: {
        name: "NORMAL_LEGEND_MIN_MAX",
        formName: "normalLegendMinMax",
    },
    LEVEL_LEGEND_MIN_MAX: {
        name: "LEVEL_LEGEND_MIN_MAX",
        formName: "levelLegendMinMax",
    },
    MULTIPLE_FIELDS: {
        name: "MULTIPLE_FIELDS",
        formName: "multipleFields",
    },
    ORG_UNIT_FIELD: {
        name: "ORGANISATION_UNIT",
        formName: "orgUnit",
    },
};
