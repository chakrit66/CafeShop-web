import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Logs } from "lucide-react";
import useCafeStore from "@/store/cafe-store";
import Min_quantity from "./Min_quantity";
import LogStock from "./LogStock";

const Table_stock = ({ search }) => {
  const token = useCafeStore((s) => s.token);
  const stock = useCafeStore((s) => s.stock);
  const getDataStock = useCafeStore((s) => s.getDataStock);
  const [selectedIngId, setSelectedIngId] = useState(null);

  useEffect(() => {
    getDataStock(token);
  }, [token]);

  const filteredStock = stock.filter((item) =>
    item.ingredient.ing_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Remaining amount</TableHead>
            <TableHead>Minimum quantity</TableHead>
            <TableHead>Logs</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStock.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="w-[30px]">{index + 1}</TableCell>
              <TableCell>
                {item.ingredient.ing_name} {item.ingredient.unit.unit_name}
              </TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{item.amount_min}</TableCell>
              <TableCell>
                <Button
                  variant="free"
                  onClick={() => setSelectedIngId(item.ingredient.ing_id)}
                >
                  <Logs />
                </Button>
              </TableCell>
              <TableCell>
                <Min_quantity
                  id={item.ingredient.ing_id}
                  name={item.ingredient.ing_name}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedIngId && (
        <LogStock
          ingId={selectedIngId}
          onClose={() => setSelectedIngId(null)}
        />
      )}
    </div>
  );
};

export default Table_stock;
