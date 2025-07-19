import React, { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Table from "./Table";
import Header from "../Header";
import ExportDataButton from "../common/ExportDataButton";
import ImportDataButton from "../common/ImportDataButton";
import StorageForm from "./StorageForm";
import { useGetAllStoragesQuery } from "../../redux/Slices/storage";

const columns = [
  { field: "id", headerName: "رقم المخزن", width: 80 },
  { field: "name", headerName: "اسم المخزن", width: 150 },
  { field: "address", headerName: "العنوان", width: 200 },
  { field: "phoneNumber", headerName: "رقم الهاتف", width: 150 },
  { field: "email", headerName: "البريد الإلكتروني", width: 200 },
  {
    field: "isActive",
    headerName: "نشط",
    width: 100,
    type: "boolean",
  },
  {
    field: "branchId",
    headerName: "رقم الفرع",
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

export default function Storage() {
  const { data: storages, isLoading: isstoragesLoading, error: storagesError } = useGetAllStoragesQuery();

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
      <Header title="  إدارة المخازن" btnTitle="اضافة مخزن جديد" setOpen={setOpen} />

      {/* Export/Import Buttons */}
      <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
        <ExportDataButton
          data={storages?.data}
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
      <Table rows={storages?.data} columns={columns} />
      <StorageForm open={open} onClose={setOpen} />
    </Box>
  );
}
