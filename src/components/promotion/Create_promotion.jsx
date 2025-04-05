"use client";

import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar"; // ใช้ Calendar ที่ให้มาจาก ShadCN
import { Textarea } from "@/components/ui/textarea";
import { createPromotion } from "@/api/promotion";
import useCafeStore from "@/store/cafe-store";
import Swal from "sweetalert2";

const Create_promotion = () => {
  const token = useCafeStore((s) => s.token);
  const getDataPromotion = useCafeStore((s) => s.getDataPromotion);

  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: "",
      discount: "",
      pm_type: "",
      min_order: "",
      member_only: false,
      description: "",
    },
  });

  const onSubmit = async (data) => {
    const form = {
      pm_name: data.name,
      discount: data.discount,
      pm_type: data.pm_type,
      min_order: data.min_order,
      member_only: data.member_only,
      description: data.description,
      start_date: dateRange?.from,
      end_date: dateRange?.to,
    };
    console.log(form)
    await createPromotion(token, form)
      .then((res) => {
        console.log(res);
        Swal.fire("Promotion created successfully!", "", "success");
        getDataPromotion(token);
      })
      .catch((err) => {
        Swal.fire(
          "Error",
          "Failed to create Promotion. Please try again.",
          "error"
        );
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="success">+ New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Promotion</DialogTitle>
          <DialogDescription>
            Enter promotion details and click save.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left">Name</Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter name"
                    className="col-span-3"
                    required
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left">Discount</Label>
              <Controller
                name="discount"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter Discount"
                    className="col-span-3"
                    type="number"
                    required
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left">Type</Label>
              <div className="flex gap-2">
                <Controller
                  name="pm_type"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Checkbox
                        checked={field.value === "PERCENTAGE"}
                        onCheckedChange={() =>
                          setValue("pm_type", "PERCENTAGE")
                        }
                      />
                      <Label>PERCENTAGE</Label>

                      <Checkbox
                        checked={field.value === "FIXED_AMOUNT"}
                        onCheckedChange={() =>
                          setValue("pm_type", "FIXED_AMOUNT")
                        }
                      />
                      <Label>FIXED_AMOUNT</Label>
                    </>
                  )}
                />
              </div>
            </div>

            {/* ส่วนนี้สำหรับเลือกช่วงวันที่ */}
            <div className="grid gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2} // แสดงเดือนทั้งหมด 2 เดือน
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left">Min Order</Label>
              <Controller
                name="min_order"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter Min price"
                    className="col-span-3"
                    type="number"
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left">Status</Label>
              <div className="flex gap-2">
                <Controller
                  name="member_only"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          setValue("member_only", checked)
                        }
                      />
                      <Label>Member</Label>
                    </>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left">Description</Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="description here."
                    className="col-span-3 max-h-[50px]"
                  />
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

export default Create_promotion;
