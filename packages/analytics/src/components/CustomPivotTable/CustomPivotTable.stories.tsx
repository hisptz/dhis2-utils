import React from "react";
import {Story} from "@storybook/react";
import {CustomPivotTable, CustomPivotTableProps} from ".";
import pivotTableData from "./data/large-table-data.json"

const Template: Story<CustomPivotTableProps> = (args) => <CustomPivotTable {...args} />;

export const Default = Template.bind({});
Default.args = {
    analytics: {
        "headers": [
            {
                "name": "dx",
                "column": "Data",
                "valueType": "TEXT",
                "type": "java.lang.String",
                "hidden": false,
                "meta": true
            },
            {
                "name": "ou",
                "column": "Organisation unit",
                "valueType": "TEXT",
                "type": "java.lang.String",
                "hidden": false,
                "meta": true
            },
            {
                "name": "pe",
                "column": "Period",
                "valueType": "TEXT",
                "type": "java.lang.String",
                "hidden": false,
                "meta": true
            },
            {
                "name": "value",
                "column": "Value",
                "valueType": "NUMBER",
                "type": "java.lang.Double",
                "hidden": false,
                "meta": false
            },
            {
                "name": "numerator",
                "column": "Numerator",
                "valueType": "NUMBER",
                "type": "java.lang.Double",
                "hidden": false,
                "meta": false
            },
            {
                "name": "denominator",
                "column": "Denominator",
                "valueType": "NUMBER",
                "type": "java.lang.Double",
                "hidden": false,
                "meta": false
            },
            {
                "name": "factor",
                "column": "Factor",
                "valueType": "NUMBER",
                "type": "java.lang.Double",
                "hidden": false,
                "meta": false
            },
            {
                "name": "multiplier",
                "column": "Multiplier",
                "valueType": "NUMBER",
                "type": "java.lang.Double",
                "hidden": false,
                "meta": false
            },
            {
                "name": "divisor",
                "column": "Divisor",
                "valueType": "NUMBER",
                "type": "java.lang.Double",
                "hidden": false,
                "meta": false
            }
        ],
        "metaData": {
            "items": {
                "2020": {
                    "uid": "2020",
                    "code": "2020",
                    "name": "2020",
                    "dimensionItemType": "PERIOD",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM",
                    "startDate": "2020-01-01T00:00:00.000",
                    "endDate": "2020-12-31T00:00:00.000"
                },
                "2021": {
                    "uid": "2021",
                    "code": "2021",
                    "name": "2021",
                    "dimensionItemType": "PERIOD",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM",
                    "startDate": "2021-01-01T00:00:00.000",
                    "endDate": "2021-12-31T00:00:00.000"
                },
                "2022": {
                    "uid": "2022",
                    "code": "2022",
                    "name": "2022",
                    "dimensionItemType": "PERIOD",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM",
                    "startDate": "2022-01-01T00:00:00.000",
                    "endDate": "2022-12-31T00:00:00.000"
                },
                "UrfERV5OKXQ": {
                    "uid": "UrfERV5OKXQ",
                    "name": "POST GBV (Clinical) services provided",
                    "description": "Count of all POST GBV services given",
                    "dimensionItemType": "PROGRAM_INDICATOR",
                    "valueType": "NUMBER",
                    "aggregationType": "COUNT",
                    "totalAggregationType": "SUM"
                },
                "quBQhOPqBUf": {
                    "uid": "quBQhOPqBUf",
                    "name": "PEP services provided",
                    "description": "Count of all PEP services given",
                    "dimensionItemType": "PROGRAM_INDICATOR",
                    "valueType": "NUMBER",
                    "aggregationType": "COUNT",
                    "totalAggregationType": "SUM"
                },
                "TNf9GBn7TVJ": {
                    "uid": "TNf9GBn7TVJ",
                    "name": "Stepping Stones services provided",
                    "dimensionItemType": "PROGRAM_INDICATOR",
                    "valueType": "NUMBER",
                    "aggregationType": "COUNT",
                    "totalAggregationType": "SUM"
                },
                "g9Ufw2VYZUC": {
                    "uid": "g9Ufw2VYZUC",
                    "name": "GBV Legal Messaging services provided",
                    "dimensionItemType": "PROGRAM_INDICATOR",
                    "valueType": "NUMBER",
                    "aggregationType": "COUNT",
                    "totalAggregationType": "SUM"
                },
                "uYnMP4NDAPn": {
                    "uid": "uYnMP4NDAPn",
                    "code": "04",
                    "name": "Mafeteng",
                    "dimensionItemType": "ORGANISATION_UNIT",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM"
                },
                "PzBpn8adDud": {
                    "uid": "PzBpn8adDud",
                    "name": "SAB services provided",
                    "description": "Count of all SAB services given",
                    "dimensionItemType": "PROGRAM_INDICATOR",
                    "valueType": "NUMBER",
                    "aggregationType": "COUNT",
                    "totalAggregationType": "SUM"
                },
                "K3hMAQR72Qy": {
                    "uid": "K3hMAQR72Qy",
                    "code": "05",
                    "name": "Maseru",
                    "dimensionItemType": "ORGANISATION_UNIT",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM"
                },
                "yoSGcrclQYD": {
                    "uid": "yoSGcrclQYD",
                    "name": "HTS services provided",
                    "description": "Count of all HTS services given",
                    "dimensionItemType": "PROGRAM_INDICATOR",
                    "valueType": "NUMBER",
                    "aggregationType": "COUNT",
                    "totalAggregationType": "SUM"
                },
                "dx": {
                    "uid": "dx",
                    "name": "Data",
                    "dimensionType": "DATA_X"
                },
                "k2DHuklrXjl": {
                    "uid": "k2DHuklrXjl",
                    "code": "03",
                    "name": "Leribe",
                    "dimensionItemType": "ORGANISATION_UNIT",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM"
                },
                "vJP6uGsWsTC": {
                    "uid": "vJP6uGsWsTC",
                    "code": "10",
                    "name": "Thaba Tseka",
                    "dimensionItemType": "ORGANISATION_UNIT",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM"
                },
                "YNK8HI0Skg6": {
                    "uid": "YNK8HI0Skg6",
                    "code": "06",
                    "name": "Mohale's Hoek",
                    "dimensionItemType": "ORGANISATION_UNIT",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM"
                },
                "ou": {
                    "uid": "ou",
                    "name": "Organisation unit",
                    "dimensionType": "ORGANISATION_UNIT"
                },
                "b69S1KvmO0a": {
                    "uid": "b69S1KvmO0a",
                    "name": "PrEP services provided",
                    "description": "Count of all PrEP services given",
                    "dimensionItemType": "PROGRAM_INDICATOR",
                    "valueType": "NUMBER",
                    "aggregationType": "COUNT",
                    "totalAggregationType": "SUM"
                },
                "CJUlxDJVtSL": {
                    "uid": "CJUlxDJVtSL",
                    "name": "Districts"
                },
                "asvwIHSEl5F": {
                    "uid": "asvwIHSEl5F",
                    "name": "POST GBV (Legal) services provided",
                    "description": "Count of all POST GBV services given",
                    "dimensionItemType": "PROGRAM_INDICATOR",
                    "valueType": "NUMBER",
                    "aggregationType": "COUNT",
                    "totalAggregationType": "SUM"
                },
                "xDK7cFhSt7T": {
                    "uid": "xDK7cFhSt7T",
                    "code": "02",
                    "name": "Butha Buthe",
                    "dimensionItemType": "ORGANISATION_UNIT",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM"
                },
                "xbvsZt0FYDb": {
                    "uid": "xbvsZt0FYDb",
                    "code": "07",
                    "name": "Mokhotlong",
                    "dimensionItemType": "ORGANISATION_UNIT",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM"
                },
                "XoimajmOWUE": {
                    "uid": "XoimajmOWUE",
                    "code": "08",
                    "name": "Qacha's Nek",
                    "dimensionItemType": "ORGANISATION_UNIT",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM"
                },
                "wEelmVeGByt": {
                    "uid": "wEelmVeGByt",
                    "name": "HIV Messaging services provided",
                    "description": "Count of all HIV Messaging  services given",
                    "dimensionItemType": "PROGRAM_INDICATOR",
                    "valueType": "NUMBER",
                    "aggregationType": "COUNT",
                    "totalAggregationType": "SUM"
                },
                "mQkzxvqVp34": {
                    "uid": "mQkzxvqVp34",
                    "code": "09",
                    "name": "Quthing",
                    "dimensionItemType": "ORGANISATION_UNIT",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM"
                },
                "pe": {
                    "uid": "pe",
                    "name": "Period",
                    "dimensionType": "PERIOD"
                },
                "JyxEZJ19nZk": {
                    "uid": "JyxEZJ19nZk",
                    "code": "01",
                    "name": "Berea",
                    "dimensionItemType": "ORGANISATION_UNIT",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM"
                },
                "G9nHEZTB6zO": {
                    "uid": "G9nHEZTB6zO",
                    "name": " Social Economic Services provided",
                    "dimensionItemType": "PROGRAM_INDICATOR",
                    "valueType": "NUMBER",
                    "aggregationType": "COUNT",
                    "totalAggregationType": "SUM"
                },
                "mwYdO1cIaTh": {
                    "uid": "mwYdO1cIaTh",
                    "name": "ART services provided",
                    "dimensionItemType": "PROGRAM_INDICATOR",
                    "valueType": "NUMBER",
                    "aggregationType": "COUNT",
                    "totalAggregationType": "SUM"
                },
                "PV9mj7G3Rly": {
                    "uid": "PV9mj7G3Rly",
                    "name": "GBV Messaging services provided",
                    "dimensionItemType": "PROGRAM_INDICATOR",
                    "valueType": "NUMBER",
                    "aggregationType": "COUNT",
                    "totalAggregationType": "SUM"
                }
            },
            "dimensions": {
                "dx": [
                    "wEelmVeGByt",
                    "UrfERV5OKXQ",
                    "asvwIHSEl5F",
                    "b69S1KvmO0a",
                    "yoSGcrclQYD",
                    "quBQhOPqBUf",
                    "PzBpn8adDud",
                    "mwYdO1cIaTh",
                    "PV9mj7G3Rly",
                    "g9Ufw2VYZUC",
                    "G9nHEZTB6zO",
                    "TNf9GBn7TVJ"
                ],
                "pe": [
                    "2020",
                    "2021",
                    "2022"
                ],
                "ou": [
                    "JyxEZJ19nZk",
                    "xDK7cFhSt7T",
                    "k2DHuklrXjl",
                    "uYnMP4NDAPn",
                    "K3hMAQR72Qy",
                    "YNK8HI0Skg6",
                    "xbvsZt0FYDb",
                    "XoimajmOWUE",
                    "mQkzxvqVp34",
                    "vJP6uGsWsTC"
                ],
                "co": []
            }
        },
        "rows": [
            [
                "wEelmVeGByt",
                "JyxEZJ19nZk",
                "2022",
                "96.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "wEelmVeGByt",
                "K3hMAQR72Qy",
                "2022",
                "8.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "wEelmVeGByt",
                "YNK8HI0Skg6",
                "2022",
                "3.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "wEelmVeGByt",
                "vJP6uGsWsTC",
                "2022",
                "2.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "UrfERV5OKXQ",
                "JyxEZJ19nZk",
                "2022",
                "2.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "UrfERV5OKXQ",
                "K3hMAQR72Qy",
                "2022",
                "2.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "UrfERV5OKXQ",
                "vJP6uGsWsTC",
                "2022",
                "1.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "asvwIHSEl5F",
                "JyxEZJ19nZk",
                "2022",
                "4.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "asvwIHSEl5F",
                "K3hMAQR72Qy",
                "2022",
                "6.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "asvwIHSEl5F",
                "YNK8HI0Skg6",
                "2022",
                "1.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "b69S1KvmO0a",
                "JyxEZJ19nZk",
                "2022",
                "1.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "b69S1KvmO0a",
                "K3hMAQR72Qy",
                "2022",
                "34.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "b69S1KvmO0a",
                "YNK8HI0Skg6",
                "2022",
                "2.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "yoSGcrclQYD",
                "K3hMAQR72Qy",
                "2022",
                "8.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "yoSGcrclQYD",
                "vJP6uGsWsTC",
                "2022",
                "2.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "quBQhOPqBUf",
                "JyxEZJ19nZk",
                "2022",
                "2.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "quBQhOPqBUf",
                "K3hMAQR72Qy",
                "2022",
                "5.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "quBQhOPqBUf",
                "YNK8HI0Skg6",
                "2022",
                "2.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "PzBpn8adDud",
                "JyxEZJ19nZk",
                "2022",
                "5.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "PzBpn8adDud",
                "K3hMAQR72Qy",
                "2020",
                "6.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "PzBpn8adDud",
                "K3hMAQR72Qy",
                "2022",
                "8.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "PzBpn8adDud",
                "YNK8HI0Skg6",
                "2022",
                "1.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "PzBpn8adDud",
                "vJP6uGsWsTC",
                "2022",
                "23.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "mwYdO1cIaTh",
                "JyxEZJ19nZk",
                "2022",
                "1.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "mwYdO1cIaTh",
                "K3hMAQR72Qy",
                "2022",
                "3.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "PV9mj7G3Rly",
                "K3hMAQR72Qy",
                "2020",
                "11.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "G9nHEZTB6zO",
                "K3hMAQR72Qy",
                "2022",
                "3.0",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "TNf9GBn7TVJ",
                "JyxEZJ19nZk",
                "2022",
                "14.0",
                "",
                "",
                "",
                "",
                ""
            ]
        ],
        "height": 28,
        "headerWidth": 9,
        "width": 9
    } as any,
    config: {
        layout: {
            columns: [{dimension: "ou",}, {dimension: "pe", label: "Period"},],
            rows: [{dimension: "dx", label: "Services"},],
            filter: []
        },
        options: {}
    },
    tableProps: {}
};

export const WithManyData = Template.bind({});
WithManyData.args = {
    analytics: pivotTableData as any,
    config: {
        layout: {
            columns: [{dimension: "dx",}, {dimension: "J5jldMd8OHv", label: "Facility Type"},],
            rows: [{dimension: "pe", label: "Period"}, {dimension: "ou", label: "Organisation unit"}],
            filter: []
        },
        options: {
            fixColumnHeaders: false
        }
    },
    tableProps: {
        scrollHeight: "800px",
        scrollWidth: "1400px"
    }
};

export default {
    title: "Analytics/Pivot table",
    component: CustomPivotTable,
};
