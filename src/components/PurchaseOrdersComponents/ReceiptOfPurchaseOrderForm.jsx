import React, { useState } from "react";
import DynamicForm from "../../custom/DynamicForm";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { COLORS } from "../../constants";
import DynamicEditableTable from "../../custom/DynamicEditableTable";

const ReceiptOfPurchaseOrderformFields = [
  {
    name: "purchaseOrder",
    label: "رقم أمر الشراء",
    type: "select",
    required: true,
    options: ["PO-1001", "PO-1002", "PO-1003"],
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "supplier",
    label: "اسم المورد",
    type: "text",
    required: false,
    disabled: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "receiveDate",
    label: "تاريخ الاستلام",
    type: "date",
    required: true,
    defaultValue: new Date().toISOString().slice(0, 10),
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "receivedBy",
    label: "اسم المستلم / الموظف",
    type: "text",
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "warehouse",
    label: "المستودع المستلم",
    type: "select",
    required: true,
    options: ["المخزن الرئيسي", "مخزن 1", "مخزن 2"],
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "receiveNotes",
    label: "ملاحظات على الاستلام",
    type: "textarea",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "attachments",
    label: "رفع المستندات",
    type: "file",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "receiveStatus",
    label: "حالة الاستلام",
    type: "select",
    required: true,
    options: ["مكتمل", "جزئي", "مرفوض"],
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
];

export default function ReceiptOfPurchaseOrderForm({ open, onClose, onAddInvoice }) {
  const [receivedItems, setReceivedItems] = useState([]);

  const [isReceiptApproved, setIsReceiptApproved] = useState(false);
  const [approvedReceiptData, setApprovedReceiptData] = useState(null);

  const handleFormSubmit = (data) => {
    setIsReceiptApproved(true);
    setApprovedReceiptData({ ...data, receivedItems });
  };

  const handleAddInvoice = () => {
    if (!isReceiptApproved) return;
    if (onAddInvoice) {
      onAddInvoice({ ...approvedReceiptData, items: receivedItems });
    }
  };

  // أعمدة جدول الأصناف المستلمة
  const receivedItemsColumns = [
    { field: "name", headerName: "اسم المنتج", type: "text", required: true },
    { field: "requiredQty", headerName: "الكمية المطلوبة", type: "number", required: true },
    { field: "receivedQty", headerName: "الكمية المستلمة", type: "number", required: true },
    { field: "unit", headerName: "الوحدة", type: "select", options: ["كرتون", "لتر", "علبة"] },
    { field: "unitPrice", headerName: "سعر الوحدة", type: "number", required: true },
    {
      field: "total",
      headerName: "الإجمالي",
      type: "readonly",
      formula: (row) => Number(row.unitPrice || 0) * Number(row.receivedQty || 0),
    },
    {
      field: "difference",
      headerName: "الفرق",
      type: "readonly",
      formula: (row) => Number(row.requiredQty || 0) - Number(row.receivedQty || 0),
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" dir="rtl">
      <DialogTitle sx={{ color: "#185BAA", fontWeight: "bold", fontSize: 30 }}>استلام أمر شراء جديد</DialogTitle>
      <DialogContent sx={{ backgroundColor: "#fafafa", borderRadius: 2 }}>
        <DynamicForm
          fields={ReceiptOfPurchaseOrderformFields}
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
              columns={receivedItemsColumns}
              rows={receivedItems}
              setRows={setReceivedItems}
              addButtonLabel="إضافة صنف جديد"
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
              disabled={isReceiptApproved}
            >
              حفظ
            </Button>,
            isReceiptApproved && (
              <Button
                key="add-invoice"
                variant="contained"
                sx={{
                  backgroundColor: "success.main",
                  color: "#fff",
                  px: 5,
                  py: 1.5,
                  fontWeight: "bold",
                  border: "1px solid",
                  borderColor: "success.dark",
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "success.main",
                    borderColor: "success.main",
                  },
                }}
                onClick={handleAddInvoice}
                type="button"
              >
                إضافة فاتورة جديدة
              </Button>
            ),
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
