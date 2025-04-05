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

const AvgOrder = () => {
  const dataSalesReport = useCafeStore((s) => s.dataSalesReport);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (dataSalesReport) {
      setLoading(false);
    }
  }, [dataSalesReport]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardDescription>Avg Order </CardDescription>
        <CardTitle className="text-3xl ">
          ฿
          {loading ? (
            <div>กำลังโหลด...</div>
          ) : (
            numeral(dataSalesReport.avgOrder).format("0,0.00")
          )}
        </CardTitle>
      </CardHeader>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default AvgOrder;
