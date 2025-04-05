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
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import useCafeStore from "@/store/cafe-store";
import { removeBill } from "@/api/bills";

const Remove_bill = ({ id }) => {
  const token = useCafeStore((s) => s.token);
  const getDataBills = useCafeStore((s) => s.getDataBills);

  const handleDelete = async () => {
    removeBill(token, id)
      .then((res) => {
        Swal.fire(res.data.message, "", "success");
        getDataBills(token);
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
          <DialogTitle>Delete Bill : {id.substring(0, 8)}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this Bill? This action cannot be
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

export default Remove_bill;
