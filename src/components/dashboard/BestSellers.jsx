import React, { useEffect, useState } from "react";
import useCafeStore from "@/store/cafe-store";
import { getBestSellers } from "@/api/dashboard";
import { ScrollArea } from "@/components/ui/scroll-area";

const BestSellers = ({ startDate, endDate }) => {
  const token = useCafeStore((s) => s.token);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    getBestSellers(token, startDate, endDate)
      .then((res) => {
        console.log(res.data);
        setBestSellers(res.data); // Save the fetched data in the state
      })
      .catch((err) => {
        console.log(err);
      });
  }, [startDate, endDate, token]);

  return (
    <ScrollArea className="border rounded-lg p-2 max-h-[490px]  overflow-y-auto">
  <div>
    <h2 className="text-2xl font-semibold mb-2">
      Best Sellers
    </h2>
    <div className="">
      {bestSellers.map((item, index) => (
        <div key={index} className="flex items-center justify-between p-2">
          <div className="flex items-center space-x-2">
            <div className="">
              {item.images.length > 0 ? (
                <img
                  className="w-16 h-16 rounded-full p-1"
                  src={item.images[0].url}
                  alt={item.product_name}
                />
              ) : (
                <div className="w-16 h-16 text-black rounded-full flex text-center justify-center">
                  No image
                </div>
              )}
            </div>
            <span className="">{item.product_name}</span>
          </div>
          <span>{item.total_sales}</span>
        </div>
      ))}
    </div>
  </div>
</ScrollArea>

  );
};

export default BestSellers;
