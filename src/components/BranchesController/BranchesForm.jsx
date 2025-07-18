import React, { useState } from "react";
import DynamicForm from "../../custom/DynamicForm";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { COLORS } from "../../constants";
const companyName = [
  { label: "شركة 1", value: "1" },
  { label: "شركة 2", value: "2" },
  { label: "شركة 3", value: "3" },
];
const BranchFormFields = [
  {
    name: "name",
    label: "اسم الفرع",
    type: "text",
    required: true,
    placeholder: "أدخل اسم الفرع",
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "companyId",
    label: "اختر الشركة",
    type: "autocomplete",
    options: companyName, // ممكن يكون array of strings أو array of objects
    getOptionLabel: (option) => option.label, // لو object
    isOptionEqualToValue: (option, value) => option.label === value.label,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "icon",
    label: "رابط الأيقونة",
    type: "file",
    required: true,
    placeholder: "أدخل رابط الأيقونة",
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "address",
    label: "العنوان",
    type: "text",
    required: true,
    placeholder: "أدخل العنوان",
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "phoneNumber",
    label: "رقم الهاتف",
    type: "text",
    required: true,
    placeholder: "مثال: 01012345678",
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "email",
    label: "البريد الإلكتروني",
    type: "email",
    required: true,
    placeholder: "example@email.com",
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "zone",
    label: "المنطقة",
    type: "text",
    required: false,
    placeholder: "اختياري",
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },

  {
    name: "isActive",
    label: "نشط",
    type: "checkbox", // ممكن تعمله switch كمان حسب الـ UI
    required: false,
    defaultValue: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
];

export default function BranchesForm({ open, onClose, initialData }) {
  const handleFormSubmit = (data) => {
    // Add items to form data
    console.log({ ...data, items });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" dir="rtl">
      <DialogTitle sx={{ color: "#185BAA", fontWeight: "bold", fontSize: 30 }}>اضافة فرع جديدة</DialogTitle>
      <DialogContent sx={{ backgroundColor: "#fafafa", borderRadius: 2 }}>
        <DynamicForm
          fields={BranchFormFields}
          onSubmit={handleFormSubmit}
          initialValues={initialData || {}}
          formStyle={{
            backgroundColor: "#fafafa",
            padding: 0,
            borderRadius: 8,
            width: "100%",
          }}
          fieldWrapperStyle={{ marginBottom: 10 }}
          showdetailed={false}
          onCancel={onClose}
          formButtons={[
            <Button
              key="save"
              variant="contained"
              sx={{
                backgroundColor: COLORS.PRIMARY,
                px: 5,
                py: 1.5,
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#fff",
                  color: COLORS.PRIMARY,
                },
              }}
              type="submit"
            >
              حفظ
            </Button>,
            <Button
              key="cancel"
              variant="contained"
              sx={{
                backgroundColor: "#ffffff",
                color: COLORS.PRIMARY,
                px: 5,
                py: 1.5,
                fontWeight: "bold",
                border: "1px solid #1976d2",
                "&:hover": {
                  backgroundColor: COLORS.PRIMARY,
                  color: "#fff",
                },
              }}
              onClick={() => onClose(false)}
              type="button"
            >
              الغاء
            </Button>,
          ]}
          fieldsPerRow={1}
        />
      </DialogContent>
    </Dialog>
  );
}
