import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useForm } from "react-hook-form";
import Combobox_ing from "../recipes/Combobox_ing";
import useCafeStore from "@/store/cafe-store";
import Swal from "sweetalert2";
import { createBill } from "@/api/bills";
import { X } from "lucide-react";

const Create_bill = () => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [billItems, setBillItems] = useState([]);
  const ingredients = useCafeStore((s) => s.ing);
  const token = useCafeStore((s) => s.token);
  const getDataBills = useCafeStore((s) => s.getDataBills);

  const selectedIngredientId = watch("ingredient");
  const selectedIngredient = ingredients.find(
    (item) => item.ing_id == selectedIngredientId
  );
  const ingredientName = selectedIngredient
    ? selectedIngredient.ing_name
    : "No ingredient selected";
  const unitName = selectedIngredient
    ? selectedIngredient.unit.unit_name
    : "No unit selected";

  const onSubmit = (data) => {
    if (!data.ingredient || !data.quantity || !data.amount || !data.price) {
      return;
    }

    setBillItems((prevItems) => [
      ...prevItems,
      {
        ing_id: selectedIngredientId,
        ingredient: { ing_name: ingredientName, unit: { unit_name: unitName } },
        quantity: data.quantity,
        amount: data.amount,
        price: data.price,
      },
    ]);

    reset();
  };

  const handleSave = async () => {
    if (!billItems.length) return;

    const data = { total, bill: billItems };

    try {
      const res = await createBill(token, data);

      Swal.fire(res.data.success, "", "success");

      setBillItems([]);
      await getDataBills(token);
      reset();
    } catch (err) {
      Swal.fire(err.response?.data?.error || "เกิดข้อผิดพลาด", "", "error");
    }
  };

  const handleDelete = (index) => {
    setBillItems((prevData) => prevData.filter((_, i) => i !== index));
  };

  const total = billItems.reduce(
    (acc, item) =>
      acc + parseFloat(item.amount || 0) * parseFloat(item.price || 0),
    0
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="success">+ New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-screen-lg">
        <DialogHeader>
          <DialogTitle>Create a New Bill</DialogTitle>
          <DialogDescription>
            Enter bill details and click save.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex border rounded-lg mb-3">
            <div className="flex flex-col border-r-2 p-2 gap-2">
              <Combobox_ing form={{ setValue, watch }} />
              <Input
                placeholder="Quantity"
                type="number"
                {...register("quantity", { required: true, min: 1 })}
              />
              <Input
                placeholder="Amount"
                type="number"
                {...register("amount", { required: true, min: 1 })}
              />
              <Input
                placeholder="Price"
                type="number"
                {...register("price", { required: true, min: 0 })}
              />
              <Button type="submit" variant="sky">
                Add
              </Button>
            </div>
            <div className="px-1 grow relative">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {item.ingredient.ing_name}{" "}
                        {item.ingredient.unit.unit_name}
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>
                        <X size={13} onClick={() => handleDelete(index)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>{total.toFixed(2)}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              disabled={!billItems.length}
              onClick={handleSave}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Create_bill;
