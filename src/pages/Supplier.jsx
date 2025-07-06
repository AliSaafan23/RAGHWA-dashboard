import React, { useState } from "react";
import SupplierCreationForm from "../components/SupplierManagementComponents/SupplierCreationForm";
import Header from "../components/SupplierManagementComponents/Header";
import { Box } from "@mui/material";
import Table from "../components/SupplierManagementComponents/Table";

const Supplier = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Header title="الموردين" btnTitle="اضافة مورد جديد" setOpen={setOpen} />
      <Table />
      <SupplierCreationForm open={open} onClose={setOpen} />
    </Box>
  );
};

export default Supplier;
