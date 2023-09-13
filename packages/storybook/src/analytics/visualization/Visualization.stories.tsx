import HighCharts from "highcharts";
import {Story} from "@storybook/react";
import React from "react";
import {Box, Card, CssReset} from "@dhis2/ui"
import {setupHighchartsModules, Visualization, VisualizationProps} from "@hisptz/dhis2-analytics";

const Template: Story<VisualizationProps> = (args) => <Visualization {...args} />;
setupHighchartsModules(HighCharts);

export const Default = Template.bind({});
Default.args = {
    dimensions: {
        dx: ["Uvn6LCg7dVU", "OdiHJayrsKo", "sB79w2hiLp8", "AUqdhY4mpvp"],
        pe: ["LAST_6_MONTHS"],
        ou: [
            "fdc6uOvgoji",
            "O6uvpzGd5pu"
        ]
    },
    showToolbar: true,
    showPeriodSelector: true,
    showOrgUnitSelector: true,
    layout: {
        columns: ["dx"],
        filters: [],
        rows: ["ou", "pe"]
    },
    defaultVisualizationType: "pivotTable",
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
    title: "Visualization",
    component: Visualization,
    decorators: [
        (ChartStory: any) => {
            return (
                <Box width={"1000"} height={"800"}>
                    <Card>
                        <div style={{
                            width: 800,
                            height: 600,
                            display: "flex",
                            gap: 8,
                            flexDirection: "column",
                            padding: 16
                        }}>
                            <CssReset/>
                            <ChartStory/>
                        </div>
                    </Card>
                </Box>
            );
        },
    ],
};
