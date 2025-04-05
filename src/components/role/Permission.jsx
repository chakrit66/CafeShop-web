import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { updatePermission } from "@/api/role";
import useCafeStore from "@/store/cafe-store";
import Swal from "sweetalert2";
import { readPermission } from "@/api/role";

const Permission = () => {
  const token = useCafeStore((s) => s.token);
  const dataRole = useCafeStore((s) => s.dataRole);
  const [dataPermission, setDataPermission] = useState({});

  const handleOnChangeRole = async (id) => {
    if (!id) return;

    try {
      const res = await readPermission(token, id);
      setDataPermission(res.data);
    } catch (err) {
      console.log(err);
      Swal.fire("เกิดข้อผิดพลาดในการโหลดข้อมูล", "", "error");
    }
  };

  const handleOnChangePermission = async (checked, key) => {
    if (!dataPermission.role_id) {
      Swal.fire("กรุณาเลือกบทบาทก่อน", "", "warning");
      return;
    }

    const data = { [key]: checked };

    try {
      const res = await updatePermission(token, dataPermission.role_id, data);
      Swal.fire(res.data.message, "", "success");
      setDataPermission(res.data.upData);
    } catch (err) {
      Swal.fire(err.response?.data?.error || "เกิดข้อผิดพลาด", "", "error");
    }
  };

  return (
    <Card className="lg:w-[500px] sm:w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Permission</CardTitle>
      </CardHeader>

      <CardContent>
        <Select
          onValueChange={handleOnChangeRole}
          value={dataPermission.role_id || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>

          <SelectContent>
            {dataRole.map((item, index) => (
              <SelectItem key={index} value={item.role_id}>
                {item.role_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>

      {dataPermission.role_id && (
        <CardFooter>
          <div className="space-y-4">
            {[
              { label: "Manage Role & Permission", key: "can_auth" },
              { label: "Manage Constant", key: "can_constant" },
              { label: "Manage Bills", key: "can_bill" },
              { label: "Manage Orders", key: "can_order" },
              { label: "Manage Recipe", key: "can_recipe" },
              { label: "Manage Report", key: "can_report" },
            ].map(({ label, key }) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  checked={!!dataPermission[key]}
                  value={dataPermission[key]}
                  onCheckedChange={(checked) => handleOnChangePermission(checked, key)}
                />
                <Label className="text-sm font-medium leading-none">
                  {label}
                </Label>
              </div>
            ))}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default Permission;
