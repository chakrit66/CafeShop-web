import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCafeStore from "@/store/cafe-store";
import Swal from "sweetalert2";
import Remove_product from "./Remove_product";
import Edit_product from "./Edit_product";
import { Switch } from "../ui/switch";
import { changeStatusProduct } from "@/api/product";

const Table_products = ({ search }) => {
  const token = useCafeStore((s) => s.token);
  const products = useCafeStore((s) => s.products);
  const getDataProducts = useCafeStore((s) => s.getDataProducts);
  const actionSearchProduct = useCafeStore((s) => s.actionSearchProduct);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (search) {
        actionSearchProduct(token, { query: search });
      } else {
        getDataProducts(token);
      }
    }, 200);
    return () => clearTimeout(delay);
  }, [token, search]);

  const cat = useCafeStore((s) => s.cat);
  const getDataCat = useCafeStore((s) => s.getDataCat);
  const [selectedCategory, setSelectedCategory] = useState([]);

  useEffect(() => {
    getDataCat(token);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      actionSearchProduct(token, { category: [selectedCategory] });
    } else {
      getDataProducts(token);
    }
  }, [selectedCategory]);

  const handleOnChangeStatus = async (value, id) => {
    const data = {
      id: id,
      status: value,
    };

    try {
      const res = await changeStatusProduct(token, data);
      Swal.fire(res.data.message, "", "success");
      getDataProducts(token);
    } catch (err) {
      Swal.fire(err.response?.data?.error || "An error occurred", "", "error");
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>
            <Select onValueChange={(value) => setSelectedCategory(value)}>
              <SelectTrigger className="w-max border-none px-0 shadow-none focus:ring-0">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {cat.map((item, index) => (
                  <SelectItem key={index} value={item.cat_id}>
                    {item.cat_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="w-[30px]">{index + 1}</TableCell>
            <TableCell className="w-[100px]">
              {item.images.length > 0 ? (
                <img
                  className="w-16 h-16 rounded-lg border p-1"
                  src={item.images[0].url}
                />
              ) : (
                <div className="w-16 h-16  text-black  rounded-md flex items-center justify-center ">
                  No image
                </div>
              )}
            </TableCell>
            <TableCell>{item.pd_name}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>{item.type.type_name}</TableCell>
            <TableCell>{item.cat.cat_name}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>
              <Switch
                onCheckedChange={(value) =>
                  handleOnChangeStatus(value, item.pd_id)
                }
                checked={item.status}
              />
            </TableCell>
            <TableCell className="flex justify-between  max-w-[100px]">
              <Edit_product id={item.pd_id} />
              <Remove_product id={item.pd_id} name={item.pd_name} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Table_products;
