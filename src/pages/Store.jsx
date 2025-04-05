import CardShow_pd from "@/components/store/CardShow_pd";
import Cart_pd from "@/components/store/Cart_pd";
import Filters_pd from "@/components/store/Filters_pd";
import React from "react";

const Store = () => {
  return (
    <div className="flex flex-row gap-2">
      <div className="xl:basis-3/4 md:basis-2/3  p-2 border rounded-lg min-h-[500px]">
        <Filters_pd/>
        <CardShow_pd />
      </div>
      <div className="xl:basis-1/4 md:basis-1/3 p-2 border rounded-lg min-h-[500px] ">
        <Cart_pd />
      </div>
    
    </div>
  );
};

export default Store;
