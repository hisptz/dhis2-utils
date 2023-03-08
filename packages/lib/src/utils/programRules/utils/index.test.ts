import {
    getRuleActions,
    getRuleTargets,
    getRuleTriggers,
    getVariablesFromCondition,
    replaceConstants,
} from './evaluator';
import {forEach} from 'lodash';
import {ProgramRuleVariable, RuleAction} from "../interfaces";

const variables = [
    {
        name: 'Comorbidity_cardio_NewestInProgram',
        id: 'ArIybOJhFht',
        programRuleVariableSourceType: 'DATAELEMENT_NEWEST_EVENT_PROGRAM',
        useCodeForOptionSet: false,
        dataElement: {
            id: 'LNHAYF3qdZl',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Comorbidity_diabetes_NewestInProgram',
        id: 'AJsY2f9wKAU',
        programRuleVariableSourceType: 'DATAELEMENT_NEWEST_EVENT_PROGRAM',
        useCodeForOptionSet: false,
        dataElement: {
            id: 'TT1h0vGu5da',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Had_Covid_Previously',
        id: 'NnSxcH3O2W6',
        programRuleVariableSourceType: 'DATAELEMENT_PREVIOUS_EVENT',
        useCodeForOptionSet: true,
        dataElement: {
            id: 'LOU9t0aR0z7',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Comorbidity_malignancy',
        id: 'whQMuPhaG96',
        programRuleVariableSourceType: 'DATAELEMENT_PREVIOUS_EVENT',
        useCodeForOptionSet: false,
        dataElement: {
            id: 'xVxLMku5DMX',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'certificates_approval',
        id: 'WpsnAi0Hskl',
        programRuleVariableSourceType: 'DATAELEMENT_CURRENT_EVENT',
        useCodeForOptionSet: false,
        dataElement: {
            id: 'uufZN5iaZ84',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Defaulter',
        id: 'grYzydc1G7w',
        programRuleVariableSourceType: 'DATAELEMENT_CURRENT_EVENT',
        useCodeForOptionSet: false,
        dataElement: {
            id: 'TNzCY73Eev1',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Kundi la walengwa',
        id: 'ER4Wo4RbHgV',
        programRuleVariableSourceType: 'TEI_ATTRIBUTE',
        useCodeForOptionSet: false,
        program: {
            id: 'yDuAzyqYABS',
        },
        trackedEntityAttribute: {
            id: 'BYShzv5RE9O',
        },
    },
    {
        name: 'Birthdate',
        id: 'V0g7f4Gol8y',
        programRuleVariableSourceType: 'TEI_ATTRIBUTE',
        useCodeForOptionSet: false,
        program: {
            id: 'yDuAzyqYABS',
        },
        trackedEntityAttribute: {
            id: 'uRiIFjO4lqV',
        },
    },
    {
        name: 'Occupation',
        id: 'Iiwk4sREWNU',
        programRuleVariableSourceType: 'TEI_ATTRIBUTE',
        useCodeForOptionSet: true,
        program: {
            id: 'yDuAzyqYABS',
        },
        trackedEntityAttribute: {
            id: 'LY2bDXpNvS7',
        },
    },
    {
        name: 'Comorbidity_renal',
        id: 'qT3ko9yYUC4',
        programRuleVariableSourceType: 'DATAELEMENT_PREVIOUS_EVENT',
        useCodeForOptionSet: false,
        dataElement: {
            id: 'gW4pd818Sw8',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Last_dose',
        id: 'lWONofkUQ0W',
        programRuleVariableSourceType: 'DATAELEMENT_CURRENT_EVENT',
        useCodeForOptionSet: false,
        dataElement: {
            id: 'DSOWCIdQ8Tr',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Comorbidity_renal_NewestInProgram',
        id: 'vIvyi5hkSr7',
        programRuleVariableSourceType: 'DATAELEMENT_NEWEST_EVENT_PROGRAM',
        useCodeForOptionSet: false,
        dataElement: {
            id: 'gW4pd818Sw8',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Vaccine_type_previous',
        id: 'lOtFpbhbA5C',
        programRuleVariableSourceType: 'DATAELEMENT_PREVIOUS_EVENT',
        useCodeForOptionSet: true,
        dataElement: {
            id: 'bbnyNYD1wgS',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Vaccine_type_previous_no_code',
        id: 'TPZiFKaRvbK',
        programRuleVariableSourceType: 'DATAELEMENT_PREVIOUS_EVENT',
        useCodeForOptionSet: false,
        dataElement: {
            id: 'bbnyNYD1wgS',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Comorbidity_immunodeficiency',
        id: 'pqj0mdZcQqP',
        programRuleVariableSourceType: 'DATAELEMENT_PREVIOUS_EVENT',
        useCodeForOptionSet: true,
        dataElement: {
            id: 'MuZ9dMVXpuM',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Comorbidity_immunodeficiency_NewestInProgram',
        id: 'iMRGAbPpFyY',
        programRuleVariableSourceType: 'DATAELEMENT_NEWEST_EVENT_PROGRAM',
        useCodeForOptionSet: false,
        dataElement: {
            id: 'MuZ9dMVXpuM',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Underlying_conditions',
        id: 'PvzNLngZXbM',
        programRuleVariableSourceType: 'DATAELEMENT_CURRENT_EVENT',
        useCodeForOptionSet: true,
        dataElement: {
            id: 'bCtWZGjSWM8',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Underlying_conditions_newest_stage',
        id: 'XAMGVQljlNt',
        programRuleVariableSourceType: 'DATAELEMENT_PREVIOUS_EVENT',
        useCodeForOptionSet: true,
        dataElement: {
            id: 'bCtWZGjSWM8',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Comorbidity_other_NewestInProgram',
        id: 'gw3ZfiCVrSE',
        programRuleVariableSourceType: 'DATAELEMENT_NEWEST_EVENT_PROGRAM',
        useCodeForOptionSet: false,
        dataElement: {
            id: 'dpyQUtizp7s',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Underlying_conditions_previous',
        id: 'hsTW2pgwQRW',
        programRuleVariableSourceType: 'DATAELEMENT_PREVIOUS_EVENT',
        useCodeForOptionSet: true,
        dataElement: {
            id: 'bCtWZGjSWM8',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Dose_number',
        id: 'oM7BujikMqy',
        programRuleVariableSourceType: 'DATAELEMENT_CURRENT_EVENT',
        useCodeForOptionSet: true,
        dataElement: {
            id: 'LUIsbsm3okG',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Aina ya kitambulisho',
        id: 'NHhKu43CNa5',
        programRuleVariableSourceType: 'TEI_ATTRIBUTE',
        useCodeForOptionSet: false,
        program: {
            id: 'yDuAzyqYABS',
        },
        trackedEntityAttribute: {
            id: 'Mhj0xPZr1v3',
        },
    },
    {
        name: 'Comorbidity_other',
        id: 'FfH12rViruV',
        programRuleVariableSourceType: 'DATAELEMENT_PREVIOUS_EVENT',
        useCodeForOptionSet: false,
        dataElement: {
            id: 'dpyQUtizp7s',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Vaccine_type',
        id: 'oDhnPlnHMoh',
        programRuleVariableSourceType: 'DATAELEMENT_CURRENT_EVENT',
        useCodeForOptionSet: true,
        dataElement: {
            id: 'bbnyNYD1wgS',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Dose number',
        id: 'qchRz6R4k77',
        programRuleVariableSourceType: 'DATAELEMENT_CURRENT_EVENT',
        useCodeForOptionSet: true,
        dataElement: {
            id: 'LUIsbsm3okG',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Pregnant',
        id: 'lngdmMRLM8a',
        programRuleVariableSourceType: 'DATAELEMENT_CURRENT_EVENT',
        useCodeForOptionSet: true,
        dataElement: {
            id: 'BfNZcj99yz4',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Region',
        id: 'Zjhv8IhLppW',
        programRuleVariableSourceType: 'TEI_ATTRIBUTE',
        useCodeForOptionSet: false,
        program: {
            id: 'yDuAzyqYABS',
        },
        trackedEntityAttribute: {
            id: 'AGIoSefmGtX',
        },
    },
    {
        name: 'Comorbidity_cardio',
        id: 'bW0NQ2oI9EH',
        programRuleVariableSourceType: 'DATAELEMENT_PREVIOUS_EVENT',
        useCodeForOptionSet: false,
        dataElement: {
            id: 'LNHAYF3qdZl',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Comorbidity_neuro',
        id: 'luNlxKZ18Kc',
        programRuleVariableSourceType: 'DATAELEMENT_PREVIOUS_EVENT',
        useCodeForOptionSet: false,
        dataElement: {
            id: 'VCetMtYu1DY',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Dose number previous',
        id: 'MZOASkkopyy',
        programRuleVariableSourceType: 'DATAELEMENT_PREVIOUS_EVENT',
        useCodeForOptionSet: true,
        dataElement: {
            id: 'LUIsbsm3okG',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Suggested date',
        id: 'vmNRxb9hMIE',
        programRuleVariableSourceType: 'DATAELEMENT_PREVIOUS_EVENT',
        useCodeForOptionSet: false,
        dataElement: {
            id: 'FFWcps4MfuH',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Hali ya uraia',
        id: 'ggRATlIT5DS',
        programRuleVariableSourceType: 'TEI_ATTRIBUTE',
        useCodeForOptionSet: false,
        program: {
            id: 'yDuAzyqYABS',
        },
        trackedEntityAttribute: {
            id: 'm2dYZjKXoxU',
        },
    },
    {
        name: 'Age_Calculated',
        id: 'DQUY2tuOaUM',
        programRuleVariableSourceType: 'CALCULATED_VALUE',
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Comorbidity_Chronic_lung_NewestInProgram',
        id: 'd5Evb0MO8VA',
        programRuleVariableSourceType: 'DATAELEMENT_NEWEST_EVENT_PROGRAM',
        useCodeForOptionSet: false,
        dataElement: {
            id: 'C0Bony47eKp',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Umri',
        id: 'SY8UuSKbGhU',
        programRuleVariableSourceType: 'TEI_ATTRIBUTE',
        useCodeForOptionSet: false,
        program: {
            id: 'yDuAzyqYABS',
        },
        trackedEntityAttribute: {
            id: 'K1HloWNqHM5',
        },
    },
    {
        name: 'Had_COVID',
        id: 'zZ6tm010PEP',
        programRuleVariableSourceType: 'DATAELEMENT_CURRENT_EVENT',
        useCodeForOptionSet: true,
        dataElement: {
            id: 'LOU9t0aR0z7',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Vaccine_due_Astra-Seneca',
        id: 'bAXc8JCqxEx',
        programRuleVariableSourceType: 'CALCULATED_VALUE',
        useCodeForOptionSet: false,
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'comorbidity_diabetes',
        id: 'us900J8ezMR',
        programRuleVariableSourceType: 'DATAELEMENT_PREVIOUS_EVENT',
        useCodeForOptionSet: false,
        dataElement: {
            id: 'TT1h0vGu5da',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'SEX',
        id: 'wedEnLfm446',
        programRuleVariableSourceType: 'TEI_ATTRIBUTE',
        useCodeForOptionSet: true,
        program: {
            id: 'yDuAzyqYABS',
        },
        trackedEntityAttribute: {
            id: 'oindugucx72',
        },
    },
    {
        name: 'COVAC- Others',
        id: 'ByZdknECozH',
        programRuleVariableSourceType: 'DATAELEMENT_CURRENT_EVENT',
        useCodeForOptionSet: false,
        dataElement: {
            id: 'PfgQekESHbP',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Comorbitidy_neuro_NewestInProgram',
        id: 'rfM1tRH1UNZ',
        programRuleVariableSourceType: 'DATAELEMENT_NEWEST_EVENT_PROGRAM',
        useCodeForOptionSet: false,
        dataElement: {
            id: 'VCetMtYu1DY',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'AEFIs present',
        id: 'RVvbL8AxOer',
        programRuleVariableSourceType: 'DATAELEMENT_CURRENT_EVENT',
        useCodeForOptionSet: false,
        dataElement: {
            id: 'm9PgIDAJGlF',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Vaccine batch number',
        id: 'vYY1YhKXoAQ',
        programRuleVariableSourceType: 'DATAELEMENT_CURRENT_EVENT',
        useCodeForOptionSet: true,
        dataElement: {
            id: 'Yp1F4txx8tm',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Allergic_Reaction_to_first_dose',
        id: 'kb1lo9MPdv7',
        programRuleVariableSourceType: 'DATAELEMENT_CURRENT_EVENT',
        useCodeForOptionSet: false,
        dataElement: {
            id: 'dWoveSw6b79',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Comorbidity_chronic_lung',
        id: 'O9ub4A48WkP',
        programRuleVariableSourceType: 'DATAELEMENT_PREVIOUS_EVENT',
        useCodeForOptionSet: false,
        dataElement: {
            id: 'C0Bony47eKp',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Comorbidity_malignancy_NewestInProgram',
        id: 'uqAXb8v7JgP',
        programRuleVariableSourceType: 'DATAELEMENT_NEWEST_EVENT_PROGRAM',
        useCodeForOptionSet: false,
        dataElement: {
            id: 'xVxLMku5DMX',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
    {
        name: 'Reason for delay',
        id: 'eB9pD1bjBrY',
        programRuleVariableSourceType: 'DATAELEMENT_CURRENT_EVENT',
        useCodeForOptionSet: true,
        dataElement: {
            id: 'DJGs16i2DoA',
        },
        program: {
            id: 'yDuAzyqYABS',
        },
    },
] as ProgramRuleVariable[];

const getVariablesTest = [
    {
        test: 'd2:hasValue(A{Birthdate})',
        value: ['Birthdate'],
    },
    {
        test: "#{Underlying_conditions} == '' || #{Underlying_conditions} == 'No'",
        value: ['Underlying_conditions'],
    },
    {
        test: "#{Reason for delay}  != 'Mengineyo'",
        value: ['Reason for delay'],
    },
    {
        test: "A{Aina ya kitambulisho} != 'Other'",
        value: ['Aina ya kitambulisho'],
    },
    {
        test: "d2:hasValue('certificates_approval')==false  ||  #{certificates_approval} !=false",
        value: ['certificates_approval'],
    },
    {
        test: "A{Hali ya uraia} != 'Other'",
        value: ['Hali ya uraia'],
    },
    {
        test: 'd2:hasValue(A{Birthdate}) && A{Umri} < 18',
        value: ['Birthdate', 'Umri'],
    },
];
const getTriggersTest = [
    {
        test: 'd2:hasValue(A{Birthdate})',
        value: [
            {
                id: 'uRiIFjO4lqV',
                name: "Birthdate",
                type: 'TEI_ATTRIBUTE',
            },
        ],
    },
    {
        test: "#{Underlying_conditions} == '' || #{Underlying_conditions} == 'No'",
        value: [
            {
                id: 'bCtWZGjSWM8',
                name: "Underlying_conditions",
                type: 'DATAELEMENT_CURRENT_EVENT',
            },
        ],
    },
    {
        test: "#{Reason for delay}  != 'Mengineyo'",
        value: [
            {
                id: 'DJGs16i2DoA',
                "name": "Reason for delay",
                type: 'DATAELEMENT_CURRENT_EVENT',
            },
        ],
    },
    {
        test: "A{Aina ya kitambulisho} != 'Other'",
        value: [
            {
                id: 'Mhj0xPZr1v3',
                "name": "Aina ya kitambulisho",
                type: 'TEI_ATTRIBUTE',
            },
        ],
    },
];

const getTargetsTest = [
    {
        test: [
            {
                id: 'pv54O6ZNntC',
                programRuleActionType: 'ASSIGN',
                dataElement: {
                    id: 'PamkjF1JUnE',
                },
            },
            {
                id: 'Brj48CSupHb',
                programRuleActionType: 'ASSIGN',
                dataElement: {
                    id: 'PamkjF1JUnE',
                },
            },
            {
                id: 'pU6GhZ9pMT8',
                programRuleActionType: 'ASSIGN',
                dataElement: {
                    id: 'PamkjF1JUnE',
                },
            },
            {
                id: 'mZGd1VuScT2',
                programRuleActionType: 'ASSIGN',
                dataElement: {
                    id: 'PamkjF1JUnE',
                },
            },
            {
                id: 'Eal5YIytcc5',
                programRuleActionType: 'ASSIGN',
                dataElement: {
                    id: 'YTQulAldGOs',
                },
            },
            {
                id: 'Eal5YIytcc5',
                programRuleActionType: 'ASSIGN',
                dataElement: {
                    id: 'YTQulAldGOs',
                },
            },
            {
                id: 'tQoLsYVjDcB',
                programRuleActionType: 'HIDEOPTION',
                trackedEntityAttribute: {
                    id: 'BYShzv5RE9O',
                },
            },
            {
                id: 'HzoPOEGY6ex',
                programRuleActionType: 'HIDEFIELD',
                trackedEntityAttribute: {
                    id: 'D6GiGY0OPqA',
                },
            },
            {
                id: 'h0try32OwW1',
                programRuleActionType: 'HIDEFIELD',
                trackedEntityAttribute: {
                    id: 'VOLlsLBQNG3',
                },
            },
        ],
        value: [
            {
                id: 'PamkjF1JUnE',
                type: 'DATA_ELEMENT',
            },
            {
                id: 'YTQulAldGOs',
                type: 'DATA_ELEMENT',
            },
            {
                id: 'BYShzv5RE9O',
                type: 'ATTRIBUTE',
            },
            {
                id: 'D6GiGY0OPqA',
                type: 'ATTRIBUTE',
            },
            {
                id: 'VOLlsLBQNG3',
                type: 'ATTRIBUTE',
            },
        ],
    },
];
const getActionsTest: { test: any; value: RuleAction[] }[] = [
    {
        test: [
            {
                id: 'pv54O6ZNntC',
                programRuleActionType: 'ASSIGN',
                dataElement: {
                    id: 'PamkjF1JUnE',
                },
            },
            {
                id: 'Brj48CSupHb',
                programRuleActionType: 'ASSIGN',
                dataElement: {
                    id: 'PamkjF1JUnE',
                },
            },
            {
                id: 'pU6GhZ9pMT8',
                programRuleActionType: 'ASSIGN',
                dataElement: {
                    id: 'PamkjF1JUnE',
                },
            },
            {
                id: 'h0try32OwW1',
                programRuleActionType: 'HIDEFIELD',
                trackedEntityAttribute: {
                    id: 'VOLlsLBQNG3',
                },
            },
        ],
        value: [
            {
                target: {
                    id: 'PamkjF1JUnE',
                    type: 'DATA_ELEMENT',
                },
                id: 'pv54O6ZNntC',
                type: 'ASSIGN',
                data: '',
                content: "",
                option: undefined,
                optionGroup: undefined,
            },
            {
                id: 'Brj48CSupHb',
                type: 'ASSIGN',
                target: {
                    id: 'PamkjF1JUnE',
                    type: 'DATA_ELEMENT',
                },
                data: '',
                content: "",
                option: undefined,
                optionGroup: undefined,
            },
            {
                id: 'pU6GhZ9pMT8',
                type: 'ASSIGN',
                target: {
                    id: 'PamkjF1JUnE',
                    type: 'DATA_ELEMENT',
                },
                data: '',
                content: "",
                option: undefined,
                optionGroup: undefined,
            },
            {
                id: 'h0try32OwW1',
                type: 'HIDEFIELD',
                target: {
                    id: 'VOLlsLBQNG3',
                    type: 'ATTRIBUTE',
                },
                data: '',
                content: "",
                option: undefined,
                optionGroup: undefined,
            },
        ],
    },
];

const replaceConstantsTest = [
    {
        test: 'V{event_date}',
        value: "''",
    },
    {
        test: 'V{current_date}',
        value: `'${new Date().toISOString().split('T')[0]}'`,
    },
];

describe('getVariablesFromCondition', () => {
    it('should return an array', () => {
        expect(getVariablesFromCondition('')).toStrictEqual([]);
    });

    forEach(getVariablesTest, (condition) => {
        it(`it should return '${condition.value}' for the condition '${condition.test}'`, () => {
            expect(getVariablesFromCondition(condition.test)).toStrictEqual(condition.value);
        });
    });
});
describe('getRuleTriggers', () => {
    it('should return an array', () => {
        expect(getRuleTriggers('', variables)).toStrictEqual([]);
    });

    forEach(getTriggersTest, (condition) => {
        it(`it should return '${condition.value[0].type}' with id ${condition.value[0].id} for the condition '${condition.test}'`, () => {
            expect(getRuleTriggers(condition.test, variables)).toStrictEqual(condition.value);
        });
    });
});
describe('getRuleTargets', () => {
    it('should return an array', () => {
        expect(getRuleTargets([])).toStrictEqual([]);
    });

    forEach(getTargetsTest, (condition) => {
        it(`it should return '${condition.value[0].type}' with id ${condition.value[0].id} for the condition '${condition.test}'`, () => {
            expect(getRuleTargets(condition.test as any)).toStrictEqual(condition.value);
        });
    });
});
describe('getRuleActions', () => {
    it('should return an array', () => {
        expect(getRuleActions([])).toStrictEqual([]);
    });
    forEach(getActionsTest, (condition) => {
        it(`it should return '${condition.value[0].type}' with id ${condition.value[0].id} for the condition '${condition.test}'`, () => {
            expect(getRuleActions(condition.test as any)).toStrictEqual(condition.value);
        });
    });
});
describe('replaceConstants', () => {
    forEach(replaceConstantsTest, (condition) => {
        it(`it should return '${condition.value}' with id for the test '${condition.test}'`, () => {
            expect(replaceConstants(condition.test as any, {})).toStrictEqual(condition.value);
        });
    });
});
