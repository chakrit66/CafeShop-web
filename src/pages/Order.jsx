import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import Table_order from "@/components/order/Table_order";

const Order = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <h1 className="text-2xl my-2">Order</h1>
      <div className="flex justify-between gap-4 my-4">
        <Input
          className="max-w-[300px]"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div></div>
      </div>
      <Table_order search={search} />
    </div>
  );
};

export default Order;
