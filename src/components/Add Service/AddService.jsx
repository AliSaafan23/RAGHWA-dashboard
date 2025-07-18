import React, { useState } from "react";
import DynamicForm from "../../custom/DynamicForm";
import { COLORS } from "../../constants";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import DynamicEditableTable from "../../custom/DynamicEditableTable";
const topitemCode = ["item1", "item2", "item3"];
const topitemName = ["Item One", "Item Two", "Item Three"];
const fields = [
  {
    name: "service Code",
    label: "كودالخدمة",
    type: "text",
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "service Name",
    label: "اسم الخدمة",
    type: "select",
    options: ["غسيل خارجي", "خدمات", "مواد تنظيف", "أخرى"],
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "service Type",
    label: "نوع الخدمة",
    type: "select",
    options: ["غسيل خارجي", "خدمات", "مواد تنظيف", "أخرى"],
    required: true,
    sx: { backgroundColor: "#f5f5f5" },
  },
  {
    name: "tree Type",
    label: "الفة الشجرية",
    type: "text",
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "service Description",
    label: "وصف الخدمة",
    type: "text",
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "service Price",
    label: "سعر الخدمة",
    type: "text",
    required: true,
    sx: { backgroundColor: "#f5f5f5" },
  },
  {
    name: "service Duration",
    label: "مدة الخدمة",
    type: "text",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "service Area",
    label: "السبارة المستهدفة",
    type: "text",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "service Image",
    label: "صورة رمزية",
    type: "file",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "service Notes",
    label: "ملاحظات إدارية",
    type: "text",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "service Status",
    label: "تفعيل الخدمة",
    type: "switch",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
];
const itemColumns = [
  { field: "itemCode", headerName: "كود الصنف", type: "autocomplete", required: true, options: topitemCode },
  { field: "itemName", headerName: "اسم الصنف", type: "autocomplete", required: true, options: topitemName },
  { field: "unit", headerName: "الوحدة", type: "readonly", formula: (row) => row.mainUnit || "لتر" },
  { field: "quantity", headerName: "الكمية", type: "number", required: true },
  { field: "unitCost", headerName: "تكلفة الوحدة", type: "number", required: true },
  {
    field: "total",
    headerName: "الإجمالي",
    type: "readonly",
    formula: (row) => Number(row.unitCost || 0) * Number(row.quantity || 0),
  },
  { field: "notes", headerName: "ملاحظات", type: "text" },
];

export const AddService = ({ open, onClose, onSubmit }) => {
  const [detailed, setDetailed] = useState(false);
  const [items, setItems] = useState([]);

  const handleFormSubmit = (data) => {
    if (onSubmit) {
      onSubmit({ ...data, detailed });
    } else {
      console.log(data);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" dir="rtl">
      <DialogTitle sx={{ color: COLORS.PRIMARY, fontWeight: "bold", fontSize: 24 }}>انشاء خدمة</DialogTitle>
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
          showdetailed={true}
          detailed={detailed}
          setDetailed={setDetailed}
          onCancel={onClose}
          extraItems={[<DynamicEditableTable columns={itemColumns} rows={items} setRows={setItems} />]}
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
              onClick={onClose}
              type="button"
            >
              الغاء
            </Button>,
          ]}
        />
      </DialogContent>
    </Dialog>
  );
};
