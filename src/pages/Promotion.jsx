import Create_promotion from "@/components/promotion/Create_promotion";
import Table_promotion from "@/components/promotion/Table_promotion";
import React from "react";

const Promotion = () => {
  return (
    <div>
      <h1 className="text-2xl my-2">Promotion</h1>
      <div className="flex justify-between gap-4 my-4">
        <div></div>
        <Create_promotion />
      </div>
      <Table_promotion />
    </div>
  );
};

export default Promotion;
