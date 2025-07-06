import { AddService } from "../pages/AddService";
import Dashboard from "../pages/Dashboard";
import Inventory from "../pages/Inventory";
import { SharedLayout } from "./SharedLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Supplier from "../pages/Supplier";
import Purchase from "../pages/Purchase";
export const Mainlayout = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Warehouses/ادارة-الخدمات" element={<AddService />} />
            <Route path="/Warehouses/ادارة-المورديين" element={<Supplier />} />
            <Route path="Warehouses/ادارة-الحركات-المخزنية" element={<Inventory />} />
            <Route path="/Warehouses/ادارة-المشتريات" element={<Purchase />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
