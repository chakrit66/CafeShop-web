import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import Swal from "sweetalert2";
import useCafeStore from "@/store/cafe-store";
import { removeProduct } from "@/api/product";

const Remove_product = ({ id, name }) => {
  const token = useCafeStore((s) => s.token);
  const getDataProducts = useCafeStore((s) => s.getDataProducts);

  const handleDelete = async () => {
    removeProduct(token, id)
      .then((res) => {
        Swal.fire(res.data.message, "", "success");
        getDataProducts(token);
      })
      .catch((err) =>
        Swal.fire(err.response?.data?.error || "An error occurred", "", "error")
      );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="free">
          <Trash2 className="text-red-500" size={19} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Product : {name} </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this Product? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={handleDelete} variant="destructive">
              Yes, Delete
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Remove_product;
