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
import Remove_ing from "./Remove_ing";
import Edit_ing from "./Edit_ing";
import { ScrollArea } from "@/components/ui/scroll-area";

const Table_ing = () => {
  const token = useCafeStore((s) => s.token);
  const ing = useCafeStore((s) => s.ing);
  const getDataIng = useCafeStore((s) => s.getDataIng);

  useEffect(() => {
    getDataIng(token);
  }, [token]);

  return (
    <ScrollArea className="max-h-[400px] min-h-[400px] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ing.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="w-[30px]">{index + 1}</TableCell>
              <TableCell className="w-[150px]">{item.ing_name}</TableCell>
              <TableCell className="w-[150px]">{item.unit.unit_name}</TableCell>
              <TableCell className="flex justify-between p-1 gap-1 max-w-[100px]">
                <Edit_ing
                  id={item.ing_id}
                  name={item.ing_name}
                  unit_id={item.unit.unit_id}
                />
                <Remove_ing id={item.ing_id} name={item.ing_name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default Table_ing;
