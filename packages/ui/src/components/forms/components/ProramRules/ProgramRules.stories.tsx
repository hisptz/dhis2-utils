import {Story} from "@storybook/react"
import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Button} from '@dhis2/ui'
import {FieldProgramRule, FieldProgramRuleChildrenProps, ProgramRuleProvider, ProgramRuleProviderProps} from "."
import {Program, ProgramRule, uid} from "@hisptz/dhis2-utils";
import {RHFDHIS2FormField, RHFDHIS2FormFieldProps} from "../react-hook-form-fields";

const Template: Story<ProgramRuleProviderProps> = (args) => <ProgramRuleProvider {...args} />

const fields = [
    {
        "sortOrder": 1,
        "mandatory": false,
        "trackedEntityAttribute": {
            "valueType": "TEXT",
            "id": "w75KJ2mc4zz",
            "attributeValues": []
        }
    },
    {
        "sortOrder": 2,
        "mandatory": false,
        "trackedEntityAttribute": {
            "valueType": "TEXT",
            "id": "zDhUuAYrxNC",
            "attributeValues": [],
            "optionSet": {
                "options": [
                    {
                        "name": "Yes",
                        "code": "yes",
                        "id": "yes"
                    },
                    {
                        "name": "No",
                        "code": "no",
                        "id": "id"
                    },
                ]
            }
        }
    },
    {
        "sortOrder": 3,
        "mandatory": false,
        "trackedEntityAttribute": {
            "valueType": "TEXT",
            "optionSet": {
                "options": [
                    {
                        "code": "Male",
                        "name": "Male",
                        "id": "rBvjJYbMCVx"
                    },
                    {
                        "code": "Female",
                        "name": "Female",
                        "id": "Mnp3oXrpAbK"
                    }
                ]
            },
            "id": "cejWyOfXge6",
            "attributeValues": []
        }
    },
    {
        "sortOrder": 4,
        "mandatory": false,
        "trackedEntityAttribute": {
            "valueType": "TEXT",
            "id": "lZGmxYbs97q",
            "attributeValues": []
        }
    }
].map((field) => ({
    valueType: field.trackedEntityAttribute.valueType,
    name: field.trackedEntityAttribute.id,
    label: field.trackedEntityAttribute.id,
    optionSet: field.trackedEntityAttribute.optionSet
})) as unknown as RHFDHIS2FormFieldProps[]

