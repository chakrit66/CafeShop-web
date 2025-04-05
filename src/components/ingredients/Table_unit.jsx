import { useEffect } from "react";
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
import Edit_unit from "./Edit_unit";
import Remove_unit from "./Remove_unit";
import { ScrollArea } from "@/components/ui/scroll-area";

const Table_unit = () => {
  const token = useCafeStore((s) => s.token);
  const unit = useCafeStore((s) => s.unit);
  const getDataUnit = useCafeStore((s) => s.getDataUnit);
  useEffect(() => {
    getDataUnit(token);
  }, [token]);

  return (
    <ScrollArea className="max-h-[400px] min-h-[400px] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Unit name</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {unit.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="w-[30px]">{index + 1}</TableCell>
              <TableCell className="w-[150px]">{item.unit_name}</TableCell>
              <TableCell className="flex justify-between p-1 gap-1 max-w-[100px]">
                <Edit_unit id={item.unit_id} name={item.unit_name} />
                <Remove_unit id={item.unit_id} name={item.unit_name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default Table_unit;
