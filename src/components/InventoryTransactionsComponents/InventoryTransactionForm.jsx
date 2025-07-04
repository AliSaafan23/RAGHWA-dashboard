
import React, { useState } from "react";
import DynamicForm from "../../custom/DynamicForm";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { COLORS } from "../../constants";
import AddItemForm from "./AddItemForm";

const warehouseOptions = ["رئيسي", "فرعي 1", "فرعي 2", "مخزن إضافي"];
const typeOptions = ["توريد", "صرف", "تحويل", "جرد", "إتلاف", "بضاعة أول المدة", "مرتجع مشتريات", "مرتجع مبيعات"];

const inventoryFormFields = [
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
    label: " رقم المرجع",
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
    name: "attachments",
    label: "المرفقات",
    type: "file",
    required: false,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
];
;


const InventoryTransactionForm = ({ open, onClose }) => {
  const [showAddItemForm, setShowAddItemForm] = useState(false);

  const handleFormSubmit = (data) => {
    console.log({ ...data});
    onClose();
  };


  return (
    <>
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" dir="rtl">
      <DialogTitle sx={{ color: "#185BAA", fontWeight: "bold", fontSize: 30 }}>
        اضافة حركة جديدة
      </DialogTitle>
      <DialogContent>
        <DynamicForm
          fields={inventoryFormFields}
          onSubmit={handleFormSubmit}
          formStyle={{
            backgroundColor: "#fafafa",
            padding: 0,
            borderRadius: 8,
          }}
          fieldWrapperStyle={{ marginBottom: 10 }}
          showdetailed={false}
          onCancel={onClose}
          extraItems={
            <Button
              key="add-item"
              variant="outlined"
              color="primary"
              sx={{
                mb: 3,
                fontWeight: 'bold',
                fontSize: 18,
                backgroundColor: '#f5faff',
              }}
              startIcon={<AddIcon sx={{ fontSize: 28 }} />}
              onClick={() => setShowAddItemForm(true)}
            >
              اضف صنف
            </Button>
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
              key="save-approve"
              type="submit"
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
            >
              حفظ واعتماد
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
     <AddItemForm
                  open={showAddItemForm}
                  onClose={() => setShowAddItemForm(false)}
                />
                </>
  );
};

export default InventoryTransactionForm;
