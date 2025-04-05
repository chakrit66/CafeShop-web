import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import useCafeStore from "@/store/cafe-store";
import Swal from "sweetalert2";
import { Input } from "@/components/ui/input";
import { changePassword } from "@/api/user";

const NewPassword = ({ id }) => {
  const [password, setPassword] = useState("");
  const token = useCafeStore((s) => s.token);
  const getDataUser = useCafeStore((s) => s.getDataUsers);

  const onSubmit = async () => {
    if (!password) {
      Swal.fire("Please enter a new password", "", "warning");
      return;
    }

    const data = { id, password };

    try {
      const res = await changePassword(token, data);
      Swal.fire(res.data.message, "", "success");
      getDataUser(token);
    } catch (err) {
      Swal.fire(err.response?.data?.error || "An error occurred", "", "error");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="sky" size="sm">
          New Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <Input
          id="password"
          placeholder="Enter New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={onSubmit} variant="success">
              Yes, change
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewPassword;
