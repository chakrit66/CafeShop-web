import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCafeStore from "@/store/cafe-store";
import Swal from "sweetalert2";
import { Settings } from "lucide-react";
import { update_min } from "@/api/stock";

const Min_quantity = ({ id, name }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const token = useCafeStore((s) => s.token);
  const getDataStock = useCafeStore((s) => s.getDataStock);

  const onSubmit = async (e) => {
    e.preventDefault(); // ป้องกัน refresh หน้าหลัง submit

    if (!amount || !id) {
      Swal.fire("Please enter a new Minimum quantity.", "", "warning");
      return;
    }

    const quantity = Number(amount);
    if (isNaN(quantity) || quantity < 0) {
      Swal.fire("Invalid quantity. Please enter a valid number.", "", "error");
      return;
    }

    setIsLoading(true);
    try {
      const res = await update_min(token, id, { amount: quantity });
      Swal.fire(res.data.message, "", "success");

      setAmount(""); // รีเซ็ตค่า
      getDataStock(token)
    } catch (err) {
      Swal.fire(err.response?.data?.error || "An error occurred", "", "error");
    }
    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="free">
          <Settings size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Minimum quantity: {name}</DialogTitle>
          <DialogDescription>
            Enter Minimum quantity and click save.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            {/* Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-left">
                Minimum
              </Label>
              <Input
                id="amount"
                placeholder="Enter quantity"
                className="col-span-3"
                type="number"
                value={amount}
                min="0"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="submit"
                id={`dialog-close-${id}`}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Min_quantity;
