import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import useCafeStore from "@/store/cafe-store";
import Table_User from "@/components/user/Table_User";
import Create_User from "@/components/user/Create_User";

const User = () => {
  const token = useCafeStore((s) => s.token);
  const dataUser = useCafeStore((s) => s.dataUsers);
  const getDataUser = useCafeStore((s) => s.getDataUsers);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (token) {
      getDataUser(token);
    }
  }, [token]);

  return (
    <div>
      <h1 className="text-2xl my-2">Employee</h1>
      <div className="flex justify-between gap-4 my-4">
        <Input
          className="max-w-[300px]"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Create_User />
      </div>
      <Table_User data={dataUser} search={search} />
    </div>
  );
};

export default User;
