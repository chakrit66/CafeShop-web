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

const ProfitLoss = ({ startDate, endDate }) => {
  const token = useCafeStore((s) => s.token);
  const getProfitLoss = useCafeStore((s) => s.getProfitLoss);
  const profitOrLoss = useCafeStore((s) => s.profitOrLoss);
  const statusProfitOrLoss = useCafeStore((s) => s.statusProfitOrLoss);

  useEffect(() => {
    getProfitLoss(token, startDate, endDate);
  }, [startDate, endDate]);
  return (
    <Card className="h-full">
      <CardHeader>
        <CardDescription>{statusProfitOrLoss}</CardDescription>
        <CardTitle className="text-3xl ">
          ฿ {numeral(profitOrLoss).format("0,0.00")}
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

export default ProfitLoss;
