import Card_cat from "@/components/type/Card_cat";
import Card_type from "@/components/type/Card_type";
import React from "react";

const Type = () => {
  return (
    <div className="flex flex-col p-2 gap-4 sm:flex-row ">
      <Card_type />
      <Card_cat />
    </div>
  );
};

export default Type;
