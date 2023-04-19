import {setupHighchartsModules} from "../ChartAnalytics";
import {Visualization, VisualizationProps} from "./index";
import HighCharts from "highcharts";
import {Story} from "@storybook/react";
import columnData from "../ChartAnalytics/data/column-data.json";
import React from "react";
import {CssReset} from "@dhis2/ui"

const Template: Story<VisualizationProps> = (args) => <Visualization {...args} />;
setupHighchartsModules(HighCharts);

export const Default = Template.bind({});
Default.args = {
    analytics: columnData as any,
};

export default {
    title: "Analytics/Visualization",
    component: Visualization,
    decorators: [
        (ChartStory: any) => {
            return (
                <div style={{width: 1000, height: "100%", display: "flex", gap: 8, flexDirection: "column"}}>
                    <CssReset/>
                    <ChartStory/>
                </div>
            );
        },
    ],
};
