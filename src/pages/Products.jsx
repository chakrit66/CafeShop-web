import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import Create_product from "@/components/product/Create_product";
import Table_products from "@/components/product/Table_products";

const Products = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <h1 className="text-2xl my-2">Products</h1>
      <div className="flex justify-between gap-4 my-4">
        <Input
          className="max-w-[300px]"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Create_product />
      </div>
      <Table_products search={search} />
    </div>
  );
};

export default Products;
