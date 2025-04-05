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
import { updateCat } from "@/api/category";

const Edit_cat = ({ id, name, type_id }) => {
  const token = useCafeStore((s) => s.token);
  const getDataCat = useCafeStore((s) => s.getDataCat);
  const type = useCafeStore((s) => s.type);

  const [isOpen, setIsOpen] = useState(false);
  const [catName, setCatName] = useState(name);
  const [typeId, setTypeId] = useState(String(type_id || ""));

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleSave = async (e) => {
    e.preventDefault();

    await updateCat(token, id, { name: catName, type_id: typeId })
      .then((res) => {
        Swal.fire(res.data.message, "", "success");
        getDataCat(token);
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
            <DialogTitle>Edit Categoty</DialogTitle>
            <DialogDescription>
              Enter Categoty name and click save.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Categoty name
                </Label>
                <Input
                  id="name"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="Enter name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Type name
                </Label>
                <Select
                  onValueChange={(value) => setTypeId(value)}
                  value={typeId || ""}
                >
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {type.map((item) => (
                      <SelectItem
                        key={item.type_id}
                        value={String(item.type_id)}
                      >
                        {item.type_name}
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

export default Edit_cat;
