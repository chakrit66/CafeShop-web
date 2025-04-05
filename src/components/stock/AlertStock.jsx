import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import useCafeStore from "@/store/cafe-store";
import { checkStock } from "@/api/stock";

const AlertStock = () => {
  const token = useCafeStore((s) => s.token);
  const [lowStock, setLowStock] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchStock = async () => {
    try {
      const res = await checkStock(token);
      if (res.data.lowStockItems.length > 0) {
        setLowStock(res.data.lowStockItems);
      } else {
        setLowStock([]);
      }
    } catch (error) {
      console.error("❌ ไม่สามารถดึงข้อมูลสต็อกได้", error);
    }
  };

  useEffect(() => {
    fetchStock();
    const interval = setInterval(fetchStock, 60000); // เช็คทุก 1 นาที
    return () => clearInterval(interval);
  }, [token]);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" className="relative p-2">
            <Bell className="w-6 h-6 text-gray-600" />
            {lowStock.length > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                {lowStock.length}
              </span>
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>⚠️ แจ้งเตือนสต็อกต่ำ</AlertDialogTitle>
            <AlertDialogDescription>
              {lowStock.length > 0 && <span>มีสินค้าสต็อกต่ำกว่ากำหนด:</span>}
              <ul className="mt-2 list-disc pl-4">
                {lowStock.map((item) => (
                  <li key={item.ing_id}>
                    {item.ingredient.ing_name} คงเหลือ {item.amount}
                  </li>
                ))}
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ปิด</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AlertStock;
