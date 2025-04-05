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
import Swal from "sweetalert2";
import Edit_cus from "./Edit_cus";
import Remove_cus from "./Remove_cus";
import PurchaseHistory from "./PurchaseHistory";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";

const Table_cus = ({ search }) => {
  const token = useCafeStore((s) => s.token);

  const getDataCus = useCafeStore((s) => s.getDataCus);
  const dataCus = useCafeStore((s) => s.cus);

  const [selectedCusId, setSelectedCusId] = useState(null);

  useEffect(() => {
    getDataCus(token);
  }, []);

  const filtered = dataCus.filter((item) =>
    item.cus_name.toLowerCase().includes(search.toLowerCase())
  );

  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Tel.</TableHead>
          <TableHead>Purchase history</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtered.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="w-[30px]">{index + 1}</TableCell>
            <TableCell>{item.cus_name}</TableCell>
            <TableCell>{calculateAge(item.birthday)}</TableCell>
            <TableCell>{item.gender}</TableCell>
            <TableCell>{item.tel}</TableCell>
            <TableCell>
              <Button
                variant="free"
                onClick={() => setSelectedCusId(item.cus_id)}
              >
                <List />
              </Button>
            </TableCell>
            <TableCell className="flex justify-between p-1 gap-1 max-w-[100px]">
              <Edit_cus id={item.cus_id} />
              <Remove_cus id={item.cus_id} name={item.cus_name} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    {selectedCusId && (
        <PurchaseHistory
          cusId={selectedCusId}
          onClose={() => setSelectedCusId(null)}
        />
      )}
    </div>
  );
};

export default Table_cus;
