import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import useCafeStore from "@/store/cafe-store";

const ServeTypeDialog = () => {
  const { selectedProduct, actionAddCart, resetSelectedProduct } = useCafeStore();
  const [selectedServe, setSelectedServe] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // ตรวจสอบสถานะ selectedProduct เมื่อเริ่มต้น
  useEffect(() => {
    // ลบ selectedProduct ออกจาก sessionStorage เมื่อหน้ารีเฟรช
    sessionStorage.removeItem("selectedProduct");

    // ปิด dialog หากไม่มี selectedProduct
    if (!selectedProduct) {
      setIsOpen(false);
    } else {
      setIsOpen(true); // เปิด dialog ถ้ามี selectedProduct
    }
  }, [selectedProduct]); // คอยตรวจสอบการเปลี่ยนแปลงของ selectedProduct

  const serveTypes = Array.isArray(selectedProduct?.serveType) ? selectedProduct.serveType : [];

  const handleConfirm = () => {
    if (selectedServe) {
      const serveDetail = serveTypes.find((s) => s.serve === selectedServe);
      const productToAdd = {
        ...selectedProduct,
        count: 1,
        serveType: selectedServe,
        price: serveDetail ? serveDetail.price : selectedProduct.price,
        pd_name: `${selectedProduct.pd_name} (${selectedServe})`,
      };

      actionAddCart(productToAdd);

      // รีเซ็ต selectedProduct และปิด dialog
      setIsOpen(false);
      resetSelectedProduct();
      sessionStorage.removeItem("selectedProduct"); // ลบ selectedProduct จาก sessionStorage
    }
  };

  const handleCancel = () => {
    // รีเซ็ต selectedProduct และปิด dialog เมื่อยกเลิก
    setIsOpen(false);
    resetSelectedProduct();
    sessionStorage.removeItem("selectedProduct"); // ลบ selectedProduct จาก sessionStorage
  };

  const handleSelection = (serve) => {
    setSelectedServe(serve);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>เลือกประเภทเสิร์ฟ</AlertDialogTitle>
          <AlertDialogDescription>
            โปรดเลือกประเภทเสิร์ฟสำหรับ {selectedProduct?.pd_name}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* แสดงปุ่มเลือก serveType */}
        {serveTypes.length > 0 ? (
          <div className="flex gap-2">
            {serveTypes.map((s) => (
              <Button
                key={s.serve}
                variant={selectedServe === s.serve ? "default" : "outline"}
                onClick={() => handleSelection(s.serve)}
              >
                {s.serve} - {s.price} บาท
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-red-500"></p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={!selectedServe}>
            ยืนยัน
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ServeTypeDialog;
