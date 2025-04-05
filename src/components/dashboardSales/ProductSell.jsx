import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useCafeStore from "@/store/cafe-store";
import { getProductSell } from "@/api/dashboardSales";
import { Tag } from "lucide-react";

const ProductSell = ({ startDate, endDate }) => {
  const [data, setData] = useState([]);

  const token = useCafeStore((s) => s.token);
  useEffect(() => {
    getProductSell(token, startDate, endDate)
      .then((res) => {
        //console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [startDate, endDate, token]);

  return (
    <Card className="py-2">
      <CardTitle className="flex gap-3 m-2 items-center">
        <Tag /> List Products
      </CardTitle>
      <Table>
        <TableHeader className="bg-sky-200">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.pd_name}</TableCell>
              <TableCell>{item.total_sold}</TableCell>
              <TableCell>{item.total_revenue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ProductSell;
