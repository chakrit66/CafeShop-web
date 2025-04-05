import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCafeStore from "@/store/cafe-store";
import numeral from "numeral";
import { Button } from "../ui/button";

const TotalSales = ({ startDate, endDate }) => {
  const token = useCafeStore((s) => s.token);
  const getSalesReport = useCafeStore((s) => s.getSalesReport);
  const dataSalesReport = useCafeStore((s) => s.dataSalesReport);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getSalesReport(token, startDate, endDate);
  }, [startDate, endDate, token]);

  useEffect(() => {
    if (dataSalesReport) {
      setLoading(false); // ข้อมูลพร้อมแล้ว, เปลี่ยนสถานะเป็นไม่โหลด
    }
  }, [dataSalesReport]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardDescription>Total Sales</CardDescription>
        <CardTitle className="text-3xl ">
          ฿
          {loading ? (
            <div>...</div> 
          ) : (
            numeral(dataSalesReport.totalSales).format("0,0.00") 
          )}
        </CardTitle>
      </CardHeader>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default TotalSales;
