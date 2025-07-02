import React, { useState } from "react";
import DynamicForm from "../../custom/DynamicForm";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
} from "@mui/material";

const warehouseOptions = ["رئيسي", "فرعي 1", "فرعي 2", "مخزن إضافي"];
const typeOptions = ["توريد", "صرف", "تحويل", "جرد", "إتلاف", "بضاعة أول المدة", "مرتجع مشتريات", "مرتجع مبيعات"];
const statusOptions = ["معتمدة", "غير معتمدة"];

const baseFields = [
  {
    name: "transactionType",
    label: "نوع الحركة",
    type: "select",
    options: typeOptions,
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "sourceWarehouse",
    label: "المستودع المصدر",
    type: "select",
    options: warehouseOptions,
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    show: (values) => ["صرف", "تحويل"].includes(values.transactionType),
  },
  {
    name: "destinationWarehouse",
    label: "المستودع المستقبل",
    type: "select",
    options: warehouseOptions,
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    show: (values) => values.transactionType === "تحويل",
  },
  {
    name: "warehouse",
    label: "المستودع",
    type: "select",
    options: warehouseOptions,
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    show: (values) => !["صرف", "تحويل"].includes(values.transactionType),
  },
  {
    name: "date",
    label: "تاريخ الحركة",
    type: "date",
    required: true,
    defaultValue: new Date().toISOString().slice(0, 10),
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    placeholder: "",
  },
  {
    name: "reference",
    label: "رقم المرجع (اختياري)",
    type: "text",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "notes",
    label: "الملاحظات",
    type: "textarea",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "items",
    label: "الأصناف والكميات",
    type: "custom-table",
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "attachments",
    label: "المرفقات (رفع ملفات)",
    type: "file",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "status",
    label: "حالة الحركة",
    type: "select",
    options: statusOptions,
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    show: (values, user) => user && user.isSupervisor,
  },
  {
    name: "executedBy",
    label: "المستخدم المنفذ",
    type: "text",
    required: true,
    readOnly: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    show: () => false, // Hide from form, but send in data
  },
];

const InventoryTransactionForm = ({ open, onClose, onSubmit, user }) => {
  const [detailed, setDetailed] = useState(false);
  const handleFormSubmit = (data) => {
    onSubmit({ ...data, detailed, executedBy: user?.name });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" dir="rtl">
      <DialogTitle sx={{ color: "#185BAA", fontWeight: "bold", fontSize: 30 }}>
        اضافة حركة جديدة
      </DialogTitle>
      <DialogContent>
        <DynamicForm
          fields={baseFields}
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

export default InventoryTransactionForm;
