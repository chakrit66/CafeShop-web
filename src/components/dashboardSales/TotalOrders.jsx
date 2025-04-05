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

const TotalOrders = () => {
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
        <CardDescription>Total Orders</CardDescription>
        <CardTitle className="text-3xl ">
          {loading ? <div>กำลังโหลด...</div> : dataSalesReport.totalOrders}
        </CardTitle>
      </CardHeader>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default TotalOrders;
