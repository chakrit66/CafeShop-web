import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCafeStore from "@/store/cafe-store";
import Swal from "sweetalert2";
import { updateType } from "@/api/type";

const Edit_type = ({ id, name }) => {
  const token = useCafeStore((s) => s.token);
  const getDataType = useCafeStore((s) => s.getDataType);

  const [isOpen, setIsOpen] = useState(false);
  const [typeName, setTypeName] = useState(name);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleSave = async (e) => {
    e.preventDefault();

    await updateType(token, id, { name: typeName })
      .then((res) => {
        Swal.fire(res.data.message, "", "success");
        getDataType(token);
        closeDialog();
      })
      .catch((err) => {
        Swal.fire(
          err.response?.data?.error || "An error occurred",
          "",
          "error"
        );
        closeDialog();
      });
  };
  return (
    <>
      <Button size="icon" variant="free" onClick={openDialog}>
        <Pencil className="text-amber-400" size={19} />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Type</DialogTitle>
            <DialogDescription>
              Enter Type name and click save.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Type name
                </Label>
                <Input
                  id="name"
                  value={typeName}
                  onChange={(e) => setTypeName(e.target.value)}
                  placeholder="Enter name"
                  className="col-span-3"
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Save</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Edit_type;
