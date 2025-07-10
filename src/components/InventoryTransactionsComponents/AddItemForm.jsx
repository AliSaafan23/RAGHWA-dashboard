import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import { COLORS } from '../../constants'
import DynamicForm from '../../custom/DynamicForm';
const itemFormFields = [
  {
    name: "itemCode",
    label: "كود الصنف ",
    type: "text",
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
   {
    name: "itemName",
    label: "اسم الصنف ",
    type: "text",
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
     {
    name: "quantity",
    label: " الكمية ",
    type: "number",
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
       {
    name: "unit",
    label: " الوحدة",
    type: "select",
    options: ["قطعة", "كيلو", "لتر", "علبة", "طرد"],
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
       {
    name: "price",
    label: "السعر ",
    type: "number",
    required: true,
    sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
  },
]
export default function AddItemForm({open,setOpen}) {
      const handleAddItem = (data) => {
        console.log('added item',data)
        setOpen(false);
  };
  return (
        <Dialog open={open} onClose={()=>setOpen(false)} fullWidth maxWidth="sm" dir="rtl">
          <DialogTitle sx={{ color: COLORS.PRIMARY, fontWeight: "bold", fontSize: 24 }}>
            إضافة صنف
          </DialogTitle>
          <DialogContent>
            <DynamicForm
              fields={itemFormFields}
              onSubmit={handleAddItem}
              formStyle={{ backgroundColor: "#fafafa", borderRadius: 8, p: 2 }}
              fieldWrapperStyle={{ marginBottom: 10 }}
              onCancel={()=>setOpen(false)}
              formButtons={[
                <Button
                  key="add"
                  variant="contained"
                  type="submit"
                  sx={{ backgroundColor: COLORS.PRIMARY, fontWeight: "bold", px: 4, py: 1.5, mr: 2 }}
                >
                  إضافة
                </Button>,
                <Button
                  key="cancel"
                  variant="outlined"
                  onClick={()=>setOpen(false)}
                  sx={{ fontWeight: "bold", px: 4, py: 1.5 }}
                >
                  إلغاء
                </Button>,
              ]}
            />
          </DialogContent>
        </Dialog>  )
}
