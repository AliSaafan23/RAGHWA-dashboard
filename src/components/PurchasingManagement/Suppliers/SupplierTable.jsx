import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { resize } from "framer-motion";
import { COLORS } from "../../../constants";

const SupplierTable = ({ rows, onEdit, onDelete }) => {
  const columns = [
    { field: "id", headerName: "رقم المورد", resizable: false },
    {
      field: "supplierName",
      headerName: "اسم المورد",
      resizable: false,
    },
    {
      field: "supplierType",
      headerName: "نوع النشاط",
      resizable: false,
    },
    {
      field: "email",
      headerName: "البريد الإلكتروني",
      resizable: false,
    },
    { field: "city", headerName: "المدينة", resizable: false },
    { field: "address", headerName: "العنوان",  resizable: false },
    {
      field: "crNumber",
      headerName: "رقم السجل التجاري",
      resizable: false,
    },
    { field: "notes", headerName: "ملاحظات", resizable: false },
    {
      field: "actions",
      headerName: "إجراءات",
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
          width: '100%',
            '& .MuiDataGrid-cell': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            '& .MuiDataGrid-columnHeader': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
              color: COLORS.PRIMARY,
            },
            '& .MuiTablePagination-displayedRows': {
            direction: 'rtl',}
                  }}
          
            rows={rows}
            columns={columns}
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
  );
};

export default SupplierTable;
