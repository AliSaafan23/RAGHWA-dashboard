import React, { useState } from "react";
import DynamicForm from "../../custom/DynamicForm";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { COLORS } from "../../constants";
import DynamicEditableTable from "../../custom/DynamicEditableTable";

// أعمدة جدول الأصناف في الفاتورة
const invoiceItemColumns = [
  {
    field: "name",
    headerName: "اسم الصنف",
    type: "text",
    required: true,
  },
  {
    field: "quantity",
    headerName: "الكمية",
    type: "number",
    required: true,
  },
  {
    field: "price",
    headerName: "السعر",
    type: "number",
    required: true,
  },
  {
    field: "total",
    headerName: "الإجمالي",
    type: "readonly",
    formula: (row) => Number(row.quantity || 0) * Number(row.price || 0),
  },
];

const InvoiceFormFields = [
  {
    name: "invoiceNumber",
    label: "رقم الفاتورة",
    type: "text",
    placeholder: "مثال: INV-2025-001",
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "invoiceDate",
    label: "تاريخ الفاتورة",
    type: "date",
    required: true,
    defaultValue: new Date().toISOString().slice(0, 10),
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "supplierName",
    label: "اسم المورد",
    type: "readonly",
  },
  {
    name: "purchaseOrderId",
    label: "رقم أمر الشراء",
    type: "select",
    options: [], // يمكن ملؤها من API لاحقًا
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "orderInfo",
    label: "معلومات الأمر",
    type: "group",
    fields: [
      { name: "orderNumber", label: "رقم الأمر", type: "readonly" },
      { name: "receivedDate", label: "تاريخ الاستلام", type: "readonly" },
      { name: "receivedQty", label: "الكميات المستلمة", type: "readonly" },
    ],
  },
  {
    name: "invoiceAmount",
    label: "قيمة الفاتورة",
    type: "number",
    required: true,
    placeholder: "مثل: 1200",
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "paymentMethod",
    label: "طريقة الدفع",
    type: "select",
    options: ["نقدي", "تحويل", "آجل"],
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "paymentStatus",
    label: "حالة الدفع",
    type: "select",
    options: ["مدفوعة", "معلقة", "جزئية"],
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "paymentNotes",
    label: "ملاحظات الدفع",
    type: "textarea",
    required: false,
    placeholder: "أي ملاحظات تتعلق بالدفع...",
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "attachments",
    label: "المرفقات",
    type: "file",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "items",
    label: "تفاصيل الأصناف",
    type: "custom",
  },
];

export default function PurchaseInvoiceForm({ open, onClose, initialData }) {
  const [products, setProducts] = useState([]);

  const handleFormSubmit = (data) => {
    const fullData = { ...data, products };
    console.log(fullData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" dir="rtl">
      <DialogTitle sx={{ color: "#185BAA", fontWeight: "bold", fontSize: 30 }}>اضافة فاتورة شراء جديدة</DialogTitle>
      <DialogContent>
        <DynamicForm
          fields={InvoiceFormFields}
          onSubmit={handleFormSubmit}
          initialValues={initialData || {}}
          formStyle={{
            backgroundColor: "#fafafa",
            padding: 0,
            borderRadius: 8,
          }}
          fieldWrapperStyle={{ marginBottom: 10 }}
          showdetailed={false}
          onCancel={onClose}
          extraItems={
            <DynamicEditableTable
              columns={invoiceItemColumns}
              rows={products}
              setRows={setProducts}
              addButtonLabel="إضافة صنف"
              readOnly={true}
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
