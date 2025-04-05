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
import useCafeStore from "@/store/cafe-store";
import { stockWithHistory } from "@/api/stock";
import moment from "moment";
import { TicketMinus, TicketPlus } from "lucide-react";

const LogStock = ({ ingId, onClose }) => {
  const token = useCafeStore((s) => s.token);
  const [logDetails, setLogDetails] = useState({});

  useEffect(() => {
    if (ingId) {
      stockWithHistory(token, ingId)
        .then((res) => {
          if (res.data) {
            //console.log(res.data);
            setLogDetails(res.data);
          } else {
            console.log(res.data);
            setLogDetails({});
          }
        })
        .catch((err) => {
          console.error("Error fetching order details:", err);
          setLogDetails({});
        });
    }
  }, [ingId]);

  // Separate the logs into RECEIVED and USED
  const receivedLogs =
    logDetails?.stockHistory?.filter((item) => item.type === "RECEIVED") || [];
  const usedLogs =
    logDetails?.stockHistory?.filter((item) => item.type === "USED") || [];

  return (
    <Dialog open={Boolean(ingId)} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-screen-md">
        <DialogHeader>
          <DialogTitle> {logDetails?.ingredient?.ing_name}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        {/* Flexbox container to display both tables side by side */}
        <div className="flex space-x-8">
          {/* RECEIVED Table */}
          <div className="w-1/2">
            <div className="flex gap-2">
              <TicketPlus className="text-green-500" />
              <h3 className="font-semibold mb-2">Received History</h3>
              <TicketPlus className="text-green-500" />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {receivedLogs.length > 0 ? (
                  receivedLogs.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {moment(item.date).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>+ {item.quantity}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2}>No Data</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* USED Table */}
          <div className="w-1/2">
            <div className="flex gap-2">
              <TicketMinus className="text-red-500" />
              <h3 className="font-semibold mb-2">Used History</h3>
              <TicketMinus className="text-red-500" />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usedLogs.length > 0 ? (
                  usedLogs.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {moment(item.date).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>- {item.quantity}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2}>No Data</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogStock;
