import React, { useState } from 'react'
import DynamicForm from '../custom/DynamicForm'
import { COLORS } from '../constants';
import { Button } from '@mui/material';

/* const fieldsNames = ["كود الخدمة", "اسم الخدمة","نوع الخدمة","الفئة الشجرية" , 
                 "وصف الخدمة","سعر الخدمة","مدة الخدمة","سعر الخدمة","سعر الخدمة بعد الخصم",
                 "السبارة المستهدفة","وحدة التنفيذ","صورة رمزية","الملحقات المضافة","ملاحظات إدارية","تفعيل الخدمة",
            ] 
*/
const fields = [
    {
        name: "service Code",
        label: "كود الحدمة",
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
        sx: { backgroundColor: "#f5f5f5" ,direction:"rtl" },
    },
    {
        name: "service Duration",
        label: "مدة الخدمة",
        type: "text",
        required: false,
        sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
    {
        name: "service Price After Discount",
        label: "سعر الخدمة بعد الخصم",
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
        name: "service Unit",
        label: "وحدة التنفيذ",
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
        name: "service Attachments",
        label: "الملحقات المضافة",
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
        type: "text",
        required: false,
        sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    }
];

export const AddService = () => {
    const [open, setOpen] = useState(false);
        const  onClose=() => setOpen(false)
        const  onSubmit=(data) => console.log(data)
    const [detailed, setDetailed] = useState(false);
    
      const handleFormSubmit = (data) => {
        onSubmit({ ...data, detailed });
        onClose();
      };


  return (
    <>
        <h1>ادارة الخدمات</h1>
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
                              </Button>
                            ]}
        />
    </>
  )
}
