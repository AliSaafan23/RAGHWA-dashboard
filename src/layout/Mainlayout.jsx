import Dashboard from "../pages/Dashboard";
import Inventory from "../pages/Inventory";
import { SharedLayout } from "./SharedLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Supplier from "../pages/Supplier";
import Purchase from "../pages/Purchase";
import ServiceManagement from "../pages/ServiceManagement";
import StorageManagement from "../pages/StorageManagement";
import { AddService } from "../components/Add Service/AddService";
import SupplierCreationForm from "../components/SupplierManagementComponents/SupplierCreationForm";
export const Mainlayout = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Warehouses/ادارة-المورديين" element={<Supplier />} />
            <Route path="Warehouses/ادارة-الحركات-المخزنية" element={<Inventory />} />
            <Route path="/Warehouses/ادارة-المشتريات" element={<Purchase />} />
            <Route path="/Warehouses/ادارة-الخدمات" element={<ServiceManagement />} />
            <Route path="/Warehouses/ادارة-الفروع" element={<StorageManagement />} />
            <Route path="/Warehouses/ادارة-المورديين" element={<SupplierCreationForm />} />
            <Route path="Warehouses/ادارة-الحركات-المخزنية" element={<Inventory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
