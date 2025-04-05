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
import { Pencil, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
import { readUser, updateUser } from "@/api/user";

const Edit_User = ({ id }) => {
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      name: "",
      tel: "",
      gender: "",
      username: "",
    },
  });
  const [birthday, setBirthday] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const token = useCafeStore((s) => s.token);
  const getDataUser = useCafeStore((s) => s.getDataUsers);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  useEffect(() => {
    if (id && isOpen) {
      readUser(token, id)
        .then((user) => {
          //console.log(user.data);
          setValue("emp_name", user.data.emp_name);
          setValue("tel", user.data.tel);
          setValue("gender", user.data.gender);
          setValue("username", user.data.username);
          setBirthday(user.data.birthday ? new Date(user.data.birthday) : null);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [id, token, setValue, isOpen]);

  const onSubmit = async (data) => {
    const form = {
      ...data,
      birthday: birthday ? format(birthday, "yyyy-MM-dd") : null,
    };

    await updateUser(token, id, form)
      .then((res) => {
        Swal.fire(res.data.message, "", "success");
        closeDialog();
        getDataUser(token);
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
                <Label htmlFor="emp_name" className="text-right">
                  Name
                </Label>
                <Input
                  id="emp_name"
                  {...register("emp_name", { required: true })}
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
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "col-span-3 w-full justify-start text-left font-normal",
                        !birthday && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {birthday ? (
                        format(birthday, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={birthday}
                      onSelect={setBirthday}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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

              {/* Username */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  {...register("username", { required: true })}
                  placeholder="Enter username"
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

export default Edit_User;
