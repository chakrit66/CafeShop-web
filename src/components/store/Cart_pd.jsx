import useCafeStore from "@/store/cafe-store";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { checkOut } from "@/api/cart";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Cart_pd = () => {
  const actionAddCart = useCafeStore((s) => s.actionAddCart);
  const dataCarts = useCafeStore((s) => s.carts);
  const actionUpdateAmount = useCafeStore((s) => s.actionUpdateAmount);
  const actionRemoveCartPD = useCafeStore((s) => s.actionRemoveCartPD);
  const calTotalPrice = useCafeStore((s) => s.calTotalPrice);
  const token = useCafeStore((state) => state.token);

  const navigate = useNavigate();

  const handleCheckOut = async () => {
    await checkOut(token, { cart: dataCarts })
      .then((res) => {
        //console.log(res.data);
        navigate("/checkout");
      })
      .catch((err) => {
        console.log(err.response.data);
        Swal.fire(err.response.data.error, "", "error");
      });
  };
  return (
    <div>
      {dataCarts.map((item, index) => (
        <div key={index} className="border rounded-md mb-2 p-2">
          <div className="flex justify-between ">
            <div className=" flex gap-2 items-center px-2">
              {item.images?.[0]?.url ? (
                <img
                  className="h-20 rounded-lg"
                  src={item.images[0].url}
                  alt={item.pd_name}
                />
              ) : (
                <div className="w-16 h-16 border rounded-md flex items-center justify-center text-gray-500 p-1">
                  No Image
                </div>
              )}

              <div>
                <p>{item.pd_name}</p>
                <p className="text-xs line-clamp-2">{item.description}</p>
              </div>
            </div>
            <div
              onClick={() => actionRemoveCartPD(item.pd_id)}
              className="px-2 py-1"
            >
              <Trash2 className="text-red-500" />
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  actionUpdateAmount(item.pd_id, Math.max(1, item.count - 1))
                }
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                -
              </button>
              <span className="w-8 text-center">{item.count}</span>
              <button
                onClick={() => actionUpdateAmount(item.pd_id, item.count + 1)}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                +
              </button>
            </div>

            <div className=" px-2 py-1"> {item.price.toFixed(2)}</div>
          </div>
        </div>
      ))}
      <div className="flex justify-between px-2 mt-3">
        <span>TOTAL :</span>
        <span>{calTotalPrice().toFixed(2)}</span>
      </div>

      <Button
        variant="success"
        className="w-full p-2 mt-3"
        disabled={dataCarts.length < 1}
        onClick={() => handleCheckOut()}
      >
        Check out
      </Button>
    </div>
  );
};

export default Cart_pd;
