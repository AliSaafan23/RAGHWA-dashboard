import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { COLORS } from '../../constants';

const columns = [
  { field: 'id', headerName: 'رقم الحركة' },
  {
    field: 'date',
    headerName: 'التاريخ',

    resizable: false,
  },
  {
    field: 'type',
    headerName: 'نوع الحركة',

    resizable: false,
  },
  {
    field: 'wharehouse',
    headerName: 'المستودع المصدر',

    resizable: false,
  },
  {
    field: 'quantity',
    headerName: 'الاصناف والكميات',

    resizable: false,
  },
  {
    field: 'user',
    headerName: 'المستخدم المنفذ',

    resizable: false,
  },
  {
    field: 'status',
    headerName: 'الحالة',

    resizable: false,
  },
  {
    field: 'action',
    headerName: 'اجراء',

    resizable: false,
  }
];

const rows = [
  { id: 1, date: '2023-01-01', type: 'استلام', wharehouse: "رئيسي", quantity: 10, user: 'احمد', status: 'معتمد', action: 'تعديل' },
  { id: 2, date: '2023-01-02', type: 'صرف', wharehouse: "رئيسي", quantity: 5, user: 'خالد', status: 'غير معتمد', action: 'تعديل' },
  { id: 3, date: '2023-01-03', type: 'تحويل', wharehouse: "رئيسي", quantity: 8, user: 'احمد', status: 'معتمد', action: 'حذف' },
  { id: 4, date: '2023-01-04', type: 'جرد', wharehouse: "فرعي", quantity: 12, user: 'طلال', status: 'معتمد', action: 'عرض' },
  { id: 5, date: '2023-01-05', type: 'اتلاف', wharehouse: "فرعي", quantity: 15, user: 'راكان', status: 'معتمد', action: 'تعديل' },
  { id: 6, date: '2023-01-06', type: 'استلام', wharehouse: "رئيسي", quantity: 20, user: 'خالد', status: 'غير معتمد', action: 'حذف' },
];

export default function Table() {
  return (
    <Box sx={{ height: 400, width: '100%',  }}>
      <DataGrid
      
      sx={{
        
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
              direction: 'rtl',
            }
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
}
