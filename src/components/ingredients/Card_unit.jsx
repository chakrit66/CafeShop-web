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
import Table_unit from "./Table_unit";
import Swal from "sweetalert2";
import useCafeStore from "@/store/cafe-store";
import { createUnit } from "@/api/unit";

const Card_unit = () => {
  const [name, setName] = useState("");
  const token = useCafeStore((s) => s.token);
  const getDataUnit = useCafeStore((s) => s.getDataUnit);

  const onSubmit = async () => {
    if (!name) {
      Swal.fire("Please enter a new role", "", "warning");
      return;
    }
    try {
      const res = await createUnit(token, { name });
      Swal.fire(res.data.message, "", "success");
      setName("");
      getDataUnit(token);
    } catch (err) {
      Swal.fire(err.response?.data?.error || "An error occurred", "", "error");
    }
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Unit</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          id="name"
          placeholder="Enter New Unit"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          type="button"
          onClick={onSubmit}
          variant="success"
          className="w-full my-4"
        >
          Create
        </Button>
      </CardContent>
      <CardFooter>
        <Table_unit />
      </CardFooter>
    </Card>
  );
};

export default Card_unit;
