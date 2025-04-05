import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription,
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
import { readOrder } from "@/api/order";
import useCafeStore from "@/store/cafe-store";

const Detail_order = ({ ordId, onClose }) => {
  const token = useCafeStore((s) => s.token);
  const [orderDetails, setOrderDetails] = useState({});
  const [name, setName] = useState("");

  useEffect(() => {
    if (ordId) {
      readOrder(token, ordId)
        .then((res) => {
          if (res.data) {
            setOrderDetails(res.data);
          } else {
            setOrderDetails({});
          }
        })
        .catch((err) => {
          console.error("Error fetching order details:", err);
          setOrderDetails({});
        });
    }
  }, [ordId]);

  useEffect(() => {
    setName(orderDetails.cus?.[0]?.cus?.cus_name ?? "");
  }, [orderDetails]);

  return (
    <Dialog open={Boolean(ordId)} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-screen-lg">
        <DialogHeader>
          <DialogTitle>Order Id : {ordId}</DialogTitle>
          <DialogDescription>
            {name && <span>customer name: {name}</span>}
          </DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderDetails?.order?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.products.pd_name}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.price} บาท</TableCell>
              </TableRow>
            )) || (
              <TableRow>
                <TableCell colSpan={3}>No Data</TableCell>
              </TableRow>
            )}
            {orderDetails?.cus?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.promotion.pm_name}</TableCell>
                <TableCell></TableCell>
                <TableCell>-{item.discount} บาท</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={1}></TableCell>
              <TableCell>Total</TableCell>
              <TableCell>{orderDetails?.total || "N/A"} บาท</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Detail_order;
