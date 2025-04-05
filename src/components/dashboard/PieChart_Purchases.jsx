import React, { useEffect, useState } from "react";
import { Pie, PieChart, Cell, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
// ];
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
};
import useCafeStore from "@/store/cafe-store";
import { getCustomerPurchases } from "@/api/dashboard";
import numeral from "numeral";

const PieChart_Purchases = ({ startDate, endDate }) => {
  const token = useCafeStore((s) => s.token);
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCustomerPurchases(token, startDate, endDate);
        const data = response.data;

        const formattedData = [
          {
            name: "Not Member",
            price: data.totalNonMemberSales,
            fill: "var(--color-chrome)",
          },
          {
            name: "Member",
            price: data.totalMemberSales,
            fill: "var(--color-safari)",
          },
        ];

        setChartData(formattedData);
        //console.log(chartData)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token, startDate, endDate]);

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <div className="flex justify-center gap-4 ">
        {payload.map((entry, index) => (
          <div key={`legend-${index}`} className="text-center ">
            <div className="flex gap-1 ">
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: entry.color,
                  borderRadius: "50%",
                  marginTop: "3px",
                }}
              />
              <div>{entry.value}</div>
            </div>
            <div className="text-sm">{numeral(chartData[index]?.price).format('0,0.00')}</div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <Card className="flex flex-col  h-full ">
      <CardContent className="flex-1 pb-0 m-0 p-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="price" nameKey="name">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>

            <Legend content={renderLegend} />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm"></CardFooter>
    </Card>
  );
};

export default PieChart_Purchases;
