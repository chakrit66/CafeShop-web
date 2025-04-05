import Card_role from "@/components/role/Card_role";
import Permission from "@/components/role/Permission";
import React from "react";

const Role = () => {
  return (
    <div className="flex flex-col p-2 gap-4 sm:flex-row ">
      <Card_role />
      <Permission />
    </div>
  );
};

export default Role;
