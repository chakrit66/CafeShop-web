import React from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CircleCheck } from "lucide-react";
import ReceiptPrint from "./ReceiptPrint"; // นำเข้า ReceiptPrint
import { receiptData } from "@/api/order";
import useCafeStore from "@/store/cafe-store";

const AlertReceipt = ({
  cash,
  change,
  isOpen,
  onClose,
  navigate,
  product,
  total,
}) => {
  const token = useCafeStore((state) => state.token);

  const handlePrint = async () => {
    try {
      const response = await receiptData(token, product.ord_id); // เรียกข้อมูลจาก API
      console.log("📌 Receipt Info:", response.data); // ดูข้อมูลที่ได้รับจาก API
      
      const receiptInfo = response.data.receiptInfo;
  
      if (receiptInfo) {
        const { customer, items, totalAmount } = receiptInfo;
        
        let receiptContent = `
          <h2 style="text-align: center; margin-bottom: 10px;">CAFE Shop</h2>
          <p style="text-align: center; margin-bottom: 10px;">ใบเสร็จรับเงิน</p>
          <p style="text-align: center; margin-bottom: 10px;">วันที่: ${new Date().toLocaleDateString()}</p>
          <p style="text-align: left; margin-left: 10px;">ลูกค้า: ${customer.name || 'ไม่ระบุ'}</p>
          <p style="text-align: left; margin-left: 10px;">โทร: ${customer.phone || '-'}</p>
          <hr style="border-top: 1px dashed #000;">
          <ul style="list-style-type: none; padding: 0; margin: 0;">
        `;
        
        items.forEach(item => {
          receiptContent += `
            <li style="text-align: left; margin: 5px 0;">${item.productName} x${item.quantity} - ${item.totalPrice} บาท</li>
          `;
        });
  
        receiptContent += `
          </ul>
          <hr style="border-top: 1px dashed #000;">
          <p style="text-align: right; margin-right: 10px; font-weight: bold;">รวมทั้งหมด: ${totalAmount} บาท</p>
          <p style="text-align: center; font-style: italic; margin-top: 10px;">ขอบคุณที่ใช้บริการ!</p>
        `;
  
        const printWindow = window.open("", "_blank");
        printWindow.document.write(`
          <html>
            <head>
              <style>
                @media print {
                  body {
                    font-family: Arial, sans-serif;
                    font-size: 12pt;
                    margin: 0;
                    padding: 0;
                    width: 80mm; /* ขนาดกระดาษ 80mm */
                    height: auto;
                    max-width: 80mm;
                  }
                  h2 {
                    font-size: 16pt;
                    margin: 0;
                    padding: 0;
                  }
                  p {
                    font-size: 12pt;
                    margin: 0;
                    padding: 0;
                  }
                  ul {
                    margin: 0;
                    padding: 0;
                  }
                  li {
                    font-size: 12pt;
                    margin-bottom: 5px;
                  }
                  hr {
                    margin: 5px 0;
                  }
                }
              </style>
            </head>
            <body>
              <div style="width: 100%; max-width: 80mm; margin: 0 auto;">
                ${receiptContent}
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.onload = () => {
          printWindow.print(); // เรียกคำสั่งพิมพ์
        };
      } else {
        console.error("❌ ไม่พบข้อมูลใบเสร็จ");
      }
    } catch (error) {
      console.error("❌ เกิดข้อผิดพลาดในการพิมพ์ใบเสร็จ:", error);
    }
  };
  
  
  
  

  const handleClose = () => {
    onClose();
    navigate("/store");
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-col items-center text-center w-full">
            <CircleCheck size={40} className="text-green-400 mb-2" />
            ชำระเงินสำเร็จ
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          {cash > 0 && (
            <div className="w-full flex flex-col items-center text-center py-5 px-3 gap-3">
              <div className="flex justify-between w-full px-20 border-b-2 pb-3">
                <span>เงินสด </span>
                <span>{cash}</span>
              </div>
              <div className="flex justify-between w-full px-20">
                <p>ทอน </p>
                <p>{change}</p>
              </div>
            </div>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full flex">
          <Button className="flex-1 text-center" onClick={handlePrint}>
            พิมพ์ใบเสร็จ
          </Button>
          <AlertDialogAction
            className="flex-1 text-center"
            onClick={handleClose}
          >
            เสร็จ
          </AlertDialogAction>
        </AlertDialogFooter>
        {/* <div className="hidden">
          <ReceiptPrint
            cash={cash}
            change={change}
            product={product}
            total={total}
          />
        </div> */}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertReceipt;
