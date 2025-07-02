import React, { useState, useEffect } from "react";
import DynamicForm from "../../../custom/DynamicForm";
import { fields } from "./SupplierFields";
import { Dialog, DialogTitle, DialogContent, Button, Box } from "@mui/material";
import SupplierTable from "./SupplierTable";

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
          submitButtonProps={{
            sx: {
              backgroundColor: "#1976d2",
              color: "#fff",
              px: 5,
              py: 1.5,
              fontWeight: "bold",
              width: "50%",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#1976d2",
              },
            },
            children: initialData ? "تحديث" : "حفظ",
          }}
          showdetailed={true}
          detailed={detailed}
          setDetailed={setDetailed}
          showCancelButton={true}
          onCancel={onClose}
          cancelButtonProps={{
            sx: {
              backgroundColor: "#ffffff",
              color: "#1976d2",
              px: 5,
              py: 1.5,
              fontWeight: "bold",
              width: "50%",
              border: "1px solid #1976d2",
              "&:hover": {
                backgroundColor: "#1976d2",
                color: "#fff",
              },
            },
            children: "إلغاء",
          }}
          initialValues={formData}
        />
      </DialogContent>
    </Dialog>
  );
};

const initialRows = [
  // Example initial data, or leave empty []
];

const SupplierCreationButton = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState(initialRows);
  const [editRow, setEditRow] = useState(null);

  const handleAddSupplier = (data) => {
    let id = 0;
    if (editRow) {
      // Edit mode
      setRows((prev) =>
        prev.map((row) => (row.id === editRow.id ? { ...row, ...data } : row))
      );
      setEditRow(null);
    } else {
      // Add mode
      setRows((prev) => [
        ...prev,
        { ...data, id: id + 1 }, // Use Date.now() for unique id
      ]);
    }
  };

  const handleEdit = (row) => {
    setEditRow(row);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const handleClose = () => {
    setOpen(false);
    setEditRow(null);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 6,
          fontFamily: "'Cairo', 'Segoe UI', sans-serif",
          direction: "ltr",
        }}
      >
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 4 },
            overflow: "auto",
            position: "relative",
            borderRadius: "16px",
            backgroundColor: "white",
            margin: "16px 0px 0px 16px",
          }}
        >
          <Button variant="contained" onClick={() => setOpen(true)}>
            إضافة مورد جديد
          </Button>
          <SupplierCreationForm
            open={open}
            onClose={handleClose}
            onSubmit={handleAddSupplier}
            initialData={editRow}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 4, minHeight: "70vh", width: "100%" }}>
        <SupplierTable
          rows={rows}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Box>
    </>
  );
};

export default SupplierCreationButton;
