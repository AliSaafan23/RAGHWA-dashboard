import React, { useState } from "react";
import DynamicForm from "../../custom/DynamicForm";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { COLORS } from "../../constants";
import DynamicEditableTable from "../../custom/DynamicEditableTable"; // Import the dynamic table

const PurchaseOrdersFormFields = [
  {
    name: "orderNumber",
    label: "رقم الأمر",
    type: "text",
    required: true,
    placeholder: "مثال: PO-1005",
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "supplier",
    label: "اسم المورد",
    type: "select",
    options: ["مورد 1", "مورد 2", "مورد 3"], // يفضل تجي من API أو useState
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "orderDate",
    label: "تاريخ الطلب",
    type: "date",
    required: true,
    defaultValue: new Date().toISOString().slice(0, 10),
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "paymentType",
    label: "نوع الدفع",
    type: "select",
    required: true,
    options: ["نقدي", "آجل", "تحويل بنكي"],
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "warehouse",
    label: "مستودع التوريد",
    type: "select",
    required: true,
    options: ["المخزن الرئيسي", "مخزن فرعي"],
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "products",
    label: "المنتجات المطلوبة",
    type: "custom",
  },
  {
    name: "attachments",
    label: "المرفقات",
    type: "file",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "notes",
    label: "ملاحظات",
    type: "textarea",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
];

const productColumns = [
  { field: "name", headerName: "المنتج", type: "text", required: true },
  { field: "unit", headerName: "الوحدة", type: "text", required: true },
  { field: "quantity", headerName: "الكمية", type: "number", required: true },
  { field: "price", headerName: "السعر", type: "number", required: true },
  {
    field: "total",
    headerName: "الإجمالي",
    type: "readonly",
    formula: (row) => Number(row.price || 0) * Number(row.quantity || 0),
  },
];

export default function PurchaseOrdersForm({ open, onClose }) {
  const [products, setProducts] = useState([]);

  const handleFormSubmit = (data) => {
    // Add products to form data
    console.log({ ...data, products });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" dir="rtl">
      <DialogTitle sx={{ color: "#185BAA", fontWeight: "bold", fontSize: 30 }}>اضافة أمر شراء جديد</DialogTitle>
      <DialogContent sx={{ backgroundColor: "#fafafa", borderRadius: 2 }}>
        <DynamicForm
          fields={PurchaseOrdersFormFields}
          onSubmit={handleFormSubmit}
          formStyle={{
            backgroundColor: "#fafafa",
            padding: 0,
            borderRadius: 8,
            width: "100%",
          }}
          fieldWrapperStyle={{ marginBottom: 10 }}
          showdetailed={false}
          onCancel={onClose}
          extraItems={
            <DynamicEditableTable
              columns={productColumns}
              rows={products}
              setRows={setProducts}
              addButtonLabel="إضافة منتج"
            />
          }
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
        />
      </DialogContent>
    </Dialog>
  );
}
