import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import useCafeStore from "@/store/cafe-store";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useCafeStore((s) => s.user);
  const actionLogout = useCafeStore((s) => s.actionLogout);
  const navigate = useNavigate();

  const handleLogout = () => {
    actionLogout();
    navigate("/login"); 
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" >
          <p>{user?.name || "User"}</p> 
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
        <DropdownMenuItem onClick={handleLogout} className="flex gap-3 text-red-500">
          <LogOut size={20} /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
