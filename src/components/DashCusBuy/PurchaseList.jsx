import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardTitle } from "@/components/ui/card";
import useCafeStore from "@/store/cafe-store";
import moment from "moment";
import { ClipboardList } from "lucide-react";
import { getPurchase } from "@/api/dashCusBuy";

const PurchaseList = ({ startDate, endDate }) => {
  const [data, setData] = useState([]);

  const token = useCafeStore((s) => s.token);
  useEffect(() => {
    getPurchase(token, startDate, endDate)
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
      <CardTitle className="flex gap-3 m-2  items-center">
        <ClipboardList /> List Orders
      </CardTitle>

      <Table>
        <TableHeader className="bg-sky-200">
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{moment(item.createdAt).format("LLL")}</TableCell>
              <TableCell>{item.ord_id.substring(0, 8)}</TableCell>
              <TableCell>{item.ord_type}</TableCell>
              <TableCell className="text-right">{item.total} </TableCell>
              <TableCell> ฿</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default PurchaseList;
