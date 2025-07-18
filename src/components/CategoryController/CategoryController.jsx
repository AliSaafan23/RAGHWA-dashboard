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
import CategoryIcon from "@mui/icons-material/Category";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DynamicForm from "../../custom/DynamicForm";
import Header from "../Header";
import { COLORS } from "../../constants";

const CategoryController = () => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const onClose = () => setOpen(false);

  // Category form fields based on the image
  const categoryFields = [
    {
      name: "item_name",
      label: "اسم الصنف",
      type: "text",
      sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
    {
      name: "item_type",
      label: "نوع الصنف",
      type: "select",
      options: ["رئيسي/أولي", "مخزن مواد/مخزن زيوت", "قطع غيار", "مستلزمات صيانة"],
      sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
    {
      name: "branch",
      label: "الفرع",
      type: "select",
      options: ["الفرع الرئيسي", "فرع الشرق", "فرع الغرب", "فرع الشمال"],
      sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
    {
      name: "main_category",
      label: "الفئة الرئيسية",
      type: "select",
      options: ["خدمات", "مواد استهلاكية", "قطع غيار", "مستلزمات صيانة"],
      sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
    {
      name: "sub_category",
      label: "الفئة الفرعية",
      type: "select",
      options: ["تشحيم", "داخلي", "خارجي", "غسيل خارجي"],
      sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
    {
      name: "unit_main",
      label: "الوحدة الرئيسية",
      type: "select",
      options: ["وحدة خدمة", "كرتونة", "قطعة", "لتر"],
      sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
    {
      name: "unit_sub",
      label: "الوحدة الفرعية",
      type: "select",
      options: ["قطعة", "كيس", "علبة", "زجاجة"],
      sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
    {
      name: "barcode",
      label: "الباركود",
      type: "text",
      sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
    {
      name: "item_code",
      label: "كود الصنف",
      type: "text",
      sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
    {
      name: "minimum_stock",
      label: "الحد الأدنى للمخزون",
      type: "number",
      sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
    {
      name: "maximum_stock",
      label: "الحد الأقصى للمخزون",
      type: "number",
      sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
    {
      name: "reorder_point",
      label: "نقطة إعادة الطلب",
      type: "number",
      sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
    {
      name: "cost_price",
      label: "سعر التكلفة",
      type: "number",
      sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
    {
      name: "selling_price",
      label: "سعر البيع",
      type: "number",
      sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
    {
      name: "tax_rate",
      label: "معدل الضريبة (%)",
      type: "number",
      sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
    {
      name: "supplier",
      label: "المورد",
      type: "text",
      sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
    {
      name: "status",
      label: "الحالة",
      type: "select",
      options: ["نشط", "غير نشط", "مغلق"],
      sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
    },
  ];

  // Initial sample data for categories
  const [categories, setCategories] = useState([
    {
      id: 1,
      itemName: "زيت محرك 5W-30",
      itemType: "مخزن زيوت",
      branch: "الفرع الرئيسي",
      mainCategory: "مستلزمات صيانة",
      subCategory: "تشحيم",
      unitMain: "لتر",
      unitSub: "زجاجة",
      barcode: "123456789012",
      itemCode: "OIL001",
      minimumStock: 50,
      maximumStock: 500,
      reorderPoint: 100,
      costPrice: 25.5,
      sellingPrice: 35.0,
      taxRate: 15,
      supplier: "شركة الزيوت المتحدة",
      status: "نشط",
    },
    {
      id: 2,
      itemName: "فلتر هواء",
      itemType: "قطع غيار",
      branch: "فرع الشرق",
      mainCategory: "قطع غيار",
      subCategory: "داخلي",
      unitMain: "قطعة",
      unitSub: "قطعة",
      barcode: "123456789013",
      itemCode: "FLT001",
      minimumStock: 20,
      maximumStock: 200,
      reorderPoint: 50,
      costPrice: 15.0,
      sellingPrice: 22.0,
      taxRate: 15,
      supplier: "مؤسسة القطع الأصلية",
      status: "نشط",
    },
    {
      id: 3,
      itemName: "خدمة غسيل خارجي",
      itemType: "رئيسي/أولي",
      branch: "فرع الغرب",
      mainCategory: "خدمات",
      subCategory: "غسيل خارجي",
      unitMain: "وحدة خدمة",
      unitSub: "وحدة خدمة",
      barcode: "123456789014",
      itemCode: "SRV001",
      minimumStock: 0,
      maximumStock: 0,
      reorderPoint: 0,
      costPrice: 10.0,
      sellingPrice: 25.0,
      taxRate: 15,
      supplier: "داخلي",
      status: "نشط",
    },
    {
      id: 4,
      itemName: "شامبو سيارات",
      itemType: "مواد استهلاكية",
      branch: "الفرع الرئيسي",
      mainCategory: "مواد استهلاكية",
      subCategory: "خارجي",
      unitMain: "لتر",
      unitSub: "علبة",
      barcode: "123456789015",
      itemCode: "SHP001",
      minimumStock: 30,
      maximumStock: 300,
      reorderPoint: 75,
      costPrice: 8.5,
      sellingPrice: 15.0,
      taxRate: 15,
      supplier: "شركة المنظفات الحديثة",
      status: "نشط",
    },
    {
      id: 5,
      itemName: "إطار 195/65R15",
      itemType: "قطع غيار",
      branch: "فرع الشمال",
      mainCategory: "قطع غيار",
      subCategory: "خارجي",
      unitMain: "قطعة",
      unitSub: "قطعة",
      barcode: "123456789016",
      itemCode: "TIR001",
      minimumStock: 10,
      maximumStock: 100,
      reorderPoint: 25,
      costPrice: 120.0,
      sellingPrice: 180.0,
      taxRate: 15,
      supplier: "شركة الإطارات العالمية",
      status: "غير نشط",
    },
  ]);

  const handleAddCategory = (formData) => {
    console.log("New category data:", formData);

    const newCategory = {
      id: categories.length + 1,
      itemName: formData["item_name"] || "",
      itemType: formData["item_type"] || "",
      branch: formData["branch"] || "",
      mainCategory: formData["main_category"] || "",
      subCategory: formData["sub_category"] || "",
      unitMain: formData["unit_main"] || "",
      unitSub: formData["unit_sub"] || "",
      barcode: formData["barcode"] || "",
      itemCode: formData["item_code"] || "",
      minimumStock: parseInt(formData["minimum_stock"]) || 0,
      maximumStock: parseInt(formData["maximum_stock"]) || 0,
      reorderPoint: parseInt(formData["reorder_point"]) || 0,
      costPrice: parseFloat(formData["cost_price"]) || 0,
      sellingPrice: parseFloat(formData["selling_price"]) || 0,
      taxRate: parseFloat(formData["tax_rate"]) || 0,
      supplier: formData["supplier"] || "",
      status: formData["status"] || "نشط",
    };

    setCategories((prevCategories) => [...prevCategories, newCategory]);
    onClose();
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingCategory) {
      setCategories((prevCategories) =>
        prevCategories.map((category) => (category.id === editingCategory.id ? editingCategory : category))
      );
      setEditDialogOpen(false);
      setEditingCategory(null);
    }
  };

  const handleDelete = (categoryId) => {
    setCategories((prevCategories) => prevCategories.filter((category) => category.id !== categoryId));
  };

  const handleView = (category) => {
    setSelectedCategory(category);
  };

  const handleExportData = () => {
    // Convert data to CSV format
    const headers = [
      "اسم الصنف",
      "نوع الصنف",
      "الفرع",
      "الفئة الرئيسية",
      "الفئة الفرعية",
      "الوحدة الرئيسية",
      "الوحدة الفرعية",
      "الباركود",
      "كود الصنف",
      "الحد الأدنى",
      "الحد الأقصى",
      "نقطة إعادة الطلب",
      "سعر التكلفة",
      "سعر البيع",
      "معدل الضريبة",
      "المورد",
      "الحالة",
    ];
    const csvContent = [
      headers.join(","),
      ...categories.map((category) =>
        [
          category.itemName,
          category.itemType,
          category.branch,
          category.mainCategory,
          category.subCategory,
          category.unitMain,
          category.unitSub,
          category.barcode,
          category.itemCode,
          category.minimumStock,
          category.maximumStock,
          category.reorderPoint,
          category.costPrice,
          category.sellingPrice,
          category.taxRate,
          category.supplier,
          category.status,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "categories_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const rows = text.split("\n");
        const headers = rows[0].split(",");

        const newCategories = rows
          .slice(1)
          .filter((row) => row.trim())
          .map((row, index) => {
            const values = row.split(",");
            return {
              id: categories.length + index + 1,
              itemName: values[0] || "",
              itemType: values[1] || "",
              branch: values[2] || "",
              mainCategory: values[3] || "",
              subCategory: values[4] || "",
              unitMain: values[5] || "",
              unitSub: values[6] || "",
              barcode: values[7] || "",
              itemCode: values[8] || "",
              minimumStock: parseInt(values[9]) || 0,
              maximumStock: parseInt(values[10]) || 0,
              reorderPoint: parseInt(values[11]) || 0,
              costPrice: parseFloat(values[12]) || 0,
              sellingPrice: parseFloat(values[13]) || 0,
              taxRate: parseFloat(values[14]) || 0,
              supplier: values[15] || "",
              status: values[16] || "نشط",
            };
          });

        setCategories((prevCategories) => [...prevCategories, ...newCategories]);
      };
      reader.readAsText(file);
    }
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
        حفظ الصنف
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
      field: "itemName",
      headerName: "اسم الصنف",
      width: 180,
      resizable: true,
    },
    {
      field: "itemType",
      headerName: "نوع الصنف",
      width: 140,
      resizable: true,
    },
    {
      field: "branch",
      headerName: "الفرع",
      width: 130,
      resizable: true,
    },
    {
      field: "mainCategory",
      headerName: "الفئة الرئيسية",
      width: 120,
      resizable: true,
    },
    {
      field: "itemCode",
      headerName: "كود الصنف",
      width: 100,
      resizable: true,
    },
    {
      field: "sellingPrice",
      headerName: "سعر البيع",
      width: 100,
      resizable: true,
      renderCell: (params) => `${params.value} ر.س`,
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
      <Header title="إدارة الأصناف" btnTitle="إضافة صنف" setOpen={setOpen} />

      <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
        <Button variant="outlined" color="success" startIcon={<FileDownloadIcon />} onClick={handleExportData}>
          تصدير البيانات
        </Button>
        <Button variant="outlined" color="info" component="label" startIcon={<FileUploadIcon />}>
          استيراد بيانات
          <input type="file" hidden accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />
        </Button>
      </Box>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={categories}
          columns={columns}
          sx={{
            width: "100%",
            maxWidth: "100%",
            overflow: "hidden",
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

      {/* Category Details View */}
      {selectedCategory && (
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
                <CategoryIcon />
                تفاصيل الصنف
              </Typography>
              <Button variant="outlined" onClick={() => setSelectedCategory(null)} sx={{ minWidth: "auto", px: 2 }}>
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
                        اسم الصنف:
                      </Typography>
                      <Typography variant="body1">{selectedCategory.itemName}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 120 }}>
                        نوع الصنف:
                      </Typography>
                      <Chip label={selectedCategory.itemType} color="primary" size="small" />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <BusinessIcon color="info" />
                      <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 100 }}>
                        الفرع:
                      </Typography>
                      <Typography variant="body1">{selectedCategory.branch}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LocalOfferIcon color="secondary" />
                      <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 100 }}>
                        كود الصنف:
                      </Typography>
                      <Typography variant="body1">{selectedCategory.itemCode}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 120 }}>
                        الحالة:
                      </Typography>
                      <Chip
                        label={selectedCategory.status}
                        color={
                          selectedCategory.status === "نشط"
                            ? "success"
                            : selectedCategory.status === "غير نشط"
                            ? "warning"
                            : "error"
                        }
                        icon={selectedCategory.status === "نشط" ? <CheckCircleIcon /> : <CancelIcon />}
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
                    معلومات المخزون والأسعار
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <InventoryIcon color="success" />
                      <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 120 }}>
                        الحد الأدنى:
                      </Typography>
                      <Typography variant="body1" sx={{ color: "orange", fontWeight: "bold" }}>
                        {selectedCategory.minimumStock}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <InventoryIcon color="error" />
                      <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 120 }}>
                        الحد الأقصى:
                      </Typography>
                      <Typography variant="body1" sx={{ color: "red", fontWeight: "bold" }}>
                        {selectedCategory.maximumStock}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 120 }}>
                        سعر التكلفة:
                      </Typography>
                      <Typography variant="body1" sx={{ color: "blue", fontWeight: "bold" }}>
                        {selectedCategory.costPrice} ر.س
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 120 }}>
                        سعر البيع:
                      </Typography>
                      <Typography variant="body1" sx={{ color: "green", fontWeight: "bold" }}>
                        {selectedCategory.sellingPrice} ر.س
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PersonIcon color="warning" />
                      <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 120 }}>
                        المورد:
                      </Typography>
                      <Typography variant="body1">{selectedCategory.supplier}</Typography>
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
        <DialogTitle sx={{ color: COLORS.PRIMARY, fontWeight: "bold" }}>تعديل حالة الصنف</DialogTitle>
        <DialogContent>
          {editingCategory && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {editingCategory.itemName}
              </Typography>
              <FormControl fullWidth>
                <InputLabel>حالة الصنف</InputLabel>
                <Select
                  value={editingCategory.status}
                  label="حالة الصنف"
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      status: e.target.value,
                    })
                  }
                >
                  <MenuItem value="نشط">نشط</MenuItem>
                  <MenuItem value="غير نشط">غير نشط</MenuItem>
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

      {/* Add Category Dialog */}
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="lg"
        dir="rtl"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 2,
            maxHeight: "90vh",
          },
          "& .MuiDialogContent-root": {
            padding: 3,
          },
        }}
      >
        <DialogTitle
          sx={{
            color: COLORS.PRIMARY,
            fontWeight: "bold",
            fontSize: 24,
            textAlign: "center",
            borderBottom: `2px solid ${COLORS.PRIMARY}`,
            mb: 2,
          }}
        >
          إضافة صنف جديد
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <DynamicForm
              fields={categoryFields}
              onSubmit={handleAddCategory}
              formStyle={{
                backgroundColor: "#fafafa",
                padding: 20,
                borderRadius: 8,
                direction: "rtl",
              }}
              fieldWrapperStyle={{ marginBottom: 15 }}
              formButtons={formButtons}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CategoryController;
