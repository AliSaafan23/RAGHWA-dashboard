import React, { useState } from "react";
import DynamicForm from "../../custom/DynamicForm";
import DynamicEditableTable from "../../custom/DynamicEditableTable"; // Import the dynamic table
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { COLORS } from "../../constants";

const OpeningInventoryFormFields = [
  {
    name: "warehouse",
    label: "المستودع",
    type: "select",
    required: true,
    options: ["رئيسي", "مستودع 1", "مستودع 2"],
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "entryDate",
    label: "تاريخ بضاعة أول المدة",
    type: "date",
    required: true,
    defaultValue: "2024-01-01",
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
];

const itemColumns = [
  { field: "itemCode", headerName: "كود الصنف", type: "text", required: true },
  { field: "itemName", headerName: "اسم الصنف", type: "text", required: true },
  { field: "unit", headerName: "الوحدة", type: "select", options: ["كرتون", "علبة", "لتر", "قطعة"] },
  { field: "unitCost", headerName: "تكلفة الوحدة", type: "number", required: true },
  { field: "quantity", headerName: "الكمية", type: "number", required: true },
  {
    field: "total",
    headerName: "الإجمالي",
    type: "readonly",
    formula: (row) => Number(row.unitCost || 0) * Number(row.quantity || 0),
  },
  { field: "notes", headerName: "ملاحظات", type: "text" },
];

export default function GoodFristTimeForm({ open, onClose, initialData }) {
  const [items, setItems] = useState([]);

  const handleFormSubmit = (data) => {
    // Add items to form data
    console.log({ ...data, items });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" dir="rtl">
      <DialogTitle sx={{ color: "#185BAA", fontWeight: "bold", fontSize: 30 }}>اضافة بضاعة اول جديدة</DialogTitle>
      <DialogContent sx={{ backgroundColor: "#fafafa", borderRadius: 2 }}>
        <DynamicForm
          fields={OpeningInventoryFormFields}
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
          extraItems={
            <DynamicEditableTable
              columns={itemColumns}
              rows={items}
              setRows={setItems}
              addButtonLabel="إضافة صنف"
              sx={{ width: "1150px" }}
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
          fieldsPerRow={1}
        />
      </DialogContent>
    </Dialog>
  );
}
