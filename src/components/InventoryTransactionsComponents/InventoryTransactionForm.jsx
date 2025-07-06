import React, { use, useState } from "react";
import DynamicForm from "../../custom/DynamicForm";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import { COLORS } from "../../constants";
import FormWithTableComponent from "../FormWithTableComponent";

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

const itemFormFields = [
  {
    name: "code",
    label: "كود الصنف ",
    type: "text",
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
   {
    name: "name",
    label: "اسم الصنف ",
    type: "text",
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
     {
    name: "quantity",
    label: " الكمية ",
    type: "number",
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
       {
    name: "unit",
    label: " الوحدة",
    type: "select",
    options: ["قطعة", "كيلو", "لتر", "علبة", "طرد"],
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
       {
    name: "price",
    label: "السعر ",
    type: "number",
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
]

const InventoryTransactionForm = ({ open, setOpen }) => {
const [itemData,setItemData]=useState({
  name:'',
  code:'',
  quantity:'',
  unit:'',
  price:''

})
const [items,setItems]=useState([])

const handleAddItem = () => {
  setItems(prev => [...prev, itemData]);
  setItemData({ name:'', code:'', quantity:'', unit:'', price:'' });
};

const handleChange=(e)=>{
const {name,value}=e.target
setItemData((prev)=>({...prev,[name]:value}))
console.log(value)
}
  const handleFormSubmit = (data) => {

    const fullForm = {
    ...data,
    items
  };
  console.log("Full form with items:", fullForm);
  setTimeout(() => setItems([]), 300);
  setOpen(false);
  };

  return (
    <>
    <Dialog open={open} onClose={()=>setOpen(false)} fullWidth maxWidth="md" dir="rtl">
      <DialogTitle sx={{ color: "#185BAA", fontWeight: "bold", fontSize: 30 }}>
        اضافة حركة جديدة
      </DialogTitle>
      <DialogContent>
        {/*فورم اضافة الحركة المخزنية */}
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
          onCancel={() => setOpen(false)}
          extraItems={[
         <FormWithTableComponent formFields={itemFormFields} items={items} itemData={itemData} handleChange={handleChange} handleAddItem={handleAddItem}  />
          ]}
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
              onClick={() => setOpen(false)}
              type="button"
            >
              الغاء
            </Button>,
          ]}
        />
      </DialogContent>
    </Dialog>
                </>
  );
};

export default InventoryTransactionForm;
