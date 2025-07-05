import React, { useState, useEffect } from "react";
import DynamicForm from "../../../custom/DynamicForm";
import { fields } from "./SupplierFields";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { COLORS } from "../../../constants";

const SupplierCreationForm = ({
  open,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const [detailed, setDetailed] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setDetailed(initialData.detailed || false);
    } else {
      setFormData({});
      setDetailed(false);
    }
  }, [initialData, open]);

  const handleFormSubmit = (data) => {
    onSubmit({ ...data, detailed });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" dir="rtl">
      <DialogTitle sx={{ color: "#185BAA", fontWeight: "bold", fontSize: 30 }}>
        {initialData ? "تعديل مورد" : "إضافة مورد جديد"}
      </DialogTitle>
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
          initialValues={formData}
          extraItems={
            <FormControlLabel
              control={
                <Switch
                  checked={detailed}
                  onChange={(e) => setDetailed(e.target.checked)}
                  color="primary"
                />
              }
              label="تفعيل"
              sx={{ mt: 2 }}
            />
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default SupplierCreationForm;
