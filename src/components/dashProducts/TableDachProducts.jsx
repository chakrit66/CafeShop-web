import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardTitle } from "@/components/ui/card";
import useCafeStore from "@/store/cafe-store";
import moment from "moment";
import { ClipboardList } from "lucide-react";
import { getDashProducts } from "@/api/dashProducts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TableDachProducts = ({ startDate, endDate }) => {
  const [data, setData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const cat = useCafeStore((s) => s.cat);
  const getDataCat = useCafeStore((s) => s.getDataCat);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const [selectedType, setSelectedType] = useState([]);
  const type = useCafeStore((s) => s.type);
  const getDataType = useCafeStore((s) => s.getDataType);

  const token = useCafeStore((s) => s.token);

  useEffect(() => {
    getDataCat(token);
    getDataType(token);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      //console.log(selectedCategory);
      const filtered = data.filter(
        (item) => item.category.cat_id === selectedCategory
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedType) {
      //console.log(selectedType);
      const filtered = data.filter(
        (item) => item.type.type_id === selectedType
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [selectedType]);

  useEffect(() => {
    getDashProducts(token, startDate, endDate)
      .then((res) => {
        //console.log(res.data);
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [startDate, endDate, token]);


  const getDataProducts = ()=>{}

  return (
    <Card className="py-2">
      <CardTitle className="flex gap-3 m-2  items-center">
        <ClipboardList /> List Products
      </CardTitle>

      <Table>
        <TableHeader className="bg-sky-200">
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>
              <Select onValueChange={(value) => setSelectedCategory(value)}>
                <SelectTrigger className="w-max border-none px-0 shadow-none focus:ring-0">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {type.map((item, index) => (
                    <SelectItem key={index} value={item.type_id}>
                      {item.type_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableHead>
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
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="w-[40px] text-center">
                {index + 1}
              </TableCell>
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
              <TableCell>{item.productName}</TableCell>
              <TableCell>{item.type.type_name}</TableCell>
              <TableCell>{item.category.cat_name}</TableCell>
              <TableCell>{item.quantitySold}</TableCell>

              <TableCell className="text-right">{item.totalRevenue} </TableCell>
              <TableCell> ฿</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default TableDachProducts;
