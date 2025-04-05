import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useCafeStore from "@/store/cafe-store";

const Filters_pd = () => {
  const token = useCafeStore((s) => s.token);
  const getDataProducts = useCafeStore((s) => s.getDataProducts);
  const actionSearchProduct = useCafeStore((s) => s.actionSearchProduct);

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const cat = useCafeStore((s) => s.cat);
  const getDataCat = useCafeStore((s) => s.getDataCat);

  useEffect(() => {
    getDataCat(token);
  }, []);

  // ค้นหาสินค้าจาก search
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

  // ค้นหาสินค้าตามหมวดหมู่
  useEffect(() => {
    if (selectedCategories.length > 0) {
      actionSearchProduct(token, { category: selectedCategories });
    } else {
      getDataProducts(token);
    }
  }, [selectedCategories]);

  // ฟังก์ชันเลือก/ยกเลิกหมวดหมู่
  const toggleCategory = (cat_id) => {
    setSelectedCategories((prev) =>
      prev.includes(cat_id) ? prev.filter((id) => id !== cat_id) : [...prev, cat_id]
    );
  };

  return (
    <div className="flex justify-between py-1 my-2">
      <div className="flex gap-2">
        {cat.map((item) => (
          <Button
            key={item.cat_id}
            onClick={() => toggleCategory(item.cat_id)}
            variant={selectedCategories.includes(item.cat_id) ? "default" : "outline"}
            className="px-3 py-1 text-sm"
          >
            {item.cat_name}
          </Button>
        ))}
      </div>

      <Input
        className="xl:max-w-[300px] md:max-w-[200px]"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Filters_pd;
