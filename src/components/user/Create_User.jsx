import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
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

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

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
import useCafeStore from "@/store/cafe-store";
import { createUser } from "@/api/user";
import Swal from "sweetalert2";

const Create_User = () => {
  const { register, handleSubmit, control } = useForm();

  const token = useCafeStore((s) => s.token);
  const dataRole = useCafeStore((s) => s.dataRole);
  const getDataRole = useCafeStore((s) => s.getDataRole);
  const getDataUser = useCafeStore((s) => s.getDataUsers);

  useEffect(() => {
    if (token) {
      getDataRole(token);
    }
  }, [token]);

  const onSubmit = async (data) => {
    const form = {
      ...data,
    };

    await createUser(token, form)
      .then((res) => {
        Swal.fire(res.data.message, "", "success");
        getDataUser(token);
      })
      .catch((err) =>
        Swal.fire(err.response?.data?.error || "An error occurred", "", "error")
      );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="success">+ New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Employee</DialogTitle>
          <DialogDescription>
            Enter employee details and click save.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {/* Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                {...register("name", { required: true })}
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
                defaultValue={null}
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

            {/* Role */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Role</Label>
              <Controller
                name="role_id"
                control={control}
                defaultValue=""
                render={({ field }) => {
                  const selectedRole = dataRole.find(
                    (role) => role.role_id === field.value
                  );

                  return (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value?.toString()}
                    >
                      <SelectTrigger className="w-[280px]">
                        <SelectValue
                          placeholder={selectedRole?.role_name || "Select role"}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {dataRole.map((role) => (
                          <SelectItem
                            key={role.role_id}
                            value={role.role_id.toString()}
                          >
                            {role.role_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  );
                }}
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

            {/* Password */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password", { required: true })}
                placeholder="Enter password"
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
  );
};

export default Create_User;
