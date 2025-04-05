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

const ShowCost = ({ data }) => {
  return (
        <Card className="h-full border-red-400">
          <CardHeader>
            <CardDescription>Total Cost</CardDescription>
            <CardTitle className="text-3xl text-red-400">
              ฿{numeral(data).format("0,0.00")}
            </CardTitle>
          </CardHeader>
          <CardFooter></CardFooter>
        </Card>
  )
}

export default ShowCost