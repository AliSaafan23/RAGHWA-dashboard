import React, { useState } from "react";
import Table from "./Table";
import Header from "../Header";
import { Box, Button, Stack } from "@mui/material";
import ExportDataButton from "../common/ExportDataButton";
import ImportDataButton from "../common/ImportDataButton";
import RegistrationOFItemForm from "./RegistrationOFItemForm";

const columns = [
  { field: "id", headerName: "رقم المنتج", width: 50, resizable: false },
  { field: "type", headerName: "النوع", width: 100, resizable: false },
  { field: "name", headerName: "الاسم", width: 50, resizable: false },
  { field: "prodCode", headerName: "كود المنتج", width: 100, resizable: false },
  { field: "mainUnit", headerName: "الوحدة الرئيسية", width: 100, resizable: false },
  { field: "AlternativeUnit", headerName: "الوحدة البديلة", width: 100, resizable: false },
  { field: "barCode", headerName: "الباركود", width: 100, resizable: false },
  { field: "image", headerName: "رابط الصورة", width: 150, resizable: false },
  { field: "cost", headerName: "التكلفة", width: 100, resizable: false },
  { field: "description", headerName: "الوصف", width: 100, resizable: false },
  { field: "isActive", headerName: "نشط", width: 100, resizable: false, type: "boolean" },
  { field: "addingDate", headerName: "تاريخ الإضافة", width: 100, resizable: false },
  {
    field: "actions",
    headerName: "إجراء",

    renderCell: (params) => (
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => alert(`عرض المنتج رقم ${params.row.id}`)}
        >
          عرض
        </Button>
      </Stack>
    ),
  },
];
const rows = [
  {
    id: 1,
    type: "أجهزة كهربائية",
    name: "ثلاجة سامسونج",
    prodCode: "PRD-001",
    mainUnit: "قطعة",
    AlternativeUnit: "علبة",
    cost: 5000,
    barCode: "1234567890123",
    image: "https://example.com/fridge.jpg",
    description: "ثلاجة 14 قدم سامسونج موفرة للطاقة",
    isActive: true,
    addingDate: "2024-05-01",
  },
  {
    id: 2,
    type: "أجهزة إلكترونية",
    name: "تلفزيون LG",
    prodCode: "PRD-002",
    mainUnit: "قطعة",
    AlternativeUnit: "صندوق",
    cost: 7000,
    barCode: "9876543210987",
    image: "https://example.com/tv.jpg",
    description: "شاشة ذكية 55 بوصة بدقة 4K",
    isActive: false,
    addingDate: "2024-06-10",
  },
];

export default function RegistratoionOfItem() {
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
      <Header title="انشاء صنف جديد" btnTitle="اضافة صنف جديد" setOpen={setOpen} />

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
      <RegistrationOFItemForm open={open} onClose={setOpen} />
    </Box>
  );
}
