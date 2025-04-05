import { useState, useEffect } from "react";
import useCafeStore from "@/store/cafe-store";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import List_pd from "@/components/checkOut/List_pd";
import { searchTel } from "@/api/customer";
import { Input } from "@/components/ui/input";
import Pay_ment from "@/components/checkOut/Pay_ment";

const CheckOut = () => {
  const dataCarts = useCafeStore((s) => s.carts);
  const calTotalPrice = useCafeStore((s) => s.calTotalPrice);
  const token = useCafeStore((state) => state.token);

  const handleSubmit = async () => {
    const amount = calTotalPrice();
    if (selectedPayment) {
      if (amount <= moneyPayment) {
        const change = moneyPayment - amount;
        Swal.fire(`ทอน ${change} บาท`, `เงินสด ${moneyPayment} บาท`, "success");
      } else {
        Swal.fire("เกิดข้อผิดพลาด", "โปรดกรอกจำนวนเงินใหม่", "error");
      }
    } else {
      try {
        const res = await generateQr(token, {
          phoneNumber: "0832397810",
          amount,
        });

        setQrCode(res.data.qrCode);

        Swal.fire({
          title: "สแกนเพื่อชำระเงิน",
          text: `รวมทั้งหมด ${amount} บาท`,
          imageUrl: res.data.qrCode,
          imageWidth: 250,
          imageHeight: 250,
          imageAlt: "QR Code",
          confirmButtonText: "ตกลง",
        });
      } catch (error) {
        console.error(error);
        Swal.fire("เกิดข้อผิดพลาด", "ไม่สามารถสร้าง QR ได้", "error");
      }
    }
  };

  const handleButtonClick = (value) => {
    setMoneyPayment(value);
  };

  const handlePaymentChange = (selected) => {
    setSelectedPayment(selected);
  };

  const [memberChecked, setMemberChecked] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nameMember, setNameMember] = useState("");

  const handleOnChangeMember = (checked) => {
    setOpenDialog(checked);
  };




  return (
    <div>
      <div className="flex gap-3 mb-3">
        <ShoppingCart />
        <p className="text-xl mb-4 ">รายการสินค้า ({dataCarts.length})</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <List_pd  />
        <Pay_ment />
      </div>
    </div>
  );
};

export default CheckOut;
