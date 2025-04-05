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

const ShowRevenue = ({ data }) => {
  return (
        <Card className="h-full border-green-400">
          <CardHeader>
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-3xl text-green-400">
              ฿{numeral(data).format("0,0.00")}
            </CardTitle>
          </CardHeader>
          <CardFooter></CardFooter>
        </Card>
  )
}

export default ShowRevenue