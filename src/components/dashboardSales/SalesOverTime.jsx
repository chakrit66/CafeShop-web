import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useCafeStore from "@/store/cafe-store";
import { salesOverTime } from "@/api/dashboardSales";
import { ChartColumnBig } from 'lucide-react';

const chartConfig = {
  sales: {
    label: "Sales Over Time",
    color: "hsl(var(--chart-1))",
  },
};

const SalesOverTime = ({ startDate, endDate, groupBy }) => {
  const token = useCafeStore((s) => s.token);
  const [chartData, setData] = useState([]);

  useEffect(() => {
    salesOverTime(token, startDate, endDate, groupBy)
      .then((res) => {
        // แปลงข้อมูลที่ได้จาก API ให้อยู่ในรูปแบบที่ BarChart ต้องการ
        const formattedData = Object.entries(res.data).map(([key, value]) => {
          let period;
          if (groupBy === "hour") {
            // แปลง key เป็นช่วงเวลา (เช่น "2025-04-03-8" เป็น "8:00")
            const [year, month, day, hour] = key.split("-");
            period = `${hour}:00`; // แสดงเป็นช่วงเวลา 8:00, 9:00, 10:00 ฯลฯ
          }else if (groupBy === "day") {
            const date = new Date(key);
            const dayName = getDayNameInShort(date);  // ชื่อวันย่อ
            const dayOfMonth = String(date.getDate()).padStart(2, '0'); // รับวันที่และเติมศูนย์ข้างหน้า (ถ้าเป็นเลขหลักเดียว)
          
            // ถ้าข้อมูลมากกว่า 20 วัน ให้แสดงแค่วันที่
            if (Object.keys(res.data).length > 20) {
              period = dayOfMonth; // แสดงแค่วันที่ เช่น "03", "11", "25"
            } else {
              period = `${dayOfMonth} ${dayName}`; // แสดงวันที่และชื่อวัน เช่น "03 Mon", "11 Tue"
            }
          }
          
           else if (groupBy === "month") {
            // แสดงชื่อเดือน (เช่น "Jan", "Feb", "Mar")
            const [year, month] = key.split("-");
            const date = new Date(year, month - 1);
            period = getMonthNameInShort(date); // ใช้ฟังก์ชันที่แปลงเป็นชื่อเดือนย่อ
          } else if (groupBy === "year") {
            // ถ้า groupBy เป็นปี (format เป็น YYYY)
            period = key;
          }

          return {
            period,
            sales: value,
          };
        });

        // หาก groupBy เป็น "hour" ให้เรียงข้อมูลจากน้อยไปมาก
        if (groupBy === "hour") {
          formattedData.sort((a, b) => {
            const hourA = parseInt(a.period.split(":")[0]);
            const hourB = parseInt(b.period.split(":")[0]);
            return hourA - hourB;
          });
        }

        setData(formattedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [startDate, endDate, token, groupBy]);

  // ฟังก์ชันแปลงชื่อวันย่อ
  const getDayNameInShort = (date) => {
    const options = { weekday: "short" }; // ใช้ 'short' เพื่อแสดงชื่อวันย่อ
    return date.toLocaleDateString("en-US", options); // ภาษาอังกฤษ
  };

  // ฟังก์ชันแปลงชื่อเดือนย่อ
  const getMonthNameInShort = (date) => {
    const options = { month: "short" }; // ใช้ 'short' เพื่อแสดงชื่อเดือนย่อ
    return date.toLocaleDateString("en-US", options); // ภาษาอังกฤษ
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="flex gap-3 items-center"> <ChartColumnBig /> Sales Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 21,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="sales" fill="hsl(var(--chart-1))" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SalesOverTime;
