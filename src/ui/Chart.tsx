import * as Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { useTodo } from "../contexts/TodoContext";

function getFormattedDate(): string {
  const date = new Date();
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

const Chart: React.FC = () => {
  const { todos } = useTodo();
  // Count the statuses
  const statusCounts = todos.reduce((acc, todo) => {
    acc[todo.status] = (acc[todo.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate the percentages for each status
  const totalTodos = todos.length;
  const chartData = Object.entries(statusCounts).map(([status, count]) => [
    status,
    (count / totalTodos) * 100,
  ]);

  const options: Highcharts.Options = {
    chart: {
      plotBackgroundColor: undefined,
      plotBorderWidth: 0,
      plotShadow: false,
      type: "pie",
      height: 315,
    },
    title: {
      text: `Status<br>${getFormattedDate()}`,
      align: "center",
      verticalAlign: "middle",
      y: 30,
      style: {
        fontSize: "1.1em",
      },
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: "bold",
            color: "white",
          },
        },
        startAngle: -90,
        endAngle: 90,
        center: ["50%", "65%"],
        size: "110%",
      },
    },
    series: [
      {
        type: "pie",
        name: "Status share",
        innerSize: "53%",
        data: chartData,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
export default Chart;
