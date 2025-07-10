import React, { use, useState } from "react";
import DynamicForm from "../../custom/DynamicForm";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  TextField,
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
          <Box sx={{display:'flex',flexDirection:'column',gap:2, mb:2}}>
            <Box sx={{display:'flex',alignItems:'center', gap:2}}>
              {itemFormFields.map((item) => {
                if (item.type === 'select') {
                  return (
                    <TextField
                      key={item.name}
                      label={item.label}
                      select
                      name={item.name}
                      value={itemData[item.name]}
                      onChange={handleChange}
                      required={item.required}
                      size="small"
                      sx={{ minWidth: 90, background: '#f5f5f5', borderRadius: 2 }}
                      SelectProps={{ native: true }}
                    >
                      <option value=""></option>
                      {item.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </TextField>
                  );
                } else {
                  return (
                    <TextField
                      key={item.name}
                      label={item.label}
                      type={item.type}
                      name={item.name}
                      value={itemData[item.name] }
                      onChange={handleChange}
                      required={item.required}
                      size="small"
                      sx={{ minWidth: 90, background: '#f5f5f5', borderRadius: 2 }}
                    />
                  );
                }
              })}
              <Button
                disabled={
                  !itemFormFields.every(f => itemData[f.name])
                }
                key="add-item"
                variant="outlined"
                color="primary"
                sx={{
                  mb: 1,
                  fontWeight: 'bold',
                  fontSize: 18,
                  backgroundColor: '#f5faff',
                }}
                startIcon={<AddIcon sx={{ fontSize: 22 }} />}
                onClick={handleAddItem}
              >
                اضف صنف
              </Button>
            </Box>
            {/* جدول الاصناف المضافة */}
            {items.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden', direction: 'rtl' }}>
                  <thead style={{ background: '#f0f0f0' }}>
                    <tr>
                      <th style={{ padding: 8, border: '1px solid #e0e0e0' }}>#</th>
                      {itemFormFields.map(f => (
                        <th key={f.name} style={{ padding: 8, border: '1px solid #e0e0e0' }}>{f.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ padding: 8, border: '1px solid #e0e0e0', textAlign: 'center' }}>{idx + 1}</td>
                        {itemFormFields.map(f => (
                          <td key={f.name} style={{ padding: 8, border: '1px solid #e0e0e0', textAlign: 'center' }}>{item[f.name]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            )}
          </Box>
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
