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
import moment from "moment";
import useCafeStore from "@/store/cafe-store";
import { HistoryBuyCus } from "@/api/customer";

const PurchaseHistory = ({ cusId, onClose }) => {
  const token = useCafeStore((s) => s.token);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (cusId) {
      HistoryBuyCus(token, cusId)
        .then((res) => {
          if (res.data) {
            //console.log(res.data);
            setData(res.data);
          } else {
            setData({});
          }
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          setData({});
        });
    }
  }, [cusId]);
  return (
    <Dialog open={Boolean(cusId)} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-screen-lg">
        <DialogHeader>
          <DialogTitle>Purchase History</DialogTitle>
          <DialogDescription> </DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.ord_id.substring(0, 8)}</TableCell>
                <TableCell>
                  {moment(item.order.createdAt).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>{item.order.total} บาท</TableCell>
              </TableRow>
            )) || (
              <TableRow>
                <TableCell colSpan={3}>No Data</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DialogFooter>
          <DialogClose asChild></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseHistory;