export const Default = Template.bind({});
Default.args = {
    program: {
        "programRuleVariables": [
            {
                "name": "apgarscore",
                "program": {
                    "id": "IpHINAT79UW"
                },
                "dataElement": {
                    "id": "a3kGcGDCuk6"
                },
                "useCodeForOptionSet": false,
                "id": "g2GooOydipB",
                "programRuleVariableSourceType": "DATAELEMENT_NEWEST_EVENT_PROGRAM"
            },
            {
                "name": "apgarcomment",
                "program": {
                    "id": "IpHINAT79UW"
                },
                "dataElement": {
                    "id": "H6uSAMO5WLD"
                },
                "useCodeForOptionSet": false,
                "id": "aKpfPKSRQnv",
                "programRuleVariableSourceType": "DATAELEMENT_NEWEST_EVENT_PROGRAM"
            }
        ],
        "id": "IpHINAT79UW",
        "programStages": [
            {
                "name": "Birth",
                "programStageDataElements": [
                    {
                        "dataElement": {
                            "name": "MCH Apgar Score",
                            "formName": "Apgar Score",
                            "valueType": "NUMBER",
                            "displayName": "MCH Apgar Score",
                            "id": "a3kGcGDCuk6"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Apgar comment",
                            "formName": "Apgar comment",
                            "valueType": "LONG_TEXT",
                            "displayName": "MCH Apgar comment",
                            "id": "H6uSAMO5WLD"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Weight (g)",
                            "formName": "Weight (g)",
                            "valueType": "NUMBER",
                            "displayName": "MCH Weight (g)",
                            "id": "UXz7xuGCEhU"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH ARV at birth",
                            "formName": "ARV at birth",
                            "valueType": "TEXT",
                            "optionSet": {
                                "options": [
                                    {
                                        "code": "NVP only",
                                        "name": "NVP only",
                                        "id": "Cd0gtHGmlwS"
                                    },
                                    {
                                        "code": "Others",
                                        "name": "Others",
                                        "id": "ww8JVblo4SI"
                                    }
                                ]
                            },
                            "displayName": "MCH ARV at birth",
                            "id": "wQLfBvPrXqq"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH BCG dose",
                            "formName": "BCG dose",
                            "valueType": "BOOLEAN",
                            "displayName": "MCH BCG dose",
                            "id": "bx6fsa0t90x"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH OPV dose",
                            "formName": "OPV dose",
                            "valueType": "TEXT",
                            "optionSet": {
                                "options": [
                                    {
                                        "code": "0",
                                        "name": "Dose 0",
                                        "id": "sXfZuRdvhl5"
                                    },
                                    {
                                        "code": "1",
                                        "name": "Dose 1",
                                        "id": "lFFqylGiWLk"
                                    },
                                    {
                                        "code": "2",
                                        "name": "Dose 2",
                                        "id": "Xr0M5yEhtpT"
                                    },
                                    {
                                        "code": "3",
                                        "name": "Dose 3",
                                        "id": "VBGXfSXgJzv"
                                    }
                                ]
                            },
                            "displayName": "MCH OPV dose",
                            "id": "ebaJjqltK5N"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Infant Feeding",
                            "formName": "Infant Feeding",
                            "valueType": "TEXT",
                            "optionSet": {
                                "options": [
                                    {
                                        "code": "Exclusive",
                                        "name": "Exclusive",
                                        "id": "bS16xfd2E1F"
                                    },
                                    {
                                        "code": "Replacement",
                                        "name": "Replacement",
                                        "id": "fLCgjvxrw4c"
                                    },
                                    {
                                        "code": "Mixed",
                                        "name": "Mixed",
                                        "id": "odMfnhhpjUj"
                                    }
                                ]
                            },
                            "displayName": "MCH Infant Feeding",
                            "id": "X8zyunlgUfM"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "Birth certificate",
                            "valueType": "FILE_RESOURCE",
                            "displayName": "Birth certificate",
                            "id": "uf3svrmp8Oj"
                        },
                        "compulsory": false
                    }
                ],
                "id": "A03MvHHogjR",
                "programStageSections": []
            },
            {
                "name": "Baby Postnatal",
                "programStageDataElements": [
                    {
                        "dataElement": {
                            "name": "MCH Infant Weight  (g)",
                            "formName": "Infant Weight (g)",
                            "valueType": "NUMBER",
                            "displayName": "MCH Infant Weight  (g)",
                            "id": "GQY2lXrypjO"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Infant Feeding",
                            "formName": "Infant Feeding",
                            "valueType": "TEXT",
                            "optionSet": {
                                "options": [
                                    {
                                        "code": "Exclusive",
                                        "name": "Exclusive",
                                        "id": "bS16xfd2E1F"
                                    },
                                    {
                                        "code": "Replacement",
                                        "name": "Replacement",
                                        "id": "fLCgjvxrw4c"
                                    },
                                    {
                                        "code": "Mixed",
                                        "name": "Mixed",
                                        "id": "odMfnhhpjUj"
                                    }
                                ]
                            },
                            "displayName": "MCH Infant Feeding",
                            "id": "X8zyunlgUfM"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Measles dose",
                            "formName": "Measles dose",
                            "valueType": "BOOLEAN",
                            "displayName": "MCH Measles dose",
                            "id": "FqlgKAG8HOu"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Penta dose",
                            "formName": "Penta dose",
                            "valueType": "TEXT",
                            "optionSet": {
                                "options": [
                                    {
                                        "code": "0",
                                        "name": "Dose 0",
                                        "id": "sXfZuRdvhl5"
                                    },
                                    {
                                        "code": "1",
                                        "name": "Dose 1",
                                        "id": "lFFqylGiWLk"
                                    },
                                    {
                                        "code": "2",
                                        "name": "Dose 2",
                                        "id": "Xr0M5yEhtpT"
                                    },
                                    {
                                        "code": "3",
                                        "name": "Dose 3",
                                        "id": "VBGXfSXgJzv"
                                    }
                                ]
                            },
                            "displayName": "MCH Penta dose",
                            "id": "vTUhAUZFoys"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Yellow fever dose",
                            "formName": "Yellow fever dose",
                            "valueType": "BOOLEAN",
                            "displayName": "MCH Yellow fever dose",
                            "id": "rxBfISxXS2U"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH IPT dose",
                            "formName": "IPT dose",
                            "valueType": "TEXT",
                            "optionSet": {
                                "options": [
                                    {
                                        "code": "IPT 1",
                                        "name": "IPT 1",
                                        "id": "BszlRcyvU2p"
                                    },
                                    {
                                        "code": "IPT 2",
                                        "name": "IPT 2",
                                        "id": "pXDp3sN3xJ7"
                                    },
                                    {
                                        "code": "IPT 3",
                                        "name": "IPT 3",
                                        "id": "KGtyXqAprCc"
                                    },
                                    {
                                        "code": "On CTX",
                                        "name": "On CTX",
                                        "id": "lqMX3VoXyDs"
                                    }
                                ]
                            },
                            "displayName": "MCH IPT dose",
                            "id": "lNNb3truQoi"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH DPT dose",
                            "formName": "DPT dose",
                            "valueType": "TEXT",
                            "optionSet": {
                                "options": [
                                    {
                                        "code": "1",
                                        "name": "Dose 1",
                                        "id": "HEjqfmniZAr"
                                    },
                                    {
                                        "code": "2",
                                        "name": "Dose 2",
                                        "id": "RqLFM2C8RnE"
                                    },
                                    {
                                        "code": "3",
                                        "name": "Dose 3",
                                        "id": "lbb3GURUxGo"
                                    }
                                ]
                            },
                            "displayName": "MCH DPT dose",
                            "id": "pOe0ogW4OWd"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Vit A",
                            "formName": "Vit A",
                            "valueType": "BOOLEAN",
                            "displayName": "MCH Vit A",
                            "id": "HLmTEmupdX0"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Infant HIV Test Result",
                            "formName": "Infant HIV Test Result",
                            "valueType": "TEXT",
                            "optionSet": {
                                "options": [
                                    {
                                        "code": "Positive",
                                        "name": "Positive",
                                        "id": "fWI0UiNZgMy"
                                    },
                                    {
                                        "code": "Negative",
                                        "name": "Negative",
                                        "id": "IRW6CQw66J7"
                                    },
                                    {
                                        "code": "Postive √",
                                        "name": "Positive (Confirmed)",
                                        "id": "JWyCKF6i9l1"
                                    },
                                    {
                                        "code": "Negative-Conf",
                                        "name": "Negative (Confirmed)",
                                        "id": "nzR5kXqejCc"
                                    }
                                ]
                            },
                            "displayName": "MCH Infant HIV Test Result",
                            "id": "cYGaxwK615G"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH HIV Test Type",
                            "formName": "HIV Test Type",
                            "valueType": "TEXT",
                            "optionSet": {
                                "options": [
                                    {
                                        "code": "Rapid",
                                        "name": "Rapid",
                                        "id": "HEqorVvFV8k"
                                    },
                                    {
                                        "code": "PCR",
                                        "name": "PCR",
                                        "id": "vOSo0R6LuI1"
                                    }
                                ]
                            },
                            "displayName": "MCH HIV Test Type",
                            "id": "hDZbpskhqDd"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Child ARVs",
                            "formName": "Child ARVs",
                            "valueType": "TEXT",
                            "optionSet": {
                                "options": [
                                    {
                                        "code": "NVP Only",
                                        "name": "NVP Only",
                                        "id": "NXyMwAwxNap"
                                    },
                                    {
                                        "code": "TDF/3TC/NVP - 1",
                                        "name": "TDF/3TC/NVP - 1",
                                        "id": "OZH6GLUufaX"
                                    },
                                    {
                                        "code": "TDF/3TC/EFV - 1",
                                        "name": "TDF/3TC/EFV - 1",
                                        "id": "fpfMGr05G23"
                                    },
                                    {
                                        "code": "AZT/3TC/NVP - 1",
                                        "name": "AZT/3TC/NVP - 1",
                                        "id": "snKkbSbKQFi"
                                    },
                                    {
                                        "code": "AZT/3TC/EFV - 1",
                                        "name": "AZT/3TC/EFV - 1",
                                        "id": "QAr1LjJB7hV"
                                    },
                                    {
                                        "code": "TDF/3TC/ATV/r - 2",
                                        "name": "TDF/3TC/ATV/r - 2",
                                        "id": "J8tdCrlmoyp"
                                    },
                                    {
                                        "code": "TDF/3TC/LPV/r - 2",
                                        "name": "TDF/3TC/LPV/r - 2",
                                        "id": "e3Y43oVooNx"
                                    },
                                    {
                                        "code": "AZT/3TC/ATV/r - 2",
                                        "name": "AZT/3TC/ATV/r - 2",
                                        "id": "ehhkhM0cmbA"
                                    },
                                    {
                                        "code": "AZT/3TC/LPV/r - 2",
                                        "name": "AZT/3TC/LPV/r - 2",
                                        "id": "bswStRDzLny"
                                    },
                                    {
                                        "code": "AZT/ddl/LPV/r - 2",
                                        "name": "AZT/ddl/LPV/r - 2",
                                        "id": "wGQbXCz6qgd"
                                    },
                                    {
                                        "code": "ABC/ddl/LPV/r -2",
                                        "name": "ABC/ddl/LPV/r -2",
                                        "id": "bopJ9PaLnAZ"
                                    },
                                    {
                                        "code": "Other 1st line",
                                        "name": "Other 1st line",
                                        "id": "ARN7cNTxlRA"
                                    },
                                    {
                                        "code": "Other 2nd line",
                                        "name": "Other 2nd line",
                                        "id": "OP2n2kZ3eWw"
                                    }
                                ]
                            },
                            "displayName": "MCH Child ARVs",
                            "id": "sj3j9Hwc7so"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Septrin Given",
                            "formName": "Septrin Given",
                            "valueType": "TEXT",
                            "optionSet": {
                                "options": [
                                    {
                                        "code": "Yes",
                                        "name": "Yes",
                                        "id": "AAgDQGRuOHB"
                                    },
                                    {
                                        "code": "No",
                                        "name": "No",
                                        "id": "kzKxayEMqZB"
                                    },
                                    {
                                        "code": "Unknown",
                                        "name": "Unknown",
                                        "id": "T6ZEg0zYzbL"
                                    }
                                ]
                            },
                            "displayName": "MCH Septrin Given",
                            "id": "aei1xRjSU2l"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Results given to caretaker",
                            "formName": "Results given to caretaker",
                            "valueType": "TEXT",
                            "optionSet": {
                                "options": [
                                    {
                                        "code": "Yes",
                                        "name": "Yes",
                                        "id": "AAgDQGRuOHB"
                                    },
                                    {
                                        "code": "No",
                                        "name": "No",
                                        "id": "kzKxayEMqZB"
                                    },
                                    {
                                        "code": "Unknown",
                                        "name": "Unknown",
                                        "id": "T6ZEg0zYzbL"
                                    }
                                ]
                            },
                            "displayName": "MCH Results given to caretaker",
                            "id": "BeynU4L6VCQ"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Visit Comment",
                            "formName": "Visit comment (optional)",
                            "valueType": "LONG_TEXT",
                            "displayName": "MCH Visit Comment",
                            "id": "OuJ6sgPyAbC"
                        },
                        "compulsory": false
                    }
                ],
                "id": "ZzYYXq4fJie",
                "programStageSections": []
            }
        ],
        "programSections": [],
        "programTrackedEntityAttributes": [
            {
                "sortOrder": 1,
                "mandatory": false,
                "trackedEntityAttribute": {
                    "valueType": "TEXT",
                    "id": "w75KJ2mc4zz",
                    "attributeValues": []
                }
            },
            {
                "sortOrder": 2,
                "mandatory": false,
                "trackedEntityAttribute": {
                    "valueType": "TEXT",
                    "id": "zDhUuAYrxNC",
                    "attributeValues": []
                }
            },
            {
                "sortOrder": 3,
                "mandatory": false,
                "trackedEntityAttribute": {
                    "valueType": "TEXT",
                    "optionSet": {
                        "options": [
                            {
                                "code": "Male",
                                "name": "Male",
                                "id": "rBvjJYbMCVx"
                            },
                            {
                                "code": "Female",
                                "name": "Female",
                                "id": "Mnp3oXrpAbK"
                            }
                        ]
                    },
                    "id": "cejWyOfXge6",
                    "attributeValues": []
                }
            },
            {
                "sortOrder": 4,
                "mandatory": false,
                "trackedEntityAttribute": {
                    "valueType": "TEXT",
                    "id": "lZGmxYbs97q",
                    "attributeValues": []
                }
            }
        ]
    } as unknown as Program,
    programRules: [
        {
            "programRuleActions": [
                {
                    "programRuleActionType": "SHOWWARNING",
                    "dataElement": {
                        "id": "H6uSAMO5WLD"
                    },
                    "content": "It is suggested that an explanation is provided when the Apgar score is below 4",
                    "id": "v434s5YPDcP"
                }
            ],
            "condition": "#{apgarscore} >= 0 && #{apgarscore} < 4 && #{apgarcomment} == ''",
            "id": "NAgjOfWMXg6"
        },
        {
            "programRuleActions": [
                {
                    "programRuleActionType": "SHOWERROR",
                    "dataElement": {
                        "id": "a3kGcGDCuk6"
                    },
                    "content": "If the apgar score is below zero, an explanation must be provided.",
                    "id": "t944GaMzNbs"
                }
            ],
            "condition": "#{apgarscore} <0 && #{apgarcomment} == ''",
            "id": "tTPMkizzUZg"
        },
        {
            "programRuleActions": [
                {
                    "programRuleActionType": "HIDEFIELD",
                    "dataElement": {
                        "id": "H6uSAMO5WLD"
                    },
                    "id": "iwGAWKvStTt"
                }
            ],
            "condition": "#{apgarscore} > 7",
            "id": "ppdTpuQC7Q5"
        }
    ] as unknown as ProgramRule[],
    attributes: fields.map(({name}) => name),
    children: (<form style={{display: "flex", gap: 16, alignItems: "center", flexDirection: "column"}}>
        {
            fields.map((field: JSX.IntrinsicAttributes & RHFDHIS2FormFieldProps) => (
                <FieldProgramRule name={field.name} optionSet={field.optionSet}>
                    {(props: FieldProgramRuleChildrenProps) => (
                        <RHFDHIS2FormField key={`${field.name}`} {...field} {...props} />
                    )}
                </FieldProgramRule>))
        }
        <Button type="submit">Submit</Button>
    </form>)

}

