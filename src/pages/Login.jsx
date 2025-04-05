import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import useCafeStore from "@/store/cafe-store";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const actionLogin = useCafeStore((s) => s.actionLogin);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    await actionLogin(data)
      .then((res) => {
        navigate("/store");
        Swal.fire({
          title: res.data.message,
          icon: "success",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: err.response?.data?.error,
          icon: "error",
        });
        //console.log(err);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username below to login 
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  {...register("username")}
                  name="username"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password")}
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Button className="w-full">Login</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
