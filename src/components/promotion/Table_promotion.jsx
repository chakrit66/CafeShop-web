import React, { useEffect } from "react";
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
import { CircleCheck, CircleMinus } from "lucide-react";
import Remove_promotion from "./Remove_promotion";

const Table_promotion = () => {
  const token = useCafeStore((s) => s.token);
  const promotion = useCafeStore((s) => s.promotion);
  const getDataPromotion = useCafeStore((s) => s.getDataPromotion);

  useEffect(() => {
    getDataPromotion(token);
  }, [token]);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>discount</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>start_date</TableHead>
          <TableHead>end_date</TableHead>
          <TableHead>min_order</TableHead>
          <TableHead>active</TableHead>
          <TableHead>member_only</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {promotion.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="w-[30px]">{index + 1}</TableCell>

            <TableCell>{item.pm_name}</TableCell>
            <TableCell>{item.discount}</TableCell>
            <TableCell>
              {item.pm_type === "PERCENTAGE" ? "%" : "฿"}
            </TableCell>
            <TableCell>
              {item.start_date
                ? moment(item.start_date).format("DD/MM/YYYY")
                : "--"}
            </TableCell>
            <TableCell>
              {item.end_date
                ? moment(item.end_date).format("DD/MM/YYYY")
                : "--"}
            </TableCell>
            <TableCell>
              {item.min_order_amount ? item.min_order_amount : "--"}
            </TableCell>
            <TableCell>
              {item.active === true ? (
                <CircleCheck size={19} className="text-green-500" />
              ) : (
                <CircleMinus size={19} className="text-red-500" />
              )}
            </TableCell>
            <TableCell>
              {item.member_only === true ? (
                <CircleCheck size={19} className="text-green-500" />
              ) : (
                <CircleMinus size={19} className="text-red-500" />
              )}
            </TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell className="flex justify-between  max-w-[100px]">
              
              <Remove_promotion id={item.pm_id} name={item.pm_name} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Table_promotion;
