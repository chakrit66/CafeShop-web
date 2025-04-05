import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import useCafeStore from "@/store/cafe-store";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import ShowQr from "./ShowQr";
import Swal from "sweetalert2";
import { searchTel } from "@/api/customer";
import { CircleMinus } from "lucide-react";
import { createOrder } from "@/api/order";
import { useNavigate } from "react-router-dom";
import AlertReceipt from "./AlertReceipt";

const Pay_ment = () => {
  const token = useCafeStore((state) => state.token);
  const promotion = useCafeStore((s) => s.promotion);
  const getDataPromotion = useCafeStore((s) => s.getDataPromotion);
  const dataCarts = useCafeStore((s) => s.carts);
  const actionAddPromotion = useCafeStore((s) => s.actionAddPromotion);
  const actionAddMember = useCafeStore((s) => s.actionAddMember);
  const nameMember = useCafeStore((s) => s.member);
  const actionRemoveMember = useCafeStore((s) => s.actionRemoveMember);
  const clearCart = useCafeStore((s) => s.clearCart);

  const calTotalPrice = useCafeStore((s) => s.calTotalPrice);
  const calDiscount = useCafeStore((s) => s.calDiscount);
  const addPomotion = useCafeStore((s) => s.addPomotion);

  const navigate = useNavigate();

  const [selectedPayment, setSelectedPayment] = useState(true);
  const [moneyPayment, setMoneyPayment] = useState(0);
  const [change, setChange] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [product, setProduct] = useState({});
  const [productSum, setProductSum] = useState([]);

  useEffect(() => {
    getDataPromotion(token);
  }, []);

  const handlePaymentChange = (selected) => {
    setSelectedPayment(selected);
  };

  const handleClickMoney = (value) => {
    setMoneyPayment(value);
  };

  const handleSubmitPm = (e) => {
    e.preventDefault();
    if (selectedPromotion) {
      actionAddPromotion(selectedPromotion);
    } else {
      Swal.fire("กรุณาเลือกโปรโมชั่นก่อน", "", "warning");
    }
  };

  const searchMember = async (e) => {
    e.preventDefault();

    if (!phoneNumber) {
      Swal.fire("กรุณากรอกเบอร์โทรศัพท์", "", "warning");
      return;
    }
    await searchTel(token, { tel: phoneNumber })
      .then((res) => {
        actionAddMember(res.data);
        Swal.fire(`Welcome : ${res.data.cus_name}`, "", "success");
      })
      .catch((err) => {
        Swal.fire("ไม่พบสมาชิก", "", "error");
        console.log(err);
      });
  };

  const handleSubmit = async () => {
    if (selectedPayment) {
      const price = calTotalPrice() - calDiscount();
      if (price <= moneyPayment) {
        setChange(moneyPayment - price);
        await createOrder(token, {
          dataCarts,
          addPomotion,
          pay: "cash",
          ord_type: nameMember[0] ? "Member" : "Not_member",
          cus_id: nameMember[0] ? nameMember[0].cus_id : null,
        })
          .then((res) => {
            clearCart();
            setProduct(res.data.newData);
            setProductSum(res.data.total);
            setIsDialogOpen(true);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        Swal.fire("เกิดข้อผิดพลาด", "โปรดกรอกจำนวนเงินใหม่", "error");
      }
    } else {
      await createOrder(token, {
        dataCarts,
        addPomotion,
        pay: "prCode",
        ord_type: nameMember[0] ? "Member" : "Not_member",
        cus_id: nameMember[0] ? nameMember[0].cus_id : null,
      })
        .then((res) => {
          clearCart();
          setProduct(res.data.newData);
          setProductSum(res.data.total);
          setIsDialogOpen(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="px-2">
      <AlertReceipt
        cash={moneyPayment}
        change={change}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        navigate={navigate}
        product={product}
        total={productSum}
      />
      <div>
        {nameMember[0] ? (
          <div className="flex gap-5">
            <p>Welcome : {nameMember[0].cus_name}</p>
            <div
              onClick={() => actionRemoveMember(nameMember[0].cus_id)}
              className="px-2 py-1"
            >
              <CircleMinus size={19} className="text-red-500" />
            </div>{" "}
          </div>
        ) : (
          ""
        )}
      </div>

      <form
        onSubmit={searchMember}
        className="flex items-center space-x-2 mb-3"
      >
        <Input
          placeholder="Enter Tel. Member"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Button type="submit">search</Button>
      </form>

      <form onSubmit={handleSubmitPm} className="flex my-1 gap-2">
        <Select
          value={selectedPromotion ? JSON.stringify(selectedPromotion) : ""}
          onValueChange={(value) =>
            setSelectedPromotion(value ? JSON.parse(value) : null)
          }
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="เลือกโปรโมชัน">
              {selectedPromotion ? selectedPromotion.pm_name : "เลือกโปรโมชัน"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {promotion
              .filter((item) =>
                nameMember[0] ? true : item.member_only === false
              )
              .map((item) => (
                <SelectItem key={item.pm_id} value={JSON.stringify(item)}>
                  {item.pm_name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <Button type="submit" disabled={!selectedPromotion}>
          Add
        </Button>
      </form>

      <div className="my-2">
        <span>วิธีการชำระเงิน :</span>
        <div className="flex gap-1 w-full my-1">
          <Button
            variant={selectedPayment ? "sky" : "free"}
            size="lg"
            className="w-1/2"
            onClick={() => handlePaymentChange(true)}
          >
            เงินสด
          </Button>
          <ShowQr
            selectedPayment={selectedPayment}
            handlePaymentChange={handlePaymentChange}
          />
        </div>
        {selectedPayment && (
          <div className="mt-2">
            <Input
              placeholder="Enter money"
              value={moneyPayment}
              type="number"
              onChange={(e) => setMoneyPayment(e.target.value)}
            />
            <div className="flex gap-3 mt-2">
              <Button variant="money" onClick={() => handleClickMoney(50)}>
                50
              </Button>
              <Button variant="money" onClick={() => handleClickMoney(100)}>
                100
              </Button>
              <Button variant="money" onClick={() => handleClickMoney(500)}>
                500
              </Button>
              <Button variant="money" onClick={() => handleClickMoney(1000)}>
                1000
              </Button>
            </div>
          </div>
        )}
      </div>

      <Button
        variant="success"
        className="w-full my-2"
        disabled={dataCarts.length < 1}
        onClick={handleSubmit}
      >
        ชำระเงิน
      </Button>
      <Link to={"/store"}>
        <Button variant="destructive" className="w-full">
          Back
        </Button>
      </Link>
    </div>
  );
};

export default Pay_ment;
