import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Typography } from "@mui/material";

export default function InvoiceItemsTable({ items }) {
  if (!items || !items.length) return null;

  // Calculate total for each row and the invoice total
  const rows = items.map((row) => ({
    ...row,
    unitPrice: row.unitPrice ?? row.price ?? 0,
    total: (row.unitPrice ?? row.price ?? 0) * (row.receivedQty ?? row.quantity ?? 0),
  }));
  const invoiceTotal = rows.reduce((sum, row) => sum + Number(row.total), 0);

  return (
    <Box sx={{ my: 2 }}>
      <TableContainer>
        <Table size="small" sx={{ direction: "rtl" }}>
          <TableHead>
            <TableRow>
              <TableCell align="right">اسم المنتج</TableCell>
              <TableCell align="right">الكمية المستلمة</TableCell>
              <TableCell align="right">الوحدة</TableCell>
              <TableCell align="right">سعر الوحدة</TableCell>
              <TableCell align="right">الإجمالي</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={row.id || idx}>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.receivedQty ?? row.quantity}</TableCell>
                <TableCell align="right">{row.unit}</TableCell>
                <TableCell align="right">{row.unitPrice?.toLocaleString() ?? 0}</TableCell>
                <TableCell align="right">{row.total?.toLocaleString() ?? 0}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} align="left">
                <Typography fontWeight="bold">الإجمالي الكلي للفاتورة</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight="bold" color="primary">
                  {invoiceTotal.toLocaleString()}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
