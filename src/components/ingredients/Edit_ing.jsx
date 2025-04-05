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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateIng } from "@/api/ingredients";

const Edit_ing = ({ id, name, unit_id }) => {
  const token = useCafeStore((s) => s.token);
  const getDataIng = useCafeStore((s) => s.getDataIng);
  const unit = useCafeStore((s) => s.unit);

  const [isOpen, setIsOpen] = useState(false);
  const [ingName, setIngName] = useState(name);
  const [unitId, setUnitId] = useState(String(unit_id || ""));

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleSave = async (e) => {
    e.preventDefault();

    await updateIng(token, id, { name: ingName, unit_id: unitId })
      .then((res) => {
        Swal.fire(res.data.message, "", "success");
        getDataIng(token);
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
            <DialogTitle>Edit Ingredient</DialogTitle>
            <DialogDescription>
              Enter Ingredient name and click save.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Ingredient name
                </Label>
                <Input
                  id="name"
                  value={ingName}
                  onChange={(e) => setIngName(e.target.value)}
                  placeholder="Enter name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Unit name
                </Label>
                <Select
                  onValueChange={(value) => setUnitId(value)}
                  value={unitId || ""}
                >
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {unit.map((item) => (
                      <SelectItem
                        key={item.unit_id}
                        value={String(item.unit_id)}
                      >
                        {item.unit_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

export default Edit_ing;
