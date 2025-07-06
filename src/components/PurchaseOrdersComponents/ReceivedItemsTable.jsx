import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Box } from "@mui/material";

export default function ReceivedItemsTable({ items, setItems }) {
  const handleReceivedQtyChange = (idx, value) => {
    const updated = items.map((item, i) =>
      i === idx
        ? {
            ...item,
            receivedQty: value,
            difference: value !== "" ? Number(item.requiredQty) - Number(value) : item.requiredQty,
          }
        : item
    );
    setItems(updated);
  };

  return (
    <Box sx={{ my: 2 }}>
      <TableContainer>
        <Table size="small" sx={{ direction: "rtl" }}>
          <TableHead>
            <TableRow>
              <TableCell align="right">اسم المنتج</TableCell>
              <TableCell align="right">الكمية المطلوبة</TableCell>
              <TableCell align="right">الكمية المستلمة</TableCell>
              <TableCell align="right">الوحدة</TableCell>
              <TableCell align="right">الفرق</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row, idx) => (
              <TableRow key={row.id || idx}>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.requiredQty}</TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    size="small"
                    value={row.receivedQty}
                    onChange={(e) => handleReceivedQtyChange(idx, e.target.value)}
                    sx={{ width: 80 }}
                  />
                </TableCell>
                <TableCell align="right">{row.unit}</TableCell>
                <TableCell align="right">
                  {row.difference !== undefined ? row.difference : row.requiredQty - (row.receivedQty || 0)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
