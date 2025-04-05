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

const CostSummary = ({ startDate, endDate }) => {
  const token = useCafeStore((s) => s.token);
  const getProfitLoss = useCafeStore((s) => s.getProfitLoss);
  const totalCost = useCafeStore((s) => s.totalCost);

  useEffect(() => {
    getProfitLoss(token, startDate, endDate);
  }, [startDate, endDate]);
  return (
    <Card className="h-full">
      <CardHeader>
        <CardDescription>Total Cost</CardDescription>
        <CardTitle className="text-3xl ">
          ฿ {numeral(totalCost).format("0,0.00")}
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <Button size="free" variant="free">
          View all
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CostSummary;
