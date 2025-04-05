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
import Table_role from "./Table_role";
import Swal from "sweetalert2";
import useCafeStore from "@/store/cafe-store";
import { createRole } from "@/api/role";

const Card_role = () => {
  const [name, setName] = useState("");
  const token = useCafeStore((s) => s.token);
  const getDataRole = useCafeStore((s) => s.getDataRole);

  const onSubmit = async () => {
    if (!name) {
      Swal.fire("Please enter a new role", "", "warning");
      return;
    }
    try {
      const res = await createRole(token, { name });
      Swal.fire(res.data.message, "", "success");
      setName("");
      getDataRole(token);
    } catch (err) {
      Swal.fire(err.response?.data?.error || "An error occurred", "", "error");
    }
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Role</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          id="name"
          placeholder="Enter New Role"
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
        <Table_role />
      </CardFooter>
    </Card>
  );
};

export default Card_role;
