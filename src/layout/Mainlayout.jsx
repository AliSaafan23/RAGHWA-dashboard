import { AddService } from "../pages/AddService";
import Dashboard from "../pages/Dashboard";
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
            
            <Route
              path="/Warehouses/ادارة-المورديين"
              element={<SupplierCreation />}
            />
            
            <Route
              path="/Warehouses/ادارة-الخدمات"
              element={<AddService />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
