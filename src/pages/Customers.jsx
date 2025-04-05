import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import Create_cus from "@/components/customers/Create_cus";
import Table_cus from "@/components/customers/Table_cus";

const Customers = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <h1 className="text-2xl my-2">Customers</h1>
      <div className="flex justify-between gap-4 my-4">
        <Input
          className="max-w-[300px]"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Create_cus />
      </div>
      <Table_cus search={search} />
    </div>
  );
};

export default Customers;
