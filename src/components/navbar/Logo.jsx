import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { Coffee } from "lucide-react";
const Logo = () => {
  return (
    <Button asChild variant="ghost">
      <Link to={"/"}>
        <span className="text-xl">CAFE Shop</span>
        <Coffee />
      </Link>
    </Button>
  );
};

export default Logo;
