import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
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
import Detail_order from "./Detail_order";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import Remove_order from "./Remove_order";

const Table_order = ({ search }) => {
  const token = useCafeStore((s) => s.token);
  const getDataOrder = useCafeStore((s) => s.getDataOrder);
  const order = useCafeStore((s) => s.order);
  const totalOrders = useCafeStore((s) => s.totalOrders);

  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(15);
  const totalPages = Math.ceil(totalOrders / limit);

  const actionSearchOrder = useCafeStore((s) => s.actionSearchOrder);

  useEffect(() => {
    getDataOrder(token, page, limit);
  }, [token, page, limit]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (search) {
        actionSearchOrder(token, { query: search });
      } else {
        getDataOrder(token, page, limit);
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {order.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="w-[50px]">
                {index + 1 + (page - 1) * limit}
              </TableCell>
              <TableCell>
                {moment(item.createdAt).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell>{item.ord_id.substring(0, 8)}</TableCell>
              <TableCell>{item.total} บาท</TableCell>
              <TableCell>{item.employee.emp_name}</TableCell>
              <TableCell>
                <Button
                  variant="free"
                  onClick={() => setSelectedOrderId(item.ord_id)}
                >
                  <List />
                </Button>
              </TableCell>
              <TableCell>
                <Remove_order id={item.ord_id} />
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

      {selectedOrderId && (
        <Detail_order
          ordId={selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
        />
      )}
    </div>
  );
};

export default Table_order;
