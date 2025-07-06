import { AddService } from "../pages/AddService";
import Dashboard from "../pages/Dashboard";
import Inventory from "../pages/Inventory";
import InventoryTransactions from "../components/InventoryTransactionsComponents/InventoryTransactions";
import SupplierCreation from "../pages/SupplierCreation";
import { SharedLayout } from "./SharedLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
export const Mainlayout = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Warehouses/ادارة-الخدمات" element={<AddService />} />
            <Route
              path="/Warehouses/ادارة-المورديين"
              element={<SupplierCreation />}
            />
            <Route
              path="Warehouses/ادارة-الحركات-المخزنية"
              element={<Inventory/>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
