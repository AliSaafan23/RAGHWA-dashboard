import React from "react";
import SupplierCreationForm from "../components/PurchasingManagement/Suppliers/SupplierCreationForm";
import Header from "../components/PurchasingManagement/Suppliers/Header";
import { Box } from "@mui/material";
import SupplierTable from "../components/PurchasingManagement/Suppliers/SupplierTable";

const SupplierCreation = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Header />
      <SupplierTable />
      <SupplierCreationForm />
    </Box>
  );
};

export default SupplierCreation;
