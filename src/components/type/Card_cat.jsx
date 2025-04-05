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
import Swal from "sweetalert2";
import { createCat } from "@/api/category";
import Table_cat from "./Table_cat";

const Card_cat = () => {
  const type = useCafeStore((s) => s.type);
  const token = useCafeStore((s) => s.token);
  const getDataCat = useCafeStore((s) => s.getDataCat);

  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const onSubmit = async () => {
    if (!name || !id) {
      Swal.fire(
        "Please enter a new ingredient and select a type.",
        "",
        "warning"
      );
      return;
    }
    try {
      //console.log({ name, id });
      const res = await createCat(token, { name, id });
      Swal.fire(res.data.message, "", "success");
      setName("");
      setId("");
      getDataCat(token);
    } catch (err) {
      Swal.fire(err.response?.data?.error || "An error occurred", "", "error");
    }
  };
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Category</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          id="name"
          placeholder="Enter New Category"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Select onValueChange={setId} value={id}>
          <SelectTrigger className="w-full mt-4">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            {type.map((item) => (
              <SelectItem key={item.type_id} value={item.type_id}>
                {item.type_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={onSubmit} variant="success" className="w-full my-4">
          Create
        </Button>
      </CardContent>
      <CardFooter>
        <Table_cat />
      </CardFooter>
    </Card>
  );
};

export default Card_cat;
