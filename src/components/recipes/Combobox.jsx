import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useCafeStore from "@/store/cafe-store";

const Combobox = ({ form }) => {
  const { setValue, watch } = form;
  const token = useCafeStore((s) => s.token);
  const products = useCafeStore((s) => s.products);
  const getDataProducts = useCafeStore((s) => s.getDataProducts);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getDataProducts(token);
  }, [token]);

  const value = watch("product");
  const selectedProduct = products.find(
    (product) => String(product.pd_id) === value
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedProduct ? selectedProduct.pd_name : "Select products..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search products..."
            className="h-9"
            onChange={(e) => {
              // ค้นหาจากชื่อสินค้า (pd_name)
              const searchTerm = e.target.value.toLowerCase();
              // กรองรายการสินค้า
              const filteredProducts = products.filter((product) =>
                product.pd_name.toLowerCase().includes(searchTerm)
              );
            }}
          />
          <CommandList>
            <CommandEmpty>No products found.</CommandEmpty>
            <CommandGroup>
              {products.map((product) => (
                <CommandItem
                  key={product.pd_id}
                  value={String(product.pd_name)} 
                  onSelect={(currentValue) => {
                    setValue("product", String(product.pd_id));
                    setOpen(false); 
                  }}
                >
                  {product.pd_name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === String(product.pd_id) ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
