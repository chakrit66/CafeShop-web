import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import moment from "moment";
import useCafeStore from "@/store/cafe-store";
import { readBill } from "@/api/bills";

const Detail_bill = ({ billId, onClose }) => {
  const token = useCafeStore((s) => s.token);
  const [bill, setData] = useState({});

  useEffect(() => {
    if (billId) {
      readBill(token, billId)
        .then((res) => {
          if (res.data) {
            setData(res.data);
          } else {
            setData({});
          }
        })
        .catch((err) => {
          console.error("Error fetching order details:", err);
          setData({});
        });
    }
  }, [billId]);

  return (
    <Dialog open={Boolean(billId)} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-screen-lg">
        <DialogHeader>
          <DialogTitle>
            Bill Id : {billId}
          </DialogTitle>
          <DialogDescription>by </DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bill?.bill?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  {item.ingredient.ing_name} {item.ingredient.unit.unit_name}
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>Total</TableCell>
              <TableCell>{bill.total} บาท</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <DialogFooter>
          <DialogClose asChild></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Detail_bill;
