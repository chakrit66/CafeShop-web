import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { format } from "date-fns";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import useCafeStore from "@/store/cafe-store";
import { readCus, updateCus } from "@/api/customer";

const Edit_cus = ({ id }) => {
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      name: "",
      tel: "",
      gender: "",
      username: "",
      birthday: "",
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const token = useCafeStore((s) => s.token);
  const getDataCus = useCafeStore((s) => s.getDataCus);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  useEffect(() => {
    if (id && isOpen) {
      readCus(token, id)
        .then((user) => {
          // Format the birthday before setting the value
          const formattedBirthday = format(
            new Date(user.data.birthday),
            "yyyy-MM-dd"
          );
          setValue("cus_name", user.data.cus_name);
          setValue("tel", user.data.tel);
          setValue("gender", user.data.gender);
          setValue("birthday", formattedBirthday);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [id, token, setValue, isOpen]);

  const onSubmit = async (data) => {
    const form = {
      ...data,
    };

    await updateCus(token, id, form)
      .then((res) => {
        Swal.fire(res.data.message, "", "success");
        closeDialog();
        getDataCus(token);
      })
      .catch((err) =>
        Swal.fire(err.response?.data?.error || "An error occurred", "", "error")
      );
  };

  return (
    <>
      <Button size="icon" variant="free" onClick={openDialog}>
        <Pencil className="text-amber-400" size={19} />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>
              Enter employee details and click save.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              {/* Name */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cus_name" className="text-right">
                  Name
                </Label>
                <Input
                  id="cus_name"
                  {...register("cus_name", { required: true })}
                  placeholder="Enter name"
                  className="col-span-3"
                />
              </div>

              {/* Tel */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tel" className="text-right">
                  Tel
                </Label>
                <Input
                  id="tel"
                  {...register("tel", { required: true })}
                  placeholder="Enter tel"
                  className="col-span-3"
                />
              </div>

              {/* Birthday */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Birthday</Label>
                <input
                  type="date"
                  placeholder="birthday"
                  id="birthday"
                  className="input w-[277px] border rounded-sm p-1"
                  {...register("birthday", { required: true })}
                />
              </div>

              {/* Gender */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Gender</Label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
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

export default Edit_cus;
