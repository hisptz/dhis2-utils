import {CssReset} from "@dhis2/ui";
import type {Story} from "@storybook/react";
import HighCharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, {useState} from "react";
import {ChartAnalytics, ChartAnalyticsProps, ChartDownloadMenu, setupHighchartsModules} from "@hisptz/dhis2-analytics";
import columnData from "../../../../../resources/analytics/column-data.json";
import multiSeriesData from "../../../../../resources/analytics/multi-series-data.json";
import pieData from "../../../../../resources/analytics/pie-data.json";
import stackedChartData from "../../../../../resources/analytics/stacked-chart-data.json";
import complexMultiSeriesData from "../../../../../resources/analytics/complex-multi-series-data.json";

const Template: Story<ChartAnalyticsProps> = (args) => <ChartAnalytics {...args} />;
setupHighchartsModules(HighCharts);

export const Column = Template.bind({});
Column.args = {
  analytics: columnData as any,
  config: {
    layout: {
      series: ["dx"],
      category: ["ou"],
      filter: ["pe"],
    },
    type: "column",
  },
};

export const Bar = Template.bind({});
Bar.args = {
  analytics: columnData as any,
  config: {
    layout: {
      series: ["dx"],
      category: ["ou"],
      filter: ["pe"],
    },
    type: "bar",
  },
};

export const MultipleColumns = Template.bind({});
MultipleColumns.args = {
  analytics: multiSeriesData as any,
  config: {
    layout: {
      series: ["ou"],
      category: ["pe"],
      filter: ["dx"],
    },
    type: "column",
  },
};

export const StackedColumn = Template.bind({});
StackedColumn.args = {
  analytics: stackedChartData as any,
  config: {
    layout: {
      series: ["ou"],
      category: ["pe"],
      filter: ["dx"],
    },
    type: "stacked-column",
  },
};
export const StackedBar = Template.bind({});
StackedBar.args = {
  analytics: stackedChartData as any,
  config: {
    layout: {
      series: ["ou"],
      category: ["pe"],
      filter: ["dx"],
    },
    type: "stacked-bar",
  },
};

export const Line = Template.bind({});
Line.args = {
  analytics: columnData as any,
  config: {
    layout: {
      series: ["dx"],
      category: ["ou"],
      filter: ["pe"],
    },
    type: "line",
  },
};

export const MultipleLines = Template.bind({});
MultipleLines.args = {
  analytics: multiSeriesData as any,
  config: {
    layout: {
      series: ["ou"],
      category: ["pe"],
      filter: ["dx"],
    },
    type: "line",
  },
};

export const PieChart = Template.bind({});
PieChart.args = {
  analytics: pieData as any,
  config: {
    layout: {
      series: ["dx"],
      category: [],
      filter: ["dx", "pe"],
    },
    type: "pie",
  },
};

export const MultiSeries = Template.bind({});
MultiSeries.args = {
  analytics: multiSeriesData as any,
  config: {
    layout: {
      series: ["ou"],
      category: ["pe"],
      filter: ["dx"],
    },
    type: "multi-series",
    multiSeries: {
      series: [
        {
          id: "qhqAxPSTUXp",
          as: "column",
          yAxis: 0,
        },
        {
          id: "Vth0fbpFcsO",
          as: "line",
          cumulative: true,
          yAxis: 1,
        },
      ],
      yAxes: [
        {
          id: "yAxis1",
          title: {
            text: "Koinandugu",
          },
          labels: {
            format: "{value}",
          },
        },
        {
          id: "yAxis2",
          title: {
            text: "Kono",
          },
          labels: {
            format: "{value}",
          },
          opposite: true,
        },
      ],
      target: {
        id: "",
        styles: {
          color: "blue",
        },
        value: 45,
        label: {
          text: "Target",
          textAlign: "center",
          verticalAlign: "middle",
        },
      },
    },
  },
};

export const ComplexMultiSeries = Template.bind({});
ComplexMultiSeries.args = {
  analytics: complexMultiSeriesData as any,
  config: {
    layout: {
      series: ["dx"],
      category: ["pe"],
      filter: ["ou"],
    },
    type: "multi-series",
    multiSeries: {
      series: [
        {
          id: "QQkOAJFukyY",
          as: "column",
          yAxis: 0,
        },
        {
          id: "QQkOAJFukyY",
          as: "line",
          cumulative: true,
          yAxis: 1,
        },
      ],
      yAxes: [
        {
          id: "yAxis1",
          title: {
            text: "Koinandugu",
          },
          labels: {
            format: "{value}",
          },
        },
        {
          id: "yAxis2",
          title: {
            text: "Kono",
          },
          labels: {
            format: "{value}",
          },
          opposite: true,
        },
      ],
      target: {
        id: "",
        styles: {
          color: "blue",
        },
        value: 45,
        label: {
          text: "Target",
          textAlign: "center",
          verticalAlign: "middle",
        },
      },
    },
  },
};

export default {
  title: "Chart Analytics",
  component: ChartAnalytics,
  decorators: [
    (ChartStory: any) => {
      const [chartRef, setChartRef] = useState<HighchartsReact.RefObject | null>(null);
      return (
          <div style={{width: 1000, height: "100%", display: "flex", gap: 8, flexDirection: "column"}}>
            <CssReset/>
            <div style={{width: "100%", display: "flex", justifyContent: "end"}}>{<ChartDownloadMenu
                chartRef={chartRef}/>}</div>
            <ChartStory ref={setChartRef}/>
          </div>
      );
    },
  ],
};
