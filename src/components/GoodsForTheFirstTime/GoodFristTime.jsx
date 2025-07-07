import React, { useState } from "react";
import Table from "./Table";
import Header from "../Header";
import { Box, Button, Stack } from "@mui/material";
import GoodFristTimeForm from "./GoodFristTimeForm";
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
const rows = [
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
];

export default function GoodFristTime() {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Header title="بضاعة اول المدة" btnTitle="اضافة بضاعة اول المدة جديدة" setOpen={setOpen} />
      {/* <Filter inputs={InventoryFilters} /> */}
      <Table rows={rows} columns={columns} />
      <GoodFristTimeForm open={open} onClose={setOpen} />
    </Box>
  );
}