export const CustomRules = Template.bind({});
CustomRules.args = {
    program: {
        "programRuleVariables": [
            {
                "name": "apgarscore",
                "program": {
                    "id": "IpHINAT79UW"
                },
                "dataElement": {
                    "id": "a3kGcGDCuk6"
                },
                "useCodeForOptionSet": false,
                "id": "g2GooOydipB",
                "programRuleVariableSourceType": "DATAELEMENT_NEWEST_EVENT_PROGRAM"
            },
            {
                "name": "apgarcomment",
                "program": {
                    "id": "IpHINAT79UW"
                },
                "dataElement": {
                    "id": "H6uSAMO5WLD"
                },
                "useCodeForOptionSet": false,
                "id": "aKpfPKSRQnv",
                "programRuleVariableSourceType": "DATAELEMENT_NEWEST_EVENT_PROGRAM"
            }
        ],
        "id": "IpHINAT79UW",
        "programStages": [
            {
                "name": "Birth",
                "programStageDataElements": [
                    {
                        "dataElement": {
                            "name": "MCH Apgar Score",
                            "formName": "Apgar Score",
                            "valueType": "NUMBER",
                            "displayName": "MCH Apgar Score",
                            "id": "a3kGcGDCuk6"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Apgar comment",
                            "formName": "Apgar comment",
                            "valueType": "LONG_TEXT",
                            "displayName": "MCH Apgar comment",
                            "id": "H6uSAMO5WLD"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Weight (g)",
                            "formName": "Weight (g)",
                            "valueType": "NUMBER",
                            "displayName": "MCH Weight (g)",
                            "id": "UXz7xuGCEhU"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH ARV at birth",
                            "formName": "ARV at birth",
                            "valueType": "TEXT",
                            "optionSet": {
                                "options": [
                                    {
                                        "code": "NVP only",
                                        "name": "NVP only",
                                        "id": "Cd0gtHGmlwS"
                                    },
                                    {
                                        "code": "Others",
                                        "name": "Others",
                                        "id": "ww8JVblo4SI"
                                    }
                                ]
                            },
                            "displayName": "MCH ARV at birth",
                            "id": "wQLfBvPrXqq"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH BCG dose",
                            "formName": "BCG dose",
                            "valueType": "BOOLEAN",
                            "displayName": "MCH BCG dose",
                            "id": "bx6fsa0t90x"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH OPV dose",
                            "formName": "OPV dose",
                            "valueType": "TEXT",
                            "optionSet": {
                                "options": [
                                    {
                                        "code": "0",
                                        "name": "Dose 0",
                                        "id": "sXfZuRdvhl5"
                                    },
                                    {
                                        "code": "1",
                                        "name": "Dose 1",
                                        "id": "lFFqylGiWLk"
                                    },
                                    {
                                        "code": "2",
                                        "name": "Dose 2",
                                        "id": "Xr0M5yEhtpT"
                                    },
                                    {
                                        "code": "3",
                                        "name": "Dose 3",
                                        "id": "VBGXfSXgJzv"
                                    }
                                ]
                            },
                            "displayName": "MCH OPV dose",
                            "id": "ebaJjqltK5N"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Infant Feeding",
                            "formName": "Infant Feeding",
                            "valueType": "TEXT",
                            "optionSet": {
                                "options": [
                                    {
                                        "code": "Exclusive",
                                        "name": "Exclusive",
                                        "id": "bS16xfd2E1F"
                                    },
                                    {
                                        "code": "Replacement",
                                        "name": "Replacement",
                                        "id": "fLCgjvxrw4c"
                                    },
                                    {
                                        "code": "Mixed",
                                        "name": "Mixed",
                                        "id": "odMfnhhpjUj"
                                    }
                                ]
                            },
                            "displayName": "MCH Infant Feeding",
                            "id": "X8zyunlgUfM"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "Birth certificate",
                            "valueType": "FILE_RESOURCE",
                            "displayName": "Birth certificate",
                            "id": "uf3svrmp8Oj"
                        },
                        "compulsory": false
                    }
                ],
                "id": "A03MvHHogjR",
                "programStageSections": []
            },
            {
                "name": "Baby Postnatal",
                "programStageDataElements": [
                    {
                        "dataElement": {
                            "name": "MCH Infant Weight  (g)",
                            "formName": "Infant Weight (g)",
                            "valueType": "NUMBER",
                            "displayName": "MCH Infant Weight  (g)",
                            "id": "GQY2lXrypjO"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Infant Feeding",
                            "formName": "Infant Feeding",
                            "valueType": "TEXT",
                            "optionSet": {
                                "options": [
                                    {
                                        "code": "Exclusive",
                                        "name": "Exclusive",
                                        "id": "bS16xfd2E1F"
                                    },
                                    {
                                        "code": "Replacement",
                                        "name": "Replacement",
                                        "id": "fLCgjvxrw4c"
                                    },
                                    {
                                        "code": "Mixed",
                                        "name": "Mixed",
                                        "id": "odMfnhhpjUj"
                                    }
                                ]
                            },
                            "displayName": "MCH Infant Feeding",
                            "id": "X8zyunlgUfM"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Measles dose",
                            "formName": "Measles dose",
                            "valueType": "BOOLEAN",
                            "displayName": "MCH Measles dose",
                            "id": "FqlgKAG8HOu"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Penta dose",
                            "formName": "Penta dose",
                            "valueType": "TEXT",
                            "optionSet": {
                                "options": [
                                    {
                                        "code": "0",
                                        "name": "Dose 0",
                                        "id": "sXfZuRdvhl5"
                                    },
                                    {
                                        "code": "1",
                                        "name": "Dose 1",
                                        "id": "lFFqylGiWLk"
                                    },
                                    {
                                        "code": "2",
                                        "name": "Dose 2",
                                        "id": "Xr0M5yEhtpT"
                                    },
                                    {
                                        "code": "3",
                                        "name": "Dose 3",
                                        "id": "VBGXfSXgJzv"
                                    }
                                ]
                            },
                            "displayName": "MCH Penta dose",
                            "id": "vTUhAUZFoys"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Yellow fever dose",
                            "formName": "Yellow fever dose",
                            "valueType": "BOOLEAN",
                            "displayName": "MCH Yellow fever dose",
                            "id": "rxBfISxXS2U"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH IPT dose",
                            "formName": "IPT dose",
                            "valueType": "TEXT",
                            "optionSet": {
                                "options": [
                                    {
                                        "code": "IPT 1",
                                        "name": "IPT 1",
                                        "id": "BszlRcyvU2p"
                                    },
                                    {
                                        "code": "IPT 2",
                                        "name": "IPT 2",
                                        "id": "pXDp3sN3xJ7"
                                    },
                                    {
                                        "code": "IPT 3",
                                        "name": "IPT 3",
                                        "id": "KGtyXqAprCc"
                                    },
                                    {
                                        "code": "On CTX",
                                        "name": "On CTX",
                                        "id": "lqMX3VoXyDs"
                                    }
                                ]
                            },
                            "displayName": "MCH IPT dose",
                            "id": "lNNb3truQoi"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH DPT dose",
                            "formName": "DPT dose",
                            "valueType": "TEXT",
                            "optionSet": {
                                "options": [
                                    {
                                        "code": "1",
                                        "name": "Dose 1",
                                        "id": "HEjqfmniZAr"
                                    },
                                    {
                                        "code": "2",
                                        "name": "Dose 2",
                                        "id": "RqLFM2C8RnE"
                                    },
                                    {
                                        "code": "3",
                                        "name": "Dose 3",
                                        "id": "lbb3GURUxGo"
                                    }
                                ]
                            },
                            "displayName": "MCH DPT dose",
                            "id": "pOe0ogW4OWd"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Vit A",
                            "formName": "Vit A",
                            "valueType": "BOOLEAN",
                            "displayName": "MCH Vit A",
                            "id": "HLmTEmupdX0"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Infant HIV Test Result",
                            "formName": "Infant HIV Test Result",
                            "valueType": "TEXT",
                            "optionSet": {
                                "options": [
                                    {
                                        "code": "Positive",
                                        "name": "Positive",
                                        "id": "fWI0UiNZgMy"
                                    },
                                    {
                                        "code": "Negative",
                                        "name": "Negative",
                                        "id": "IRW6CQw66J7"
                                    },
                                    {
                                        "code": "Postive √",
                                        "name": "Positive (Confirmed)",
                                        "id": "JWyCKF6i9l1"
                                    },
                                    {
                                        "code": "Negative-Conf",
                                        "name": "Negative (Confirmed)",
                                        "id": "nzR5kXqejCc"
                                    }
                                ]
                            },
                            "displayName": "MCH Infant HIV Test Result",
                            "id": "cYGaxwK615G"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH HIV Test Type",
                            "formName": "HIV Test Type",
                            "valueType": "TEXT",
                            "optionSet": {
                                "options": [
                                    {
                                        "code": "Rapid",
                                        "name": "Rapid",
                                        "id": "HEqorVvFV8k"
                                    },
                                    {
                                        "code": "PCR",
                                        "name": "PCR",
                                        "id": "vOSo0R6LuI1"
                                    }
                                ]
                            },
                            "displayName": "MCH HIV Test Type",
                            "id": "hDZbpskhqDd"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Child ARVs",
                            "formName": "Child ARVs",
                            "valueType": "TEXT",
                            "optionSet": {
                                "options": [
                                    {
                                        "code": "NVP Only",
                                        "name": "NVP Only",
                                        "id": "NXyMwAwxNap"
                                    },
                                    {
                                        "code": "TDF/3TC/NVP - 1",
                                        "name": "TDF/3TC/NVP - 1",
                                        "id": "OZH6GLUufaX"
                                    },
                                    {
                                        "code": "TDF/3TC/EFV - 1",
                                        "name": "TDF/3TC/EFV - 1",
                                        "id": "fpfMGr05G23"
                                    },
                                    {
                                        "code": "AZT/3TC/NVP - 1",
                                        "name": "AZT/3TC/NVP - 1",
                                        "id": "snKkbSbKQFi"
                                    },
                                    {
                                        "code": "AZT/3TC/EFV - 1",
                                        "name": "AZT/3TC/EFV - 1",
                                        "id": "QAr1LjJB7hV"
                                    },
                                    {
                                        "code": "TDF/3TC/ATV/r - 2",
                                        "name": "TDF/3TC/ATV/r - 2",
                                        "id": "J8tdCrlmoyp"
                                    },
                                    {
                                        "code": "TDF/3TC/LPV/r - 2",
                                        "name": "TDF/3TC/LPV/r - 2",
                                        "id": "e3Y43oVooNx"
                                    },
                                    {
                                        "code": "AZT/3TC/ATV/r - 2",
                                        "name": "AZT/3TC/ATV/r - 2",
                                        "id": "ehhkhM0cmbA"
                                    },
                                    {
                                        "code": "AZT/3TC/LPV/r - 2",
                                        "name": "AZT/3TC/LPV/r - 2",
                                        "id": "bswStRDzLny"
                                    },
                                    {
                                        "code": "AZT/ddl/LPV/r - 2",
                                        "name": "AZT/ddl/LPV/r - 2",
                                        "id": "wGQbXCz6qgd"
                                    },
                                    {
                                        "code": "ABC/ddl/LPV/r -2",
                                        "name": "ABC/ddl/LPV/r -2",
                                        "id": "bopJ9PaLnAZ"
                                    },
                                    {
                                        "code": "Other 1st line",
                                        "name": "Other 1st line",
                                        "id": "ARN7cNTxlRA"
                                    },
                                    {
                                        "code": "Other 2nd line",
                                        "name": "Other 2nd line",
                                        "id": "OP2n2kZ3eWw"
                                    }
                                ]
                            },
                            "displayName": "MCH Child ARVs",
                            "id": "sj3j9Hwc7so"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Septrin Given",
                            "formName": "Septrin Given",
                            "valueType": "TEXT",
                            "optionSet": {
                                "options": [
                                    {
                                        "code": "Yes",
                                        "name": "Yes",
                                        "id": "AAgDQGRuOHB"
                                    },
                                    {
                                        "code": "No",
                                        "name": "No",
                                        "id": "kzKxayEMqZB"
                                    },
                                    {
                                        "code": "Unknown",
                                        "name": "Unknown",
                                        "id": "T6ZEg0zYzbL"
                                    }
                                ]
                            },
                            "displayName": "MCH Septrin Given",
                            "id": "aei1xRjSU2l"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Results given to caretaker",
                            "formName": "Results given to caretaker",
                            "valueType": "TEXT",
                            "optionSet": {
                                "options": [
                                    {
                                        "code": "Yes",
                                        "name": "Yes",
                                        "id": "AAgDQGRuOHB"
                                    },
                                    {
                                        "code": "No",
                                        "name": "No",
                                        "id": "kzKxayEMqZB"
                                    },
                                    {
                                        "code": "Unknown",
                                        "name": "Unknown",
                                        "id": "T6ZEg0zYzbL"
                                    }
                                ]
                            },
                            "displayName": "MCH Results given to caretaker",
                            "id": "BeynU4L6VCQ"
                        },
                        "compulsory": false
                    },
                    {
                        "dataElement": {
                            "name": "MCH Visit Comment",
                            "formName": "Visit comment (optional)",
                            "valueType": "LONG_TEXT",
                            "displayName": "MCH Visit Comment",
                            "id": "OuJ6sgPyAbC"
                        },
                        "compulsory": false
                    }
                ],
                "id": "ZzYYXq4fJie",
                "programStageSections": []
            }
        ],
        "programSections": [],
        "programTrackedEntityAttributes": [
            {
                "sortOrder": 1,
                "mandatory": false,
                "trackedEntityAttribute": {
                    "valueType": "TEXT",
                    "id": "w75KJ2mc4zz",
                    "attributeValues": []
                }
            },
            {
                "sortOrder": 2,
                "mandatory": false,
                "trackedEntityAttribute": {
                    "valueType": "TEXT",
                    "id": "zDhUuAYrxNC",
                    "attributeValues": []
                }
            },
            {
                "sortOrder": 3,
                "mandatory": false,
                "trackedEntityAttribute": {
                    "valueType": "TEXT",
                    "optionSet": {
                        "options": [
                            {
                                "code": "Male",
                                "name": "Male",
                                "id": "rBvjJYbMCVx"
                            },
                            {
                                "code": "Female",
                                "name": "Female",
                                "id": "Mnp3oXrpAbK"
                            }
                        ]
                    },
                    "id": "cejWyOfXge6",
                    "attributeValues": []
                }
            },
            {
                "sortOrder": 4,
                "mandatory": false,
                "trackedEntityAttribute": {
                    "valueType": "TEXT",
                    "id": "lZGmxYbs97q",
                    "attributeValues": []
                }
            }
        ]
    } as unknown as Program,
    customRules: [
        {
            id: "hide_custom_field",
            triggers: [
                {
                    id: "zDhUuAYrxNC",
                    type: "TEI_ATTRIBUTE",
                    name: "zDhUuAYrxNC"
                }
            ],
            actions: [
                {
                    id: "hide_field",
                    type: "HIDEFIELD",
                    target: {
                        id: "w75KJ2mc4zz",
                        type: "ATTRIBUTE"
                    }
                },
                {
                    id: "show_warning",
                    type: "SHOWWARNING",
                    content: "This is a warning triggered by a program rule",
                    target: {
                        id: "cejWyOfXge6",
                        type: "ATTRIBUTE"
                    }
                },
            ],
            condition: ({triggerValues}) => {
                return triggerValues["zDhUuAYrxNC"] === 'yes'
            },
            targets: [
                {
                    id: "w75KJ2mc4zz",
                    type: "ATTRIBUTE"
                }, {
                    id: "cejWyOfXge6",
                    type: "ATTRIBUTE"
                },
            ]
        }
    ],
    attributes: fields.map(({name}) => name),
    isEnrollmentForm: true,
    programRules: [],
    trackedEntity: {trackedEntityInstance: uid(), id: uid()},
    children: (<form style={{display: "flex", gap: 16, alignItems: "center", flexDirection: "column"}}>

        {
            fields.map((field: JSX.IntrinsicAttributes & RHFDHIS2FormFieldProps) => (
                <FieldProgramRule name={field.name} optionSet={field.optionSet}>
                    {(props: FieldProgramRuleChildrenProps) => (
                        !props.hidden ? (<RHFDHIS2FormField key={`${field.name}`} {...field} {...props} />) : null
                    )}
                </FieldProgramRule>))
        }
        <Button type="submit">Submit</Button>
    </form>)
}


export default {
    title: "Form/Program rules",
    component: ProgramRuleProvider,
    decorators: [
        (Story: any) => {
            const form = useForm();
            const onSubmit = (data: any) => {
                console.log(data);
            }

            return (
                <FormProvider {...form}>
                    <Story/>
                </FormProvider>
            )

        }
    ]
}
