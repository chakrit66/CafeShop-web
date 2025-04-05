import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import numeral from "numeral";

const TotalNonMemberOrders = ({ data }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardDescription>Total Non Member Orders</CardDescription>
        <CardTitle className="text-3xl ">{data}</CardTitle>
      </CardHeader>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default TotalNonMemberOrders;
