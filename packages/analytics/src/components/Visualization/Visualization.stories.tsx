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
            "USER_ORGUNIT_CHILDREN"
        ]
    },
    layout: {
        columns: ["dx"],
        filters: [],
        rows: ["ou", "pe"]
    },
    defaultVisualizationType: "pivot-table",
    config: {
        chart: {
            layout: {
                series: ["dx"],
                category: ["pe"],
                filter: ["ou"]
            },
            type: "column"
        },
        map: {
            thematicLayers: [
                {
                    type: "choropleth",
                    id: "Uvn6LCg7dVU",
                    enabled: true,
                    control: {
                        enabled: true,
                        position: "topright",
                    },
                    dataItem: {
                        displayName: "Uvn6LCg7dVU",
                        id: "Uvn6LCg7dVU",
                        type: "indicator",
                        legendConfig: {
                            colorClass: "BrBG",
                            scale: 7
                        }
                    }
                },
                {
                    type: "choropleth",
                    id: "OdiHJayrsKo",
                    enabled: true,
                    control: {
                        enabled: true,
                        position: "topright",
                    },
                    dataItem: {
                        displayName: "OdiHJayrsKo",
                        id: "OdiHJayrsKo",
                        type: "indicator",
                        legendConfig: {
                            colorClass: "BrBG",
                            scale: 7
                        }
                    }
                },
                {
                    type: "choropleth",
                    id: "sB79w2hiLp8",
                    enabled: true,
                    control: {
                        enabled: true,
                        position: "topright",
                    },
                    dataItem: {
                        displayName: "sB79w2hiLp8",
                        id: "sB79w2hiLp8",
                        type: "indicator",
                        legendConfig: {
                            colorClass: "BrBG",
                            scale: 7
                        }
                    }
                },
                {
                    type: "choropleth",
                    id: "AUqdhY4mpvp",
                    enabled: true,
                    control: {
                        enabled: true,
                        position: "topright",
                    },
                    dataItem: {
                        displayName: "AUqdhY4mpvp",
                        id: "AUqdhY4mpvp",
                        type: "indicator",
                        legendConfig: {
                            colorClass: "BrBG",
                            scale: 7
                        }
                    }
                },
            ],
            legends: {
                enabled: true,
                position: "topright",
                collapsible: true
            }
        },
        pivotTable: {
            fixColumnHeaders: true,
            fixRowHeaders: true
        }
    }
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
