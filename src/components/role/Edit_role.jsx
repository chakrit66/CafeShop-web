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
import { updateRole } from "@/api/role";
import useCafeStore from "@/store/cafe-store";
import Swal from "sweetalert2";

const Edit_role = ({ id, name }) => {
  const token = useCafeStore((s) => s.token);
  const getDataRole = useCafeStore((s) => s.getDataRole);

  const [isOpen, setIsOpen] = useState(false);
  const [roleName, setRoleName] = useState(name);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleSave = async (e) => {
    e.preventDefault();

    await updateRole(token, id, { name: roleName })
      .then((res) => {
        Swal.fire(res.data.message, "", "success");
        getDataRole(token);
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
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>
              Enter Role name and click save.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave}>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Role name
                </Label>
                <Input
                  id="name"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
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

export default Edit_role;
