import React, { useState } from "react";
import {
  Box,
  IconButton,
  Stack,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import StorageIcon from "@mui/icons-material/Storage";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import DynamicForm from "../../custom/DynamicForm";
import Header from "../Header";
import ExportDataButton from "../common/ExportDataButton";
import ImportDataButton from "../common/ImportDataButton";
import { COLORS } from "../../constants";
const branchesNames = [
  { label: "الفرع الرئيسي", value: "main" },
  { label: "فرع الشرق", value: "east" },
  { label: "فرع الغرب", value: "west" },
];
const StorageController = () => {
  const [open, setOpen] = useState(false);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingStorage, setEditingStorage] = useState(null);
  const onClose = () => setOpen(false);

  // Storage form fields
  const storageFields = [
    {
      name: "name", // بدل "storage_name"
      label: "اسم المستودع",
      type: "text",
      sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
    {
      name: "symbol", // بدل "storage_type"
      label: "رمز المستودع",
      type: "text", // رمز مش نوع.. من نوع string
      sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
    {
      name: "branchId",
      label: "الفرع",
      type: "autocomplete",
      options: branchesNames, // ممكن يكون array of strings أو array of objects
      getOptionLabel: (option) => option.label, // لو object
      isOptionEqualToValue: (option, value) => option.label === value.label,
      sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
    {
      name: "address", // بدل "items_count"
      label: "العنوان",
      type: "text",
      sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
    {
      name: "email", // بدل "manager"
      label: "البريد الإلكتروني",
      type: "email",
      sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
    {
      name: "phoneNumber", // لو حبيت تضيفه
      label: "رقم الهاتف",
      type: "text",
      sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
    {
      name: "logo",
      label: "اللوجو (رابط)",
      type: "file",
      sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
    {
      name: "isActive", // بدل "status"
      label: "الحالة",
      type: "switch", // أو checkbox حسب التصميم
      sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
  ];

  // Initial sample data for storages
  const [storages, setStorages] = useState([
    {
      id: 1,
      storageName: "المستودع الرئيسي",
      storageType: "رئيسي",
      branch: "الفرع الرئيسي",
      itemsCount: 250,
      manager: "أحمد محمد",
      status: "نشط",
    },
    {
      id: 2,
      storageName: "مستودع الزيوت",
      storageType: "مخزن زيوت",
      branch: "فرع الشرق",
      itemsCount: 85,
      manager: "خالد علي",
      status: "نشط",
    },
    {
      id: 3,
      storageName: "مستودع المواد",
      storageType: "مخزن مواد",
      branch: "فرع الغرب",
      itemsCount: 150,
      manager: "سارة أحمد",
      status: "مغلق",
    },
    {
      id: 4,
      storageName: "المستودع الفرعي الأول",
      storageType: "فرعي",
      branch: "فرع الشمال",
      itemsCount: 120,
      manager: "محمد يوسف",
      status: "نشط",
    },
    {
      id: 5,
      storageName: "المستودع الفرعي الثاني",
      storageType: "فرعي",
      branch: "الفرع الرئيسي",
      itemsCount: 95,
      manager: "فاطمة حسن",
      status: "نشط",
    },
  ]);

  const handleAddStorage = (formData) => {
    console.log("New storage data:", formData);

    const newStorage = {
      id: storages.length + 1,
      storageName: formData["storage_name"] || "",
      storageType: formData["storage_type"] || "",
      branch: formData["branch"] || "",
      itemsCount: parseInt(formData["items_count"]) || 0,
      manager: formData["manager"] || "",
      status: formData["status"] || "نشط",
    };

    setStorages((prevStorages) => [...prevStorages, newStorage]);
    onClose();
  };

  const handleEdit = (storage) => {
    setEditingStorage(storage);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingStorage) {
      setStorages((prevStorages) =>
        prevStorages.map((storage) => (storage.id === editingStorage.id ? editingStorage : storage))
      );
      setEditDialogOpen(false);
      setEditingStorage(null);
    }
  };

  const handleDelete = (storageId) => {
    setStorages((prevStorages) => prevStorages.filter((storage) => storage.id !== storageId));
  };

  const handleView = (storage) => {
    setSelectedStorage(storage);
  };

  // Custom mapping function for export
  const mapStorageDataToCSV = (data, headers) => {
    const csvHeaders = ["اسم المستودع", "النوع", "الفرع", "عدد الأصناف", "المسؤول", "الحالة"];
    return [
      csvHeaders.join(","),
      ...data.map((storage) =>
        [
          storage.storageName,
          storage.storageType,
          storage.branch,
          storage.itemsCount,
          storage.manager,
          storage.status,
        ].join(",")
      ),
    ].join("\n");
  };

  // Custom parsing function for import
  const parseStorageCSV = (text) => {
    const rows = text.split("\n");
    const headers = rows[0].split(",");

    return rows
      .slice(1)
      .filter((row) => row.trim())
      .map((row, index) => {
        const values = row.split(",");
        return {
          id: storages.length + index + 1,
          storageName: values[0] || "",
          storageType: values[1] || "",
          branch: values[2] || "",
          itemsCount: parseInt(values[3]) || 0,
          manager: values[4] || "",
          status: values[5] || "نشط",
        };
      });
  };

  // Handle imported data
  const handleDataImported = (importedData) => {
    setStorages((prevStorages) => [...prevStorages, ...importedData]);
  };

  // Validation function for imported data
  const validateStorageData = (data) => {
    const errors = [];

    data.forEach((item, index) => {
      if (!item.storageName || item.storageName.trim() === "") {
        errors.push(`الصف ${index + 1}: اسم المستودع مطلوب`);
      }
      if (!item.storageType || item.storageType.trim() === "") {
        errors.push(`الصف ${index + 1}: نوع المستودع مطلوب`);
      }
      if (!item.branch || item.branch.trim() === "") {
        errors.push(`الصف ${index + 1}: الفرع مطلوب`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  const formButtons = (
    <>
      <Button
        type="submit"
        sx={{
          backgroundColor: COLORS.PRIMARY,
          color: "#fff",
          px: 5,
          py: 1.5,
          fontWeight: "bold",
          width: "50%",
          "&:hover": {
            backgroundColor: "#fff",
            color: COLORS.PRIMARY,
          },
        }}
      >
        حفظ
      </Button>
      <Button
        type="button"
        onClick={onClose}
        sx={{
          backgroundColor: "#ffffff",
          color: COLORS.PRIMARY,
          px: 5,
          py: 1.5,
          fontWeight: "bold",
          width: "50%",
          border: `1px solid ${COLORS.PRIMARY}`,
          "&:hover": {
            backgroundColor: COLORS.PRIMARY,
            color: "#fff",
          },
        }}
      >
        إلغاء
      </Button>
    </>
  );

  const columns = [
    {
      field: "storageName",
      headerName: "اسم المستودع",
      width: 150,
      resizable: true,
    },
    {
      field: "storageType",
      headerName: "النوع",
      width: 120,
      resizable: true,
    },
    {
      field: "branch",
      headerName: "الفرع",
      width: 130,
      resizable: true,
    },
    {
      field: "itemsCount",
      headerName: "عدد الأصناف",
      width: 100,
      resizable: true,
    },
    {
      field: "manager",
      headerName: "المسؤول",
      width: 120,
      resizable: true,
    },
    {
      field: "status",
      headerName: "الحالة",
      width: 100,
      resizable: true,
    },
    {
      field: "actions",
      headerName: "الإجراءات",
      width: 150,
      resizable: true,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton color="primary" onClick={() => handleEdit(params.row)} size="small" title="تعديل">
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)} size="small" title="حذف">
            <DeleteIcon />
          </IconButton>
          <IconButton color="info" onClick={() => handleView(params.row)} size="small" title="عرض التفاصيل">
            <VisibilityIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Header title="إدارة المستودعات" btnTitle="إضافة مستودع" setOpen={setOpen} />

      <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
        <ExportDataButton data={storages} filename="storage_data.csv" mapDataToCSV={mapStorageDataToCSV} />
        <ImportDataButton
          onDataImported={handleDataImported}
          parseCSV={parseStorageCSV}
          validateData={validateStorageData}
        />
      </Box>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={storages}
          columns={columns}
          sx={{
            maxWidth: "100%",
            overflow: "hidden",
            "& .MuiDataGrid-root": {
              width: "100%",
              maxWidth: "100%",
            },
            "& .MuiDataGrid-main": {
              width: "100%",
              maxWidth: "100%",
            },
            "& .MuiDataGrid-virtualScroller": {
              width: "100%",
              maxWidth: "100%",
            },
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            "& .MuiDataGrid-columnHeader": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
              color: COLORS.PRIMARY,
            },
            "& .MuiTablePagination-displayedRows": {
              direction: "rtl",
            },
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          autoHeight={false}
        />
      </Box>

      {/* Storage Details View */}
      {selectedStorage && (
        <Card
          sx={{
            mt: 2,
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            borderRadius: 3,
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: COLORS.PRIMARY,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <StorageIcon />
                تفاصيل المستودع
              </Typography>
              <Button variant="outlined" onClick={() => setSelectedStorage(null)} sx={{ minWidth: "auto", px: 2 }}>
                إخفاء
              </Button>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: "rgba(255,255,255,0.8)",
                    borderRadius: 2,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, color: COLORS.PRIMARY, fontWeight: "bold" }}>
                    المعلومات الأساسية
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 120 }}>
                        اسم المستودع:
                      </Typography>
                      <Typography variant="body1">{selectedStorage.storageName}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 120 }}>
                        النوع:
                      </Typography>
                      <Chip label={selectedStorage.storageType} color="primary" size="small" />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <BusinessIcon color="info" />
                      <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 100 }}>
                        الفرع:
                      </Typography>
                      <Typography variant="body1">{selectedStorage.branch}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 120 }}>
                        الحالة:
                      </Typography>
                      <Chip
                        label={selectedStorage.status}
                        color={selectedStorage.status === "نشط" ? "success" : "error"}
                        icon={selectedStorage.status === "نشط" ? <CheckCircleIcon /> : <CancelIcon />}
                        size="small"
                      />
                    </Box>
                  </Stack>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: "rgba(255,255,255,0.8)",
                    borderRadius: 2,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, color: COLORS.PRIMARY, fontWeight: "bold" }}>
                    تفاصيل إضافية
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <InventoryIcon color="success" />
                      <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 120 }}>
                        عدد الأصناف:
                      </Typography>
                      <Typography variant="body1" sx={{ color: "green", fontWeight: "bold" }}>
                        {selectedStorage.itemsCount} صنف
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PersonIcon color="warning" />
                      <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 120 }}>
                        المسؤول:
                      </Typography>
                      <Typography variant="body1">{selectedStorage.manager}</Typography>
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: COLORS.PRIMARY, fontWeight: "bold" }}>تعديل حالة المستودع</DialogTitle>
        <DialogContent>
          {editingStorage && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {editingStorage.storageName}
              </Typography>
              <FormControl fullWidth>
                <InputLabel>حالة المستودع</InputLabel>
                <Select
                  value={editingStorage.status}
                  label="حالة المستودع"
                  onChange={(e) =>
                    setEditingStorage({
                      ...editingStorage,
                      status: e.target.value,
                    })
                  }
                >
                  <MenuItem value="نشط">نشط</MenuItem>
                  <MenuItem value="مغلق">مغلق</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>إلغاء</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            حفظ التغييرات
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Storage Dialog */}
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" dir="rtl">
        <DialogTitle sx={{ color: COLORS.PRIMARY, fontWeight: "bold", fontSize: 24 }}>إضافة مستودع جديد</DialogTitle>
        <DialogContent>
          <DynamicForm
            fields={storageFields}
            onSubmit={handleAddStorage}
            formStyle={{
              backgroundColor: "#fafafa",
              padding: 0,
              borderRadius: 8,
            }}
            fieldWrapperStyle={{ marginBottom: 10 }}
            formButtons={formButtons}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default StorageController;
