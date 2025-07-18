import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { COLORS } from "../../constants";

export default function Table({ rows, columns }) {
  return (
      <DataGrid
      sx={{   
        //  height: 400, width: "100%",      
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
  );
}
