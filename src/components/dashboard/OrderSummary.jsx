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

const OrderSummary = () => {
  const amountOrder = useCafeStore((s) => s.amountOrder);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardDescription>Total Order</CardDescription>
        <CardTitle className="text-3xl ">{amountOrder}</CardTitle>
      </CardHeader>
      <CardFooter>
        <Button size="free" variant='free'>View all</Button>
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;
