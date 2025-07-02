import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { resize } from "framer-motion";

const SupplierTable = ({ rows, onEdit, onDelete }) => {
  const columns = [
    { field: "id", headerName: "رقم المورد", width: 90, resizable: false },
    {
      field: "supplierName",
      headerName: "اسم المورد",
      width: 180,
      resizable: false,
    },
    {
      field: "supplierType",
      headerName: "نوع النشاط",
      width: 120,
      resizable: false,
    },
    {
      field: "email",
      headerName: "البريد الإلكتروني",
      width: 180,
    },
    { field: "city", headerName: "المدينة", width: 120, resizable: false },
    { field: "address", headerName: "العنوان", width: 180, resizable: false },
    {
      field: "crNumber",
      headerName: "رقم السجل التجاري",
      width: 150,
      resizable: false,
    },
    { field: "notes", headerName: "ملاحظات", width: 180, resizable: false },
    {
      field: "actions",
      headerName: "إجراءات",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            color="primary"
            onClick={() => onEdit(params.row)}
            size="small"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => onDelete(params.row.id)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        sx={{
          backgroundColor: "#f5f5f5",
          color: "#333",
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#f5f5f5",
            color: "#1976d2",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#e3f2fd",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #ccc",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
            fontSize: "16px",
          },
          direction: "rtl",
          "& .MuiTablePaginationActions-root": {
            direction: "ltr",
          },
          "& .MuiTablePagination-displayedRows": {
            direction: "ltr",
          },
        }}
        rows={rows}
        columns={columns}
        pageSizeOptions={[5]}
        checkboxSelection={false}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default SupplierTable;
