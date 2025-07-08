import React, { useState } from "react";
import Table from "./Table";
import Header from "../Header";
import { Box, Button, Stack } from "@mui/material";
import GoodFristTimeForm from "./GoodFristTimeForm";
import ExportDataButton from "../common/ExportDataButton";
import ImportDataButton from "../common/ImportDataButton";

const columns = [
  { field: "id", headerName: "رقم العملية", width: 120 },
  { field: "warehouse", headerName: "المستودع", width: 160 },
  { field: "date", headerName: "التاريخ", width: 130 },
  { field: "user", headerName: "المستخدم", width: 150 },
  {
    field: "status",
    headerName: "حالة الفعل",
    width: 130,
  },
  {
    field: "actions",
    headerName: "إجراء",
    width: 150,
    sortable: false,
    renderCell: (params) => (
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => alert(`عرض العملية رقم ${params.row.id}`)}
        >
          عرض
        </Button>
      </Stack>
    ),
  },
];

export default function GoodFristTime() {
  const [open, setOpen] = useState(false);
  
  // Convert static rows to state so they can be updated with imports
  const [rows, setRows] = useState([
    {
      id: 1,
      warehouse: "مستودع الرياض",
      date: "2024-07-01",
      user: "سالم العتيبي",
      status: "جديد",
    },
    {
      id: 2,
      warehouse: "مستودع جدة",
      date: "2024-07-02",
      user: "نورة الشمري",
      status: "مكتمل",
    },
    {
      id: 3,
      warehouse: "مستودع الدمام",
      date: "2024-07-03",
      user: "خالد الزهراني",
      status: "ملغي",
    },
  ]);

  // Custom mapping function for export
  const mapGoodsDataToCSV = (data, headers) => {
    const csvHeaders = ['رقم العملية', 'المستودع', 'التاريخ', 'المستخدم', 'حالة الفعل'];
    return [
      csvHeaders.join(','),
      ...data.map(item => [
        item.id,
        item.warehouse,
        item.date,
        item.user,
        item.status
      ].join(','))
    ].join('\n');
  };

  // Custom parsing function for import
  const parseGoodsCSV = (text) => {
    const rows = text.split('\n');
    const headers = rows[0].split(',');
    
    return rows.slice(1).filter(row => row.trim()).map((row, index) => {
      const values = row.split(',');
      return {
        id: Date.now() + index, // Generate unique ID
        warehouse: values[1] || '',
        date: values[2] || '',
        user: values[3] || '',
        status: values[4] || 'جديد'
      };
    });
  };

  // Handle imported data
  const handleDataImported = (importedData) => {
    setRows(prevRows => [...prevRows, ...importedData]);
  };

  // Validation function for imported data
  const validateGoodsData = (data) => {
    const errors = [];
    
    data.forEach((item, index) => {
      if (!item.warehouse || item.warehouse.trim() === '') {
        errors.push(`الصف ${index + 1}: المستودع مطلوب`);
      }
      if (!item.date || item.date.trim() === '') {
        errors.push(`الصف ${index + 1}: التاريخ مطلوب`);
      }
      if (!item.user || item.user.trim() === '') {
        errors.push(`الصف ${index + 1}: المستخدم مطلوب`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Header title="بضاعة اول المدة" btnTitle="اضافة بضاعة اول المدة جديدة" setOpen={setOpen} />
      
      {/* Export/Import Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
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
      <GoodFristTimeForm open={open} onClose={setOpen} />
    </Box>
  );
}
