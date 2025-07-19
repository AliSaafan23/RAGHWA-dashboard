import React, { useState, useEffect } from "react";
import DynamicForm from "../../custom/DynamicForm";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { COLORS } from "../../constants";
import { frameData } from "framer-motion";
import DynamicEditableTable from "../../custom/DynamicEditableTable";
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
];
const top100suppliers = [
  { label: "Supplier A", id: 1 },
  { label: "Supplier B", id: 2 },
  { label: "Supplier C", id: 3 },
];
const itemColumns = [
  { field: "itemCode", headerName: "كود الصنف", type: "autocomplete", required: true, options: top100Films },
  { field: "itemName", headerName: "اسم الصنف", type: "autocomplete", required: true, options: top100Films },
  { field: "unit", headerName: "الوحدة", type: "readonly", formula: (row) => row.mainUnit || "لتر" },
  { field: "quantity", headerName: "الكمية", type: "number", required: true },
  // { field: "unitCost", headerName: "تكلفة الوحدة", type: "number", required: true , },
  {
    field: "total",
    headerName: "الإجمالي",
    type: "readonly",
    formula: (row) => Number(row.unitCost || 0) * Number(row.quantity || 0),
  },
  { field: "notes", headerName: "ملاحظات", type: "text" },
];

const allFields = [
  {
    name: "type",
    label: "النوع",
    type: "select",
    required: true,
    options: ["صنف أولي", "منتج نهائي", "منتج مركب"],
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "prodCode",
    label: "كود الصنف",
    type: "text",
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "selectedCode",
    label: "اختر كود الصنف",
    type: "autocomplete",
    options: top100Films, // ممكن يكون array of strings أو array of objects
    getOptionLabel: (option) => option.label, // لو object
    isOptionEqualToValue: (option, value) => option.label === value.label,
    required: true,
  },
  {
    name: "name",
    label: "الاسم",
    type: "text",
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "mainUnit",
    label: "وحدة القياس",
    type: "select",
    required: true,
    options: ["قطعة", "علبة", "لتر", "كيلو", "جرام", "خدمة"],
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "AlternativeUnit",
    label: "الوحدة البديلة",
    type: "text",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "barCode",
    label: "الباركود",
    type: "text",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "image",
    label: "رابط الصورة",
    type: "file",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "description",
    label: "الوصف",
    type: "textarea",
    required: false,
    multiline: true,
    rows: 3,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "addingDate",
    label: "تاريخ الإضافة",
    type: "date",
    required: true,
    defaultValue: "2024-01-01",
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },

  {
    name: "minStock",
    label: "الحد الأدنى للمخزون",
    type: "number",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "maxStock",
    label: "الحد الأعلى للمخزون",
    type: "number",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "supplier",
    label: "اختر اسم المورد",
    type: "autocomplete",
    options: top100suppliers, // ممكن يكون array of strings أو array of objects
    getOptionLabel: (option) => option.label, // لو object
    isOptionEqualToValue: (option, value) => option.label === value.label,
    required: true,
  },
  {
    name: "value",
    label: "القيمة",
    type: "number",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "duration",
    label: "المدة (مثلاً بالدقائق)",
    type: "number",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "purchasePrice",
    label: "سعر الشراء",
    type: "number",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "sellingPrice",
    label: "سعر البيع",
    type: "number",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "expiry",
    label: "تاريخ الصلاحية",
    type: "date",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
  {
    name: "isActive",
    label: "نشط",
    type: "switch",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
];

const fieldsVisibilityByType = {
  "صنف أولي": {
    prodCode: true,
    mainUnit: true,
    AlternativeUnit: true,
    minStock: false,
    maxStock: false,
    supplier: true,
    image: true,
    value: false,
    duration: false,
    barCode: true,
    purchasePrice: true,
    sellingPrice: false,
    expiry: true,
    description: true,
    addingDate: true,
  },
  "منتج نهائي": {
    prodCode: true,
    mainUnit: true,
    AlternativeUnit: true,
    minStock: false,
    maxStock: false,
    supplier: true,
    image: true,
    value: false,
    duration: false,
    barCode: true,
    purchasePrice: true,
    sellingPrice: false,
    expiry: true,
    description: true,
    addingDate: true,
  },
  "منتج مركب": {
    selectedCode: false,
    prodCode: true,
    mainUnit: false,
    AlternativeUnit: false,
    minStock: false,
    maxStock: false,
    supplier: false,
    image: true,
    value: false,
    duration: false,
    barCode: false,
    purchasePrice: false,
    sellingPrice: false,
    expiry: false,
    description: true,
    addingDate: true,
  },
};

export default function RegistrationOFItemForm({ open, onClose, initialData }) {
  const [formData, setFormData] = useState(initialData || { type: "صنف أولي" });
  const [filteredFields, setFilteredFields] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const type = formData.type || "صنف أولي";
    const visibility = fieldsVisibilityByType[type];

    const alwaysVisibleFields = ["type", "name", "isActive"];

    const visibleFields = allFields.filter((field) => {
      if (alwaysVisibleFields.includes(field.name)) return true;
      return visibility?.[field.name] === true;
    });

    const sortedFields = [...visibleFields].sort((a, b) => {
      const aIndex = allFields.findIndex((f) => f.name === a.name);
      const bIndex = allFields.findIndex((f) => f.name === b.name);
      return aIndex - bIndex;
    });

    setFilteredFields(sortedFields);

    setFormData((prev) => {
      const cleanedData = { ...prev, type };

      Object.keys(cleanedData).forEach((key) => {
        if (!alwaysVisibleFields.includes(key) && visibility?.[key] === false) {
          delete cleanedData[key];
        }
      });

      // إعادة تعيين selectedCode إذا النوع مش منتج مركب
      if (type !== " منتج مركب" && cleanedData.selectedCode) {
        delete cleanedData.selectedCode;
      }

      return cleanedData;
    });
  }, [formData.type]);

  const handleFormSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    onClose();
  };

  // حضر الحقول مع القيمة والتغيير
  const updatedFields = filteredFields.map((field) => {
    if (field.name === "type") {
      return {
        ...field,
        value: formData.type,
        onChange: (e) => setFormData((prev) => ({ ...prev, type: e.target.value })),
      };
    }

    if (field.type === "autocomplete") {
      return {
        ...field,
        value: formData[field.name] || null,
        onChange: (e, newValue) => setFormData((prev) => ({ ...prev, [field.name]: newValue })),
      };
    }

    return {
      ...field,
      value: formData[field.name] || "",
      onChange: (e) => setFormData((prev) => ({ ...prev, [field.name]: e.target.value })),
    };
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" dir="rtl">
      <DialogTitle sx={{ color: "#185BAA", fontWeight: "bold", fontSize: 30 }}>انشاء صنف جديد</DialogTitle>
      <DialogContent sx={{ backgroundColor: "#fafafa", borderRadius: 2 }}>
        <DynamicForm
          fields={updatedFields}
          onSubmit={handleFormSubmit}
          formData={formData}
          setFormData={setFormData}
          formStyle={{
            backgroundColor: "#fafafa",
            padding: 0,
            borderRadius: 8,
            width: "100%",
          }}
          extraItems={
            formData.type === "منتج مركب"
              ? [<DynamicEditableTable columns={itemColumns} rows={items} setRows={setItems} />]
              : []
          }
          fieldWrapperStyle={{ marginBottom: 10 }}
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
          fieldsPerRow={2}
        />
      </DialogContent>
    </Dialog>
  );
}
