import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCafeStore from "@/store/cafe-store";
import moment from "moment";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import Detail_bill from "./Detail_bill";
import Remove_bill from "./Remove_bill";

const Table_bills = ({ search }) => {
  const token = useCafeStore((s) => s.token);
  const getDataBills = useCafeStore((s) => s.getDataBills);
  const bills = useCafeStore((s) => s.bills);
  const totalBills = useCafeStore((s) => s.totalBills);

  const [selectedBillId, setSelectedBillId] = useState(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(15);
  const totalPages = Math.ceil(totalBills / limit);

  const actionSearchBill = useCafeStore((s) => s.actionSearchBill);

  useEffect(() => {
    getDataBills(token, page, limit);
  }, [token, page, limit]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (search) {
        actionSearchBill(token, { query: search });
      } else {
        getDataBills(token, page, limit);
      }
    }, 200);
    return () => clearTimeout(delay);
  }, [token, search]);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Create At</TableHead>
            <TableHead>Id</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>By</TableHead>
            <TableHead>Details</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="w-[50px]">
                {index + 1 + (page - 1) * limit}
              </TableCell>
              <TableCell>
                {moment(item.createdAt).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell>{item.bill_id.substring(0, 8)}</TableCell>
              <TableCell>{item.total} บาท</TableCell>
              <TableCell>{item.employee.emp_name}</TableCell>
              <TableCell>
                <Button
                  variant="free"
                  onClick={() => setSelectedBillId(item.bill_id)}
                >
                  <List />
                </Button>
              </TableCell>
              <TableCell className="flex justify-between p-1 gap-1 max-w-[100px]">
                <Remove_bill id={item.bill_id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className={page === 1 ? "opacity-50 pointer-events-none" : ""}
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => setPage(i + 1)}
                isActive={page === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {totalPages > 5 && page < totalPages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className={
                page === totalPages ? "opacity-50 pointer-events-none" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {selectedBillId && (
        <Detail_bill
          billId={selectedBillId}
          onClose={() => setSelectedBillId(null)}
        />
      )}
    </div>
  );
};

export default Table_bills;
