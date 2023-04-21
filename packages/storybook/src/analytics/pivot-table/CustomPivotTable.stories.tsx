import React from "react";
import {Story} from "@storybook/react";
import {CustomPivotTable, CustomPivotTableProps} from "@hisptz/dhis2-analytics";
import simpleData from "../../../../../resources/analytics/simple-data.json";

const Template: Story<CustomPivotTableProps> = (args) => <CustomPivotTable {...args} />;

export const Default = Template.bind({});
Default.args = {
    analytics: simpleData as any,
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

// export const WithManyData = Template.bind({});
// WithManyData.args = {
//     analytics: pivotTableData as any,
//     config: {
//         layout: {
//             columns: [{dimension: "dx",}, {dimension: "J5jldMd8OHv", label: "Facility Type"},],
//             rows: [{dimension: "pe", label: "Period"}, {dimension: "ou", label: "Organisation unit"}],
//             filter: []
//         },
//         options: {
//             fixColumnHeaders: false
//         }
//     },
//     tableProps: {
//         scrollHeight: "800px",
//         scrollWidth: "1400px"
//     }
// };

export default {
    title: "Analytics/Pivot table",
    component: CustomPivotTable,
};
