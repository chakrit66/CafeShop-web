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
import Remove_type from "./Remove_type";
import Edit_type from "./Edit_type";
import { ScrollArea } from "@/components/ui/scroll-area";

const Table_type = () => {
  const token = useCafeStore((s) => s.token);
  const type = useCafeStore((s) => s.type);
  const getDataType = useCafeStore((s) => s.getDataType);
  useEffect(() => {
    getDataType(token);
  }, [token]);
  return (
    <ScrollArea className="max-h-[400px] min-h-[400px] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Type name</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {type.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="w-[30px]">{index + 1}</TableCell>
              <TableCell className="w-[150px]">{item.type_name}</TableCell>
              <TableCell className="flex justify-between p-1 gap-1 max-w-[100px]">
                <Edit_type id={item.type_id} name={item.type_name} />
                <Remove_type id={item.type_id} name={item.type_name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default Table_type;
