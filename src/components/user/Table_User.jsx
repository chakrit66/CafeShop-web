import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import useCafeStore from "@/store/cafe-store";
import Swal from "sweetalert2";
import { changeRole, changeStatus } from "@/api/user";
import Remove_User from "./Remove_User";
import Edit_User from "./Edit_User";
import NewPassword from "./NewPassword";

const Table_User = ({ data, search }) => {
  const token = useCafeStore((s) => s.token);
  const dataRole = useCafeStore((s) => s.dataRole);
  const getDataRole = useCafeStore((s) => s.getDataRole);
  const getDataUser = useCafeStore((s) => s.getDataUsers);

  useEffect(() => {
    getDataRole(token);
  }, [token]);

  const filtered = data.filter((item) =>
    item.emp_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleOnChangeRole = async (role, id) => {
    const data = {
      id: id,
      role: role,
    };
    await changeRole(token, data)
      .then((res) => {
        Swal.fire(res.data.message, "", "success");
        getDataUser(token);
      })
      .catch((err) =>
        Swal.fire(err.response?.data?.error || "An error occurred", "", "error")
      );
  };

  const handleOnChangeStatus = async (value, id) => {
    const data = {
      id: id,
      enabled: value,
    };

    try {
      const res = await changeStatus(token, data);
      Swal.fire(res.data.message, "", "success");
      getDataUser(token);
    } catch (err) {
      Swal.fire(err.response?.data?.error || "An error occurred", "", "error");
    }
  };

  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Tel.</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Password</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Enabled</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtered.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="w-[30px]">{index + 1}</TableCell>
            <TableCell>{item.emp_name}</TableCell>
            <TableCell>{calculateAge(item.birthday)}</TableCell>
            <TableCell>{item.gender}</TableCell>
            <TableCell>{item.tel}</TableCell>
            <TableCell>{item.username}</TableCell>
            <TableCell>
              <NewPassword id={item.emp_id} />
            </TableCell>
            <TableCell className="max-w-[160px]">
              <Select
                defaultValue={item.role.role_id}
                onValueChange={(value) =>
                  handleOnChangeRole(value, item.emp_id)
                }
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder={item.role.role_name} />
                </SelectTrigger>
                <SelectContent>
                  {dataRole.map((i, index) => (
                    <SelectItem key={index} value={i.role_id}>
                      {i.role_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Switch
                onCheckedChange={(value) =>
                  handleOnChangeStatus(value, item.emp_id)
                }
                checked={item.enabled}
              />
            </TableCell>
            <TableCell className="flex justify-between p-1 gap-1 max-w-[100px]">
              <Edit_User id={item.emp_id} />
              <Remove_User id={item.emp_id} name={item.emp_name} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Table_User;
