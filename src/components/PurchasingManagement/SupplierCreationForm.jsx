import React, { useState } from "react";
import DynamicForm from "../../custom/DynamicForm";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Switch,
  FormControlLabel,
  Box,
} from "@mui/material";

const fields = [
  {
    name: "supplierName",
    label: "اسم المورد",
    type: "text",
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "supplierType",
    label: "نوع النشاط",
    type: "select",
    options: ["زيوت", "خدمات", "مواد تنظيف", "أخرى"],
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "email",
    label: "البريد الإلكتروني",
    type: "email",
    required: true,
    sx: { backgroundColor: "#f5f5f5" },
  },
  {
    name: "city",
    label: "المدينة",
    type: "text",
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "address",
    label: "العنوان",
    type: "text",
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "crNumber",
    label: "رقم السجل التجاري",
    type: "text",
    required: true,
    sx: { backgroundColor: "#f5f5f5" },
  },
  {
    name: "notes",
    label: "اكتب الملاحظات...",
    type: "text",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
];

const SupplierCreationForm = ({ open, onClose, onSubmit }) => {
  const [detailed, setDetailed] = useState(false);

  const handleFormSubmit = (data) => {
    onSubmit({ ...data, detailed });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" dir="rtl">
      <DialogTitle sx={{ color: "#185BAA", fontWeight: "bold", fontSize: 30 }}>
        إضافة مورد جديد
      </DialogTitle>
      <DialogContent>
        <DynamicForm
          fields={fields}
          onSubmit={handleFormSubmit}
          formStyle={{
            backgroundColor: "#fafafa",
            padding: 0,
            borderRadius: 8,
          }}
          fieldWrapperStyle={{ marginBottom: 10 }}
          submitButtonProps={{
            sx: {
              backgroundColor: "#1976d2",
              color: "#fff",
              px: 5,
              py: 1.5,
              fontWeight: "bold",
              width: "50%",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#1976d2",
              },
            },
            children: "حفظ",
          }}
          showdetailed={true}
          detailed={detailed}
          setDetailed={setDetailed}
          showCancelButton={true}
          onCancel={onClose}
          cancelButtonProps={{
            sx: {
              backgroundColor: "#ffffff",
              color: "#1976d2",
              px: 5,
              py: 1.5,
              fontWeight: "bold",
              width: "50%",
              border: "1px solid #1976d2",
              "&:hover": {
                backgroundColor: "#1976d2",
                color: "#fff",
              },
            },
            children: "إلغاء",
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

const SupplierCreationButton = () => {
  const [open, setOpen] = useState(false);

  const handleAddSupplier = (data) => {
    // Handle supplier creation logic here
    console.log("Supplier Data:", data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 6,

        minHeight: "100vh",
        fontFamily: "'Cairo', 'Segoe UI', sans-serif",
        direction: "ltr",
      }}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          overflow: "auto",
          position: "relative",
          borderRadius: "16px",
          backgroundColor: "white",
          margin: "16px 0px 0px 16px",
        }}
      >
        <Button variant="contained" onClick={() => setOpen(true)}>
          إضافة مورد جديد
        </Button>
        <SupplierCreationForm
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={handleAddSupplier}
        />
      </Box>
    </Box>
  );
};

export default SupplierCreationButton;
