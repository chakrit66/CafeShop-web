import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SumOrders = ({ data }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardDescription>Total Orders</CardDescription>
        <CardTitle className="text-3xl ">{data}</CardTitle>
      </CardHeader>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default SumOrders;
