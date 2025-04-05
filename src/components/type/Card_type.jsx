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
import Swal from "sweetalert2";
import useCafeStore from "@/store/cafe-store";
import { createType } from "@/api/type";
import Table_type from "./Table_type";

const Card_type = () => {
  const [name, setName] = useState("");
  const token = useCafeStore((s) => s.token);
  const getDataType = useCafeStore((s) => s.getDataType);

  const onSubmit = async () => {
    if (!name) {
      Swal.fire("Please enter a new role", "", "warning");
      return;
    }
    try {
      const res = await createType(token, { name });
      Swal.fire(res.data.message, "", "success");
      setName("");
      getDataType(token);
    } catch (err) {
      Swal.fire(err.response?.data?.error || "An error occurred", "", "error");
    }
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Type</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          id="name"
          placeholder="Enter New Type"
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
        <Table_type />
      </CardFooter>
    </Card>
  );
};

export default Card_type;
