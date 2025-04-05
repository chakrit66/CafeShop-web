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

const ShowProfitLoss = ({ data,name }) => {
  return (
        <Card className="h-full border-cyan-400">
          <CardHeader>
            <CardDescription>{name||'-'}</CardDescription>
            <CardTitle className="text-3xl text-cyan-400">
              ฿{numeral(data).format("0,0.00")}
            </CardTitle>
          </CardHeader>
          <CardFooter></CardFooter>
        </Card>
  )
}

export default ShowProfitLoss