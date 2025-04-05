import { useState, useEffect } from "react";
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

const Combobox_ing = ({ form }) => {
  const { setValue, watch } = form;
  const token = useCafeStore((s) => s.token);
  const ingredients = useCafeStore((s) => s.ing);
  const getDataIng = useCafeStore((s) => s.getDataIng);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getDataIng(token);
  }, [token]);

  const value = watch("ingredient");
  const selectedIng = ingredients.find((item) => String(item.ing_id) === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedIng
            ? selectedIng.ing_name + " " + selectedIng.unit.unit_name
            : "Select ingredients..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search ingredients..." className="h-9" />
          <CommandList>
            <CommandEmpty>No ingredients found.</CommandEmpty>
            <CommandGroup>
              {ingredients.map((item) => (
                <CommandItem
                  key={item.ing_id}
                  value={String(item.ing_name)}
                  onSelect={(currentValue) => {
                    setValue("ingredient", String(item.ing_id));
                    setOpen(false);
                  }}
                >
                  <span>
                    {item.ing_name} {item.unit.unit_name}
                  </span>
                  <Check
                    className={cn(
                      "ml-auto",
                      value === String(item.ing_id)
                        ? "opacity-100"
                        : "opacity-0"
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

export default Combobox_ing;
