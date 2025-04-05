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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Swal from "sweetalert2";
import useCafeStore from "@/store/cafe-store";
import { readProduct, updateProduct } from "@/api/product";
import { Textarea } from "@/components/ui/textarea";
import Uploadfile from "./Uploadfile";

const Edit_product = ({ id }) => {
  const { register, handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      pd_name: "",
      price: 0,
      type_id: "",
      cat_id: "",
      description: "",
      images: [],
      serveType: [], // เพิ่มค่าเริ่มต้น serveType เป็นอาร์เรย์ว่าง
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "serveType",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = useCafeStore((s) => s.token);
  const type = useCafeStore((s) => s.type);
  const cat = useCafeStore((s) => s.cat);
  const getDataProducts = useCafeStore((s) => s.getDataProducts);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  useEffect(() => {
    if (id && isOpen) {
      readProduct(token, id)
        .then((res) => {
          setValue("pd_name", res.data.pd_name);
          setValue("price", res.data.price);
          setValue("type_id", res.data.type_id);
          setValue("cat_id", res.data.cat_id);
          setValue("description", res.data.description);
          setValue("images", res.data.images);
          setValue("serveType", res.data.serveType || []);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    }
  }, [id, token, setValue, isOpen]);

  const images = watch("images") || [];

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await updateProduct(token, id, data);
      Swal.fire("Success!", "Product updated successfully.", "success");
      getDataProducts(token);
      closeDialog();
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire("Error", "Failed to update product.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button size="icon" variant="free" onClick={openDialog}>
        <Pencil className="text-amber-400" size={19} />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Enter product details and click save.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              {/* Name */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pd_name" className="text-left">Name</Label>
                <Input
                  id="pd_name"
                  {...register("pd_name", { required: true })}
                  placeholder="Enter name"
                  className="col-span-3"
                />
              </div>

              {/* Price */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-left">Price</Label>
                <Input
                  id="price"
                  {...register("price", { required: true })}
                  placeholder="Enter price"
                  className="col-span-3"
                  type="number"
                />
              </div>

              {/* Serve Type */}
              <div className="grid gap-4 py-4">
                <Label className="text-left">Serve Type</Label>
                <div className="space-y-2">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      {/* ประเภทเสิร์ฟ */}
                      <Controller
                        name={`serveType.${index}.serve`}
                        control={control}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
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
                        {...register(`serveType.${index}.price`, { required: true })}
                        placeholder="Price"
                        type="number"
                        className="w-[100px]"
                      />

                      {/* ปุ่มลบ */}
                      <Button variant="destructive" size="sm" onClick={() => remove(index)}>
                        X
                      </Button>
                    </div>
                  ))}
                  {/* ปุ่มเพิ่มประเภทเสิร์ฟ */}
                  <Button type="button" variant="outline" size="sm" onClick={() => append({ serve: "", price: "" })}>
                    + Add Serve Type
                  </Button>
                </div>
              </div>

              {/* Description */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-left">Description</Label>
                <Textarea
                  {...register("description")}
                  placeholder="Enter description here."
                  className="col-span-3 max-h-[50px]"
                />
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
    </>
  );
};

export default Edit_product;
