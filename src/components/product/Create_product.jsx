import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller, useFieldArray } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import useCafeStore from "@/store/cafe-store";
import Swal from "sweetalert2";
import Uploadfile from "./Uploadfile";
import { createProduct } from "@/api/product";

const Create_product = () => {
  const { register, handleSubmit, control, reset, setValue, watch } = useForm();
  const token = useCafeStore((s) => s.token);
  const type = useCafeStore((s) => s.type);
  const cat = useCafeStore((s) => s.cat);
  const [isLoading, setIsLoading] = useState(false);
  const getDataProducts = useCafeStore((s) => s.getDataProducts);
  const getDataCat = useCafeStore((s) => s.getDataCat);
  const getDataType = useCafeStore((s) => s.getDataType);

  const [selectedType, setSelectedType] = useState(""); // state เก็บค่า Type ที่เลือก
  const [filteredCat, setFilteredCat] = useState([]); // state เก็บ Category ที่กรองแล้ว

  const { fields, append, remove } = useFieldArray({
    control,
    name: "serveType",
  });

  useEffect(() => {
    getDataCat(token);
    getDataType(token);
  }, [token]);

  useEffect(() => {
    // อัปเดตรายการ Category ตาม Type ที่เลือก
    if (selectedType) {
      setFilteredCat(cat.filter((c) => c.type_id.toString() === selectedType));
    } else {
      setFilteredCat([]); // ถ้ายังไม่ได้เลือก Type ให้ Category เป็นค่าว่าง
    }
  }, [selectedType, cat]);

  const images = watch("images") || []; // ดึงค่าปัจจุบันของ images

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const payload = {
        ...data,
        images,
        serveType: data.serveType
          .filter((s) => s.serve.trim() !== "" && s.price) // ✅ กรอง serveType ที่ serve ไม่ว่าง และมีราคา
          .map((s) => ({
            serve: s.serve,
            price: parseFloat(s.price), // ✅ แปลงเป็น float ก่อนส่ง
          })),
      };

      if (payload.serveType.length === 0) {
        delete payload.serveType; // ถ้าไม่มี serveType ที่ถูกต้อง ลบออก
      }

      await createProduct(token, payload);
      Swal.fire("Product created successfully!", "", "success");

      reset();
      setValue("images", []); // ✅ ล้างค่ารูปภาพ
      getDataProducts(token);
    } catch (error) {
      console.error("Error creating product:", error);
      Swal.fire(
        "Error",
        "Failed to create product. Please try again.",
        "error"
      );
    }
    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="success">+ New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
          <DialogDescription>
            Enter product details and click save.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {/* Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                Name
              </Label>
              <Input
                id="name"
                {...register("name", { required: true })}
                placeholder="Enter name"
                className="col-span-3"
              />
            </div>

            {/* Price */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-left">
                Price
              </Label>
              <Input
                id="price"
                {...register("price", { required: true })}
                placeholder="Enter price"
                className="col-span-3"
                type="number"
              />
            </div>

            {/* Type */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left">Type</Label>
              <Controller
                name="type_id"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedType(value); // อัปเดตค่า type ที่เลือก
                    }}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {type.map((t) => (
                        <SelectItem
                          key={t.type_id}
                          value={t.type_id.toString()}
                        >
                          {t.type_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Category */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left">Category</Label>
              <Controller
                name="cat_id"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value?.toString()}
                      disabled={!selectedType} // ปิดการใช้งานถ้ายังไม่เลือก Type
                    >
                      <SelectTrigger className="w-[280px]">
                        <SelectValue
                          placeholder={
                            selectedType
                              ? "Select category"
                              : "Select type first"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredCat.length > 0 ? (
                          filteredCat.map((c) => (
                            <SelectItem
                              key={c.cat_id}
                              value={c.cat_id.toString()}
                            >
                              {c.cat_name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem key="none" value="none" disabled>
                            No categories available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </>
                )}
              />
            </div>

            {/* Description */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left">Description</Label>
              <Textarea
                {...register("description")}
                placeholder="description here."
                className="col-span-3 max-h-[50px]"
              />
            </div>

            <div className="grid gap-4 py-4">
              {/* Serve Type */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-left">Serve Type</Label>
                <div className="col-span-3 space-y-2">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      {/* ประเภทเสิร์ฟ */}
                      <Controller
                        name={`serveType.${index}.serve`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Hot">Hot</SelectItem>
                              <SelectItem value="Iced">Iced</SelectItem>
                              <SelectItem value="Blended">Blended</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />

                      {/* ราคา */}
                      <Input
                        {...register(`serveType.${index}.price`, {
                          required: true,
                        })}
                        placeholder="Price"
                        type="number"
                        className="w-[100px]"
                      />

                      {/* ปุ่มลบ */}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => remove(index)}
                      >
                        X
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* ปุ่มเพิ่ม Serve Type */}
              <Button
                type="button"
                variant="outline"
                onClick={() => append({ serve: "", price: "" })}
              >
                + Add Serve Type
              </Button>
            </div>

            {/* Upload Image */}
            <Uploadfile form={{ setValue, watch }} />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create_product;
