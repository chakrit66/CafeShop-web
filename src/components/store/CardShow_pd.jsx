import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import useCafeStore from "@/store/cafe-store";
import ServeTypeDialog from "./ServeTypeDialog";

const CardShow_pd = () => {
  const token = useCafeStore((s) => s.token);
  const products = useCafeStore((s) => s.products);
  const getDataProducts = useCafeStore((s) => s.getDataProducts);
  const actionAddCart = useCafeStore((s) => s.actionAddCart);

  useEffect(() => {
    getDataProducts(token);
    //console.log(products);
  }, [token]);
  //console.log(products);
  return (
    <div className="flex flex-wrap gap-3 ">
      {products
        .filter((item) => item.status === true)
        .map((item, index) => (
          <Card className="size-40 p-1 flex flex-col" key={index}>
            <CardHeader className="p-0 h-1/2 items-center">
              {item.images.length > 0 ? (
                <img
                  className="h-20 w-20 rounded-lg"
                  src={item.images[0].url}
                />
              ) : (
                <div className="h-20 text-black rounded-md flex items-center justify-center">
                  No image
                </div>
              )}
            </CardHeader>
            <CardContent className="p-0">
              <p className="truncate w-full">{item.pd_name}</p>
              <p className="text-xs line-clamp-2">{item.description}</p>
            </CardContent>
            <CardFooter className="p-0 flex justify-between">
              <p>฿ {item.price}</p>
              <Button
                size="sm"
                variant="outline"
                className="px-2 py-1"
                onClick={() => actionAddCart(item)}
              >
                <ShoppingCart className="w-4 h-4 mx-1" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      <ServeTypeDialog />
    </div>
  );
};

export default CardShow_pd;
