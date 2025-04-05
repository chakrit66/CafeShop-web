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
import Remove_cat from "./Remove_cat";
import Edit_cat from "./Edit_cat";
import { ScrollArea } from "@/components/ui/scroll-area";

const Table_cat = () => {
  const token = useCafeStore((s) => s.token);
  const cat = useCafeStore((s) => s.cat);
  const getDataCat = useCafeStore((s) => s.getDataCat);

  const type = useCafeStore((s) => s.type);

  useEffect(() => {
    getDataCat(token);
  }, [token]);

  return (
    <ScrollArea className="max-h-[400px] min-h-[400px] overflow-y-auto ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cat.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="w-[30px]">{index + 1}</TableCell>
              <TableCell className="w-[150px]">{item.cat_name}</TableCell>
              <TableCell className="w-[150px]">{item.type.type_name}</TableCell>
              <TableCell className="flex justify-between p-1 gap-1 max-w-[100px]">
                <Edit_cat
                  id={item.cat_id}
                  name={item.cat_name}
                  type_id={item.type.type_id}
                />
                <Remove_cat id={item.cat_id} name={item.cat_name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default Table_cat;
