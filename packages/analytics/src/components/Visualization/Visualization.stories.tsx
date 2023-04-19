import {setupHighchartsModules} from "../ChartAnalytics";
import {Visualization, VisualizationProps} from "./index";
import HighCharts from "highcharts";
import {Story} from "@storybook/react";
import React from "react";
import {Box, Card, CssReset} from "@dhis2/ui"

const Template: Story<VisualizationProps> = (args) => <Visualization {...args} />;
setupHighchartsModules(HighCharts);

export const Default = Template.bind({});
Default.args = {
    dimensions: {
        dx: ["Uvn6LCg7dVU", "OdiHJayrsKo", "sB79w2hiLp8", "AUqdhY4mpvp"],
        pe: ["LAST_6_MONTHS"],
        ou: [
            "USER_ORGUNIT"
        ]
    },
    layout: {
        columns: ["dx"],
        filters: ["ou"],
        rows: ["pe"]
    },
    defaultVisualizationType: "pivot-table"
};

export default {
    title: "Analytics/Visualization",
    component: Visualization,
    decorators: [
        (ChartStory: any) => {
            return (
                <Box width={"600"} height={"500"}>
                    <Card>
                        <div style={{width: 1000, height: "100%", display: "flex", gap: 8, flexDirection: "column"}}>
                            <CssReset/>
                            <ChartStory/>
                        </div>
                    </Card>
                </Box>
            );
        },
    ],
};
