import React from "react";
import Logo from "./Logo";
import Profile from "./Profile";
import AlertStock from "../stock/AlertStock";
const Navbar = () => {
  return (
    <div className="flex flex-col items-center py-2 px-5 justify-between sm:flex-row gap-3 w-full ">
      <div className="flex">
        <Logo />
      </div>
      <div className="flex gap-3 items-center">
        <AlertStock />
        <Profile />
      </div>
    </div>
  );
};

export default Navbar;
