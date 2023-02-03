import React from "react";
import {Story} from "@storybook/react";
import {CustomPivotTable, CustomPivotTableProps} from ".";
import {Analytics} from "@hisptz/dhis2-utils";

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
                "name": "pe",
                "column": "Period",
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
        ], "metaData": {
            "items": {
                "ou": {"uid": "ou", "name": "Organisation unit", "dimensionType": "ORGANISATION_UNIT"},
                "202208": {
                    "uid": "202208",
                    "code": "202208",
                    "name": "August 2022",
                    "dimensionItemType": "PERIOD",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM",
                    "startDate": "2022-08-01T00:00:00.000",
                    "endDate": "2022-08-31T00:00:00.000"
                },
                "202209": {
                    "uid": "202209",
                    "code": "202209",
                    "name": "September 2022",
                    "dimensionItemType": "PERIOD",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM",
                    "startDate": "2022-09-01T00:00:00.000",
                    "endDate": "2022-09-30T00:00:00.000"
                },
                "202206": {
                    "uid": "202206",
                    "code": "202206",
                    "name": "June 2022",
                    "dimensionItemType": "PERIOD",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM",
                    "startDate": "2022-06-01T00:00:00.000",
                    "endDate": "2022-06-30T00:00:00.000"
                },
                "fbfJHSPpUQD": {
                    "uid": "fbfJHSPpUQD",
                    "code": "DE_359596",
                    "name": "ANC 1st visit",
                    "legendSet": "fqs276KXCXi",
                    "dimensionItemType": "DATA_ELEMENT",
                    "valueType": "NUMBER",
                    "aggregationType": "SUM",
                    "totalAggregationType": "SUM"
                },
                "202207": {
                    "uid": "202207",
                    "code": "202207",
                    "name": "July 2022",
                    "dimensionItemType": "PERIOD",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM",
                    "startDate": "2022-07-01T00:00:00.000",
                    "endDate": "2022-07-31T00:00:00.000"
                },
                "202204": {
                    "uid": "202204",
                    "code": "202204",
                    "name": "April 2022",
                    "dimensionItemType": "PERIOD",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM",
                    "startDate": "2022-04-01T00:00:00.000",
                    "endDate": "2022-04-30T00:00:00.000"
                },
                "202205": {
                    "uid": "202205",
                    "code": "202205",
                    "name": "May 2022",
                    "dimensionItemType": "PERIOD",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM",
                    "startDate": "2022-05-01T00:00:00.000",
                    "endDate": "2022-05-31T00:00:00.000"
                },
                "202202": {
                    "uid": "202202",
                    "code": "202202",
                    "name": "February 2022",
                    "dimensionItemType": "PERIOD",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM",
                    "startDate": "2022-02-01T00:00:00.000",
                    "endDate": "2022-02-28T00:00:00.000"
                },
                "202301": {
                    "uid": "202301",
                    "code": "202301",
                    "name": "January 2023",
                    "dimensionItemType": "PERIOD",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM",
                    "startDate": "2023-01-01T00:00:00.000",
                    "endDate": "2023-01-31T00:00:00.000"
                },
                "202203": {
                    "uid": "202203",
                    "code": "202203",
                    "name": "March 2022",
                    "dimensionItemType": "PERIOD",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM",
                    "startDate": "2022-03-01T00:00:00.000",
                    "endDate": "2022-03-31T00:00:00.000"
                },
                "LAST_12_MONTHS": {"name": "Last 12 months"},
                "202211": {
                    "uid": "202211",
                    "code": "202211",
                    "name": "November 2022",
                    "dimensionItemType": "PERIOD",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM",
                    "startDate": "2022-11-01T00:00:00.000",
                    "endDate": "2022-11-30T00:00:00.000"
                },
                "202212": {
                    "uid": "202212",
                    "code": "202212",
                    "name": "December 2022",
                    "dimensionItemType": "PERIOD",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM",
                    "startDate": "2022-12-01T00:00:00.000",
                    "endDate": "2022-12-31T00:00:00.000"
                },
                "ImspTQPwCqd": {
                    "uid": "ImspTQPwCqd",
                    "code": "OU_525",
                    "name": "Sierra Leone",
                    "dimensionItemType": "ORGANISATION_UNIT",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM"
                },
                "202210": {
                    "uid": "202210",
                    "code": "202210",
                    "name": "October 2022",
                    "dimensionItemType": "PERIOD",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM",
                    "startDate": "2022-10-01T00:00:00.000",
                    "endDate": "2022-10-31T00:00:00.000"
                },
                "dx": {"uid": "dx", "name": "Data", "dimensionType": "DATA_X"},
                "pq2XI5kz2BY": {
                    "uid": "pq2XI5kz2BY",
                    "code": "COC_167661",
                    "name": "Fixed",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM"
                },
                "pe": {"uid": "pe", "name": "Period", "dimensionType": "PERIOD"},
                "PT59n8BQbqM": {
                    "uid": "PT59n8BQbqM",
                    "code": "COC_167660",
                    "name": "Outreach",
                    "valueType": "NUMBER",
                    "totalAggregationType": "SUM"
                }
            },
            "dimensions": {
                "dx": ["fbfJHSPpUQD"],
                "pe": ["202202", "202203", "202204", "202205", "202206", "202207", "202208", "202209", "202210", "202211", "202212", "202301"],
                "ou": ["ImspTQPwCqd"],
                "co": ["pq2XI5kz2BY", "PT59n8BQbqM"]
            }
        }, "rows": [
            [
                "fbfJHSPpUQD",
                "202209",
                "ImspTQPwCqd",
                "22308",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "fbfJHSPpUQD",
                "202301",
                "ImspTQPwCqd",
                "20020",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "fbfJHSPpUQD",
                "202206",
                "ImspTQPwCqd",
                "23813",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "fbfJHSPpUQD",
                "202210",
                "ImspTQPwCqd",
                "17926",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "fbfJHSPpUQD",
                "202207",
                "ImspTQPwCqd",
                "22356",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "fbfJHSPpUQD",
                "202208",
                "ImspTQPwCqd",
                "22004",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "fbfJHSPpUQD",
                "202212",
                "ImspTQPwCqd",
                "16445",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "fbfJHSPpUQD",
                "202202",
                "ImspTQPwCqd",
                "18786",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "fbfJHSPpUQD",
                "202211",
                "ImspTQPwCqd",
                "19691",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "fbfJHSPpUQD",
                "202205",
                "ImspTQPwCqd",
                "29461",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "fbfJHSPpUQD",
                "202203",
                "ImspTQPwCqd",
                "21877",
                "",
                "",
                "",
                "",
                ""
            ],
            [
                "fbfJHSPpUQD",
                "202204",
                "ImspTQPwCqd",
                "18576",
                "",
                "",
                "",
                "",
                ""
            ]
        ], "height": 0, "width": 0, "headerWidth": 0
    } as unknown as Analytics,
    config: {
        layout: {
            columns: ["dx"],
            rows: ["ou", "pe"],
            filter: []
        },
        options: {

        }
    },
};

export default {
    title: "Analytics/Pivot table",
    component: CustomPivotTable,
};
