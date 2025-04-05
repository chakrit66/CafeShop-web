import { useState, useEffect } from "react";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useCafeStore from "@/store/cafe-store";
import { generateQr } from "@/api/cart";

const ShowQr = ({ selectedPayment, handlePaymentChange }) => {
  const token = useCafeStore((state) => state.token);
  const [qrCode, setQrCode] = useState("");
  const calTotalPrice = useCafeStore((s) => s.calTotalPrice);
  const calDiscount = useCafeStore((s) => s.calDiscount);

  const getQr = async () => {
    try {
      const amount = calTotalPrice() - calDiscount();
      const res = await generateQr(token, {
        phoneNumber: "0832397810",
        amount,
      });
      setQrCode(res.data.qrCode);
    } catch (err) {
      console.error("Failed to generate QR code:", err);
    }
  };

  useEffect(() => {
    if (selectedPayment === false) {
      getQr();
    }
  }, [selectedPayment]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={selectedPayment ? "free" : "sky"}
          size="lg"
          className="w-1/2"
          onClick={() => handlePaymentChange(false)}
        >
          QR code
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>สแกน QR Code เพื่อชำระเงิน</AlertDialogTitle>
          <AlertDialogDescription>
            กรุณาสแกน QR Code ด้านล่างเพื่อดำเนินการชำระเงิน{" "}
            {calTotalPrice() - calDiscount()} ฿
          </AlertDialogDescription>
        </AlertDialogHeader>
        {qrCode ? (
          <img src={qrCode} alt="QR Code" className="mx-auto w-48 h-48" />
        ) : (
          <p className="text-center">กำลังโหลด QR Code...</p>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel>close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ShowQr;
