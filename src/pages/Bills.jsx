import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import Create_bill from "@/components/bills/Create_bill";
import Table_bills from "@/components/bills/Table_bills";

const Bills = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <h1 className="text-2xl my-2">Bills</h1>
      <div className="flex justify-between gap-4 my-4">
        <Input
          className="max-w-[300px]"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Create_bill />
      </div>
      <Table_bills search={search}/>
    </div>
  );
};

export default Bills;
