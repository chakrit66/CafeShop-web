import Card_ing from "@/components/ingredients/Card_ing";
import Card_unit from "@/components/ingredients/Card_unit";
import React from "react";

const Ingredients = () => {
  return (
    <div className="flex flex-col p-2 gap-4 sm:flex-row ">
      <Card_unit />
      <Card_ing />
    </div>
  );
};

export default Ingredients;
