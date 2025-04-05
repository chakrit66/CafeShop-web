import useCafeStore from "@/store/cafe-store";
import { CircleMinus } from "lucide-react";

const List_pd = () => {
  const dataCarts = useCafeStore((s) => s.carts);
  const calTotalPrice = useCafeStore((s) => s.calTotalPrice);
  const addPomotion = useCafeStore((s) => s.addPomotion);
  const actionRemovePromotion = useCafeStore((s) => s.actionRemovePromotion);
  const calDiscount = useCafeStore((s) => s.calDiscount);

  // const calDiscount = () => {
  //   let totalDiscount = 0;
  //   const totalPrice = calTotalPrice();
  //   addPomotion.forEach((promo) => {
  //     if (promo.pm_type === "PERCENTAGE") {
  //       totalDiscount += (totalPrice * promo.discount) / 100;
  //     } else if (promo.pm_type === "FIXED_AMOUNT") {
  //       totalDiscount += promo.discount;
  //     }
  //   });
  //   return totalDiscount;
  // };

  return (
    <div className="col-span-2">
      {dataCarts.map((item, index) => (
        <div key={index} className="border rounded-md mb-2 p-2">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center px-2">
              {item.images.length > 0 ? (
                <img className="h-20 rounded-lg" src={item.images[0].url} />
              ) : (
                <div className="w-16 h-16 border rounded-md flex items-center justify-center p-1">
                  No Image
                </div>
              )}
              <div>
                <p>{item.pd_name}</p>
                <p>
                  {item.price} x {item.count}
                </p>
              </div>
            </div>
            <div className="px-2 py-1">{item.price * item.count}</div>
          </div>
        </div>
      ))}

      {addPomotion.map((promo, index) => (
        <div key={index} className="flex justify-end items-center gap-8">
          <span className="text-lg ml-auto">{promo.pm_name} :</span>
          <span className="text-lg">
            {promo.pm_type === "PERCENTAGE"
              ? `-${promo.discount}%`
              : `-${promo.discount} ฿`}
          </span>
          <div
            onClick={() => actionRemovePromotion(promo.pm_id)}
            className="px-2 py-1"
          >
            <CircleMinus size={19} className="text-red-500" />
          </div>
        </div>
      ))}

      <div className="flex justify-end items-center gap-8">
        <span className="text-lg ml-auto">discount :</span>
        <div></div>
        <span className="text-lg">-{calDiscount()} ฿</span>
      </div>

      <div className="flex justify-end items-center gap-8 my-2">
        <span className="text-3xl ml-auto">Total :</span>
        <span className="text-3xl">{calTotalPrice() - calDiscount()} ฿</span>
      </div>
    </div>
  );
};

export default List_pd;
