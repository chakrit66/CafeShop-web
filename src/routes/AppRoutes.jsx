import Layout from "@/layouts/Layout";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectRouteUser from "./ProtectRouteUser";
import User from "@/pages/User";
import Role from "@/pages/Role";
import Ingredients from "@/pages/Ingredients";
import Type from "@/pages/Type";
import Products from "@/pages/Products";
import Recipes from "@/pages/Recipes";
import Bills from "@/pages/Bills";
import Customers from "@/pages/Customers";
import Stock from "@/pages/Stock";
import Store from "@/pages/Store";
import CheckOut from "@/pages/CheckOut";
import Promotion from "@/pages/Promotion";
import Order from "@/pages/Order";
import DashboardSales from "@/pages/DashboardSales";
import DashCusBuy from "@/pages/DashCusBuy";
import DashProducts from "@/pages/DashProducts";
import DashProfitLoss from "@/pages/DashProfitLoss";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/*  Default route ถ้าไม่มี token ให้ไป login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* ProtectRouteUser ใช้สำหรับเส้นทางที่ต้อง login */}
        <Route element={<ProtectRouteUser />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Store />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="user" element={<User />} />
            <Route path="role" element={<Role />} />
            <Route path="ingredients" element={<Ingredients />} />
            <Route path="type" element={<Type />} />
            <Route path="products" element={<Products />} />
            <Route path="recipes" element={<Recipes />} />
            <Route path="bills" element={<Bills />} />
            <Route path="customers" element={<Customers />} />
            <Route path="stock" element={<Stock />} />
            <Route path="store" element={<Store />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route path="promotion" element={<Promotion />} />
            <Route path="order" element={<Order />} />
            <Route path="DashboardSales" element={<DashboardSales />} />
            <Route path="DashCusBuy" element={<DashCusBuy />} />
            <Route path="DashProducts" element={<DashProducts />} />
            <Route path="DashProfitLoss" element={<DashProfitLoss />} />
          </Route>
        </Route>

        {/* Login Page */}
        <Route path="login" element={<Login />} />

        {/* ถ้าไม่ตรงกับเส้นทางไหนเลยให้ไปหน้า 404 */}
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
