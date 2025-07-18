import React, { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Table from "./Table";
import BranchesForm from "./BranchesForm";
import Header from "../Header";
import ExportDataButton from "../common/ExportDataButton";
import ImportDataButton from "../common/ImportDataButton";

const columns = [
  { field: "id", headerName: "رقم الفرع", width: 80 },
  { field: "name", headerName: "اسم الفرع", width: 150 },
  { field: "address", headerName: "العنوان", width: 200 },
  { field: "phoneNumber", headerName: "رقم الهاتف", width: 150 },
  { field: "email", headerName: "البريد الإلكتروني", width: 200 },
  { field: "zone", headerName: "المنطقة", width: 120 },
  {
    field: "isActive",
    headerName: "نشط",
    width: 100,
    type: "boolean",
  },
  {
    field: "companyId",
    headerName: "رقم الشركة",
    width: 120,
  },
  {
    field: "actions",
    headerName: "إجراء",
    width: 250,
    renderCell: (params) => (
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          color="info"
          size="small"
          startIcon={<VisibilityIcon />}
          onClick={() => alert(`عرض الفرع رقم ${params.row.id}`)}
        >
          عرض
        </Button>
        <Button
          variant="outlined"
          color="warning"
          size="small"
          startIcon={<EditIcon />}
          onClick={() => alert(`تعديل الفرع رقم ${params.row.id}`)}
        >
          تعديل
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={() => {
            if (window.confirm(`هل أنت متأكد من حذف الفرع رقم ${params.row.id}؟`)) {
              // هنا تحط دالة الحذف الحقيقية
              alert(`تم حذف الفرع رقم ${params.row.id}`);
            }
          }}
        >
          حذف
        </Button>
      </Stack>
    ),
  },
];
const rows = [
  {
    id: 1,
    name: "فرع القاهرة",
    icon: "https://example.com/icons/cairo.png",
    address: "شارع التحرير، القاهرة",
    phoneNumber: "01001234567",
    email: "cairo@company.com",
    zone: "القاهرة",
    isActive: true,
    companyId: 101,
  },
  {
    id: 2,
    name: "فرع الإسكندرية",
    icon: "https://example.com/icons/alex.png",
    address: "شارع الجيش، الإسكندرية",
    phoneNumber: "01234567890",
    email: "alex@company.com",
    zone: "الإسكندرية",
    isActive: false,
    companyId: 101,
  },
  {
    id: 3,
    name: "فرع الجيزة",
    icon: "https://example.com/icons/giza.png",
    address: "شارع الهرم، الجيزة",
    phoneNumber: "01112345678",
    email: "giza@company.com",
    zone: "الجيزة",
    isActive: true,
    companyId: 102,
  },
];

export default function Branches() {
  const [open, setOpen] = useState(false);
  const mapGoodsDataToCSV = (data, headers) => {
    return [
      csvHeaders.join(","),
      ...data.map((item) => [item.id, item.warehouse, item.date, item.user, item.status].join(",")),
    ].join("\n");
  };

  // Custom parsing function for import
  const parseGoodsCSV = (text) => {
    const rows = text.split("\n");
    const headers = rows[0].split(",");

    return rows
      .slice(1)
      .filter((row) => row.trim())
      .map((row, index) => {
        const values = row.split(",");
        return {
          id: Date.now() + index, // Generate unique ID
          warehouse: values[1] || "",
          date: values[2] || "",
          user: values[3] || "",
          status: values[4] || "جديد",
        };
      });
  };
  // Handle imported data
  const handleDataImported = (importedData) => {
    setRows((prevRows) => [...prevRows, ...importedData]);
  };

  // Validation function for imported data
  const validateGoodsData = (data) => {
    const errors = [];

    data.forEach((item, index) => {
      if (!item.warehouse || item.warehouse.trim() === "") {
        errors.push(`الصف ${index + 1}: المستودع مطلوب`);
      }
      if (!item.date || item.date.trim() === "") {
        errors.push(`الصف ${index + 1}: التاريخ مطلوب`);
      }
      if (!item.user || item.user.trim() === "") {
        errors.push(`الصف ${index + 1}: المستخدم مطلوب`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Header title="  إدارة الفروع" btnTitle="اضافة فرع جديد" setOpen={setOpen} />

      {/* Export/Import Buttons */}
      <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
        <ExportDataButton
          data={rows}
          filename="goods_first_time_data.csv"
          mapDataToCSV={mapGoodsDataToCSV}
          buttonText="تصدير بيانات"
        />
        <ImportDataButton
          onDataImported={handleDataImported}
          parseCSV={parseGoodsCSV}
          validateData={validateGoodsData}
          buttonText="استيراد بيانات"
        />
      </Box>

      {/* <Filter inputs={InventoryFilters} /> */}
      <Table rows={rows} columns={columns} />
      <BranchesForm open={open} onClose={setOpen} />
    </Box>
  );
}
