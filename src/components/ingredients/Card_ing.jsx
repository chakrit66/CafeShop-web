import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCafeStore from "@/store/cafe-store";
import Table_ing from "./Table_ing";
import Swal from "sweetalert2";
import { createIng } from "@/api/ingredients";

const Card_ing = () => {
  const unit = useCafeStore((s) => s.unit);
  const token = useCafeStore((s) => s.token);
  const getDataIng = useCafeStore((s) => s.getDataIng);

  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const onSubmit = async () => {
    if (!name || !id) {
      Swal.fire(
        "Please enter a new ingredient and select a unit.",
        "",
        "warning"
      );
      return;
    }
    try {
      console.log({ name, id });
      const res = await createIng(token, { name, id });
      Swal.fire(res.data.message, "", "success");
      setName("");
      setId("");
      getDataIng(token);
    } catch (err) {
      Swal.fire(err.response?.data?.error || "An error occurred", "", "error");
    }
  };

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Ingredients</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          id="name"
          placeholder="Enter New Ingredient"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Select onValueChange={setId} value={id}>
          <SelectTrigger className="w-full mt-4">
            <SelectValue placeholder="Select Unit" />
          </SelectTrigger>
          <SelectContent>
            {unit.map((item) => (
              <SelectItem key={item.unit_id} value={item.unit_id}>
                {item.unit_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={onSubmit} variant="success" className="w-full my-4">
          Create
        </Button>
      </CardContent>
      <CardFooter>
        <Table_ing />
      </CardFooter>
    </Card>
  );
};

export default Card_ing;
