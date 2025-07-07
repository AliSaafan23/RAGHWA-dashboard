import React, { useState } from "react";
import DynamicForm from "../../custom/DynamicForm";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { COLORS } from "../../constants";
import ReceivedItemsTable from "./ReceivedItemsTable";

const ReceiptOfPurchaseOrderformFields = [
  {
    name: "purchaseOrder",
    label: "رقم أمر الشراء",
    type: "select",
    required: true,
    options: ["PO-1001", "PO-1002", "PO-1003"], // يفضل تجي من API
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "supplier",
    label: "اسم المورد",
    type: "text",
    required: false,
    disabled: true, // يظهر تلقائيًا بعد اختيار أمر الشراء
    sx: { backgroundColor: "#e0e0e0", borderRadius: 2 },
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
    name: "receivedItems",
    label: "الأصناف المستلمة",
    type: "custom", // We'll inject the table via extraItems
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
  const [receivedItems, setReceivedItems] = useState([
    { id: 1, name: "زيت محركات شل 30", requiredQty: 10, receivedQty: 0, unit: "لتر", unitPrice: 100, difference: 10 },
    {
      id: 2,
      name: "Shell Engine Oil 5W-20",
      requiredQty: 5,
      receivedQty: 0,
      unit: "لتر",
      unitPrice: 100,
      difference: 5,
    },
  ]);
  const [isReceiptApproved, setIsReceiptApproved] = useState(false);
  const [approvedReceiptData, setApprovedReceiptData] = useState(null);

  const handleFormSubmit = (data) => {
    setIsReceiptApproved(true);
    setApprovedReceiptData({ ...data, receivedItems });
  };

  const handleAddInvoice = () => {
    if (!isReceiptApproved) return;
    if (onAddInvoice) {
      onAddInvoice({ ...approvedReceiptData, items: receivedItems }); // Pass items
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" dir="rtl">
      <DialogTitle sx={{ color: "#185BAA", fontWeight: "bold", fontSize: 30 }}>استلام أمر شراء جديد</DialogTitle>
      <DialogContent>
        <DynamicForm
          fields={ReceiptOfPurchaseOrderformFields}
          onSubmit={handleFormSubmit}
          formStyle={{
            backgroundColor: "#fafafa",
            padding: 0,
            borderRadius: 8,
          }}
          fieldWrapperStyle={{ marginBottom: 10 }}
          showdetailed={false}
          onCancel={onClose}
          extraItems={<ReceivedItemsTable items={receivedItems} setItems={setReceivedItems} />}
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
              disabled={isReceiptApproved} // Prevent double approval
            >
              حفظ
            </Button>,
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
              disabled={!isReceiptApproved}
            >
              إضافة فاتورة جديدة
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
