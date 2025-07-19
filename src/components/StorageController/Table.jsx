import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { COLORS } from "../../constants";

const Table = ({ rows, columns }) => {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        sx={{
          width: "1050px",
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
        checkboxSelection={true}
        disableRowSelectionOnClick
        autoHeight={false}
      />
    </Box>
  );
};

export default Table;
