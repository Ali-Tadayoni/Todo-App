import * as Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";

function getFormattedDate(): string {
  const date = new Date();
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

const options: Highcharts.Options = {
  chart: {
    plotBackgroundColor: undefined,
    plotBorderWidth: 0,
    plotShadow: false,
    type: "pie",
  },
  title: {
    text: `Status<br>${getFormattedDate()}`,
    align: "center",
    verticalAlign: "middle",
    y: 60,
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
      center: ["50%", "75%"],
      size: "110%",
    },
  },
  series: [
    {
      type: "pie",
      name: "Browser share",
      innerSize: "50%",
      data: [
        ["Chrome", 73.86],
        ["Edge", 11.97],
        ["Firefox", 5.52],
        ["Safari", 2.98],
        ["Internet Explorer", 1.9],
        ["Other", 3.77],
      ],
    },
  ],
};

const Chart: React.FC = () => {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;
