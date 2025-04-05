import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import useCafeStore from "../store/cafe-store";
import { currentUser } from "@/api/auth";
import Swal from "sweetalert2";

const ProtectRouteUser = () => {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = useCafeStore((s) => s.user);
  const token = useCafeStore((s) => s.token);
  const actionLogout = useCafeStore((s) => s.actionLogout);

  useEffect(() => {
    if (!user || !token) {
      setLoading(false);
      navigate("/login", { replace: true }); 
      return;
    }

    currentUser(token)
      .then(() => setOk(true))
      .catch((err) => {
        console.log("Auth error:", err.response);
        if (err.response?.status === 401) {
          Swal.fire(err.response.data.error || "Session expired", "", "warning").then(() => {
            actionLogout();
            navigate("/login", { replace: true });
          });
        }
        setOk(false);
      })
      .finally(() => setLoading(false));
  }, [user, token, navigate, actionLogout]);

  if (loading) return <div>Loading...</div>;

  return ok ? <Outlet /> : null;
};

export default ProtectRouteUser;
