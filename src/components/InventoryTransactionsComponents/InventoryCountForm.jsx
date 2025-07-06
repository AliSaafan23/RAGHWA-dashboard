import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import { COLORS } from '../../constants'
import DynamicForm from '../../custom/DynamicForm';

export default function InventoryCountForm({open,onClose}) {
    const [formData, setFormData] = React.useState({});
    const handleFormSubmit=(data)=>{
        setFormData(data);
        console.log("Form submitted", formData);
        onClose();
    }


    const inventories = ['المخزن الرئيسي', 'المخزن الفرعي 1', 'المخزن الفرعي 2'];
    const countTypes = ['جرد كلي', 'جرد جزئي'];
    const users = ['أحمد', 'فاطمة', 'محمد', 'سارة'];

    const inventoryCountFields = [
      {
        name: "inventory",
        label: "المخزن / الفرع",
        type: "select",
        options: inventories,
        required: true,
        sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
      },
      {
        name: "countType",
        label: "نوع الجرد",
        type: "select",
        options: countTypes,
        required: true,
        sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
      },
      {
        name: "countDate",
        label: "تاريخ الجرد",
        type: "date",
        required: true,
        defaultValue: new Date().toISOString().slice(0, 10),
        sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
      },
      {
        name: "countTime",
        label: "وقت الجرد",
        type: "time",
        required: true,
        sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
      },
      {
        name: "countUsers",
        label: "مستخدمي الجرد",
        type: "multiselect",
        options: users,
        required: true,
        sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
      },
    ];


  return (
     <>
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" dir="rtl">
          <DialogTitle sx={{ color: "#185BAA", fontWeight: "bold", fontSize: 30 }}>
           بدء جرد جديد
          </DialogTitle>
          <DialogContent>
            <DynamicForm
              fields={inventoryCountFields}
              onSubmit={handleFormSubmit}
              formStyle={{
                backgroundColor: "#fafafa",
                padding: 0,
                borderRadius: 8,
              }}
              fieldWrapperStyle={{ marginBottom: 10 }}
              showdetailed={false}
              onCancel={onClose}
            //   extraItems={   }
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

                    </>
  )
}
