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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCafeStore from "@/store/cafe-store";
import Swal from "sweetalert2";
import { createCus } from "@/api/customer";
import moment from "moment";

const Create_cus = () => {
  const { register, handleSubmit, control } = useForm();

  const token = useCafeStore((s) => s.token);
  const getDataCus = useCafeStore((s) => s.getDataCus);

  const onSubmit = async (data) => {
    const form = {
      ...data,
    };
    //console.log(form);
    await createCus(token, form)
      .then((res) => {
        Swal.fire(res.data.message, "", "success");
        getDataCus(token);
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
          <DialogTitle>Create Customer</DialogTitle>
          <DialogDescription>
            Enter Customer details and click save.
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

export default Create_cus;
