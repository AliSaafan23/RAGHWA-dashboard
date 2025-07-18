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
import { AddService } from "../components/Add Service/AddService";
import Header from "../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BuildIcon from "@mui/icons-material/Build";
import { COLORS } from "../constants";

const ServiceManagement = () => {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const onClose = () => setOpen(false);

  // Initial sample data for services
  const [services, setServices] = useState([
    {
      id: 1,
      serviceCode: "SRV001",
      serviceName: "غسيل خارجي",
      serviceType: "غسيل",
      servicePrice: "50",
      serviceDuration: "30 ",
      serviceAttachments: "شامبو، ملمع",
      serviceStatus: "مفعل",
    },
    {
      id: 2,
      serviceCode: "SRV002",
      serviceName: "تنظيف داخلي",
      serviceType: "تنظيف",
      servicePrice: "75",
      serviceDuration: "45 ",
      serviceAttachments: "مكنسة، معطر",
      serviceStatus: "مفعل",
    },
    {
      id: 3,
      serviceCode: "SRV003",
      serviceName: "تلميع السيارة",
      serviceType: "تلميع",
      servicePrice: "100",
      serviceDuration: "60 ",
      serviceAttachments: "شمع، قماش",
      serviceStatus: "غير مفعل",
    },
    {
      id: 4,
      serviceCode: "SRV004",
      serviceName: "غسيل شامل",
      serviceType: "غسيل",
      servicePrice: "120",
      serviceDuration: "90 ",
      serviceAttachments: "شامبو، ملمع، شمع",
      serviceStatus: "مفعل",
    },
    {
      id: 5,
      serviceCode: "SRV005",
      serviceName: "تنظيف المحرك",
      serviceType: "تنظيف",
      servicePrice: "80",
      serviceDuration: "40 ",
      serviceAttachments: "منظف محرك، فرشاة",
      serviceStatus: "مفعل",
    },
  ]);

  const handleAddService = (formData) => {
    console.log("New service data:", formData);

    // Create new service object
    const newService = {
      id: services.length + 1, // Generate new ID
      serviceCode: formData["service Code"] || `SRV${String(services.length + 1).padStart(3, "0")}`,
      serviceName: formData["service Name"] || "",
      serviceType: formData["service Type"] || "",
      servicePrice: formData["service Price"] || "",
      serviceDuration: formData["service Duration"] || "",
      serviceAttachments: formData.serviceAttachments
        ? formData.serviceAttachments.map((att) => `${att.category}: ${att.value}`).join(", ")
        : "",
      serviceStatus: formData["service Status"] || "مفعل",
    };

    // Add new service to the table
    setServices((prevServices) => [...prevServices, newService]);

    // Close the dialog
    onClose();
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingService) {
      setServices((prevServices) =>
        prevServices.map((service) => (service.id === editingService.id ? editingService : service))
      );
      setEditDialogOpen(false);
      setEditingService(null);
    }
  };

  const handleDelete = (serviceId) => {
    console.log("Delete service:", serviceId);
    // Remove service from the table
    setServices((prevServices) => prevServices.filter((service) => service.id !== serviceId));
  };

  const handleView = (service) => {
    setSelectedService(service);
  };

  const columns = [
    {
      field: "serviceCode",
      headerName: "كود الخدمة",
      width: 120,
      resizable: true,
    },
    {
      field: "serviceName",
      headerName: "اسم الخدمة",
      width: 150,
      resizable: true,
    },
    {
      field: "serviceType",
      headerName: "نوع الخدمة",
      width: 120,
      resizable: true,
    },
    {
      field: "servicePrice",
      headerName: "سعر الخدمة",
      width: 100,
      resizable: true,
    },
    {
      field: "serviceDuration",
      headerName: "مدة الخدمة",
      width: 80,
      resizable: true,
    },
    {
      field: "serviceAttachments",
      headerName: "الملحقات المضافة",
      width: 150,
      resizable: true,
    },
    {
      field: "serviceStatus",
      headerName: "تفعيل الخدمة",
      width: 120,
      resizable: true,
    },
    {
      field: "actions",
      headerName: "التعديلات",
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
      <Header title="ادارة الخدمات" btnTitle="انشاء خدمة" setOpen={setOpen} />

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={services}
          columns={columns}
          sx={{
            width: "100%",
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

      {/* Service Details View */}
      {selectedService && (
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
                <BuildIcon />
                تفاصيل الخدمة
              </Typography>
              <Button variant="outlined" onClick={() => setSelectedService(null)} sx={{ minWidth: "auto", px: 2 }}>
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
                        كود الخدمة:
                      </Typography>
                      <Chip label={selectedService.serviceCode} color="primary" size="small" />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 120 }}>
                        اسم الخدمة:
                      </Typography>
                      <Typography variant="body1">{selectedService.serviceName}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 120 }}>
                        نوع الخدمة:
                      </Typography>
                      <Chip label={selectedService.serviceType} color="secondary" size="small" />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 120 }}>
                        الحالة:
                      </Typography>
                      <Chip
                        label={selectedService.serviceStatus}
                        color={selectedService.serviceStatus === "مفعل" ? "success" : "error"}
                        icon={selectedService.serviceStatus === "مفعل" ? <CheckCircleIcon /> : <CancelIcon />}
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
                    تفاصيل الخدمة
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AttachMoneyIcon color="success" />
                      <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 80 }}>
                        السعر:
                      </Typography>
                      <Typography variant="body1" sx={{ color: "green", fontWeight: "bold" }}>
                        {selectedService.servicePrice} ريال
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AccessTimeIcon color="info" />
                      <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 80 }}>
                        المدة:
                      </Typography>
                      <Typography variant="body1">{selectedService.serviceDuration} دقيقة</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                      <BuildIcon color="warning" />
                      <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 80 }}>
                        الملحقات:
                      </Typography>
                      <Typography variant="body1">{selectedService.serviceAttachments}</Typography>
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
        <DialogTitle sx={{ color: COLORS.PRIMARY, fontWeight: "bold" }}>تعديل حالة الخدمة</DialogTitle>
        <DialogContent>
          {editingService && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {editingService.serviceName} - {editingService.serviceCode}
              </Typography>
              <FormControl fullWidth>
                <InputLabel>حالة الخدمة</InputLabel>
                <Select
                  value={editingService.serviceStatus}
                  label="حالة الخدمة"
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      serviceStatus: e.target.value,
                    })
                  }
                >
                  <MenuItem value="مفعل">مفعل</MenuItem>
                  <MenuItem value="غير مفعل">غير مفعل</MenuItem>
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

      <AddService open={open} onClose={onClose} onSubmit={handleAddService} />
    </Box>
  );
};

export default ServiceManagement;
