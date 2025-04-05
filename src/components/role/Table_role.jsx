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
import Remove_role from "./Remove_role";
import Edit_role from "./Edit_role";

const Table_role = () => {
  const token = useCafeStore((s) => s.token);
  const dataRole = useCafeStore((s) => s.dataRole);
  const getDataRole = useCafeStore((s) => s.getDataRole);

  useEffect(() => {
    getDataRole(token);
  }, [token]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataRole.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="w-[30px]">{index + 1}</TableCell>
            <TableCell className="w-[150px]">{item.role_name}</TableCell>
            <TableCell className="flex justify-between p-1 gap-1 max-w-[100px]">
              <Edit_role id={item.role_id} name={item.role_name} />
              <Remove_role id={item.role_id} name={item.role_name} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Table_role;
