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

const TotalNonMemberSales = ({ data }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardDescription>Total Non Member Sales</CardDescription>
        <CardTitle className="text-3xl ">
          ฿{numeral(data).format("0,0.00")}
        </CardTitle>
      </CardHeader>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default TotalNonMemberSales;
