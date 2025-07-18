import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Button,
  Box,
  Autocomplete,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export default function DynamicEditableTable({
  columns,
  rows,
  setRows,
  addButtonLabel = "إضافة",
  sx,
  readOnly = false,
}) {
  const buildInitialRow = () => columns.reduce((acc, col) => ({ ...acc, [col.field]: "" }), {});
  const [newRow, setNewRow] = useState(buildInitialRow());

  const handleNewRowChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...newRow, [name]: value };

    // حساب الحقول الناتجة عن معادلات
    columns.forEach((col) => {
      if (col.type === "readonly" && typeof col.formula === "function") {
        updated[col.field] = col.formula(updated);
      }
    });

    setNewRow(updated);
  };

  const handleAddRow = () => {
    for (const col of columns) {
      if (col.required && !newRow[col.field]) return;
    }
    setRows([...rows, { ...newRow, id: Date.now() }]);
    setNewRow(buildInitialRow());
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <Box sx={{ my: 2, ...sx }}>
      <TableContainer>
        <Table size="small" sx={{ direction: "rtl" }}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.field} align="right">
                  {col.headerName}
                </TableCell>
              ))}
              {!readOnly && <TableCell align="right">إجراء</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={row.id || idx}>
                {columns.map((col) => (
                  <TableCell key={col.field} align="right">
                    {["select", "autocomplete"].includes(col.type)
                      ? row[col.field]
                      : col.type === "readonly" && typeof col.formula === "function"
                      ? col.formula(row)
                      : row[col.field]}
                  </TableCell>
                ))}
                {!readOnly && (
                  <TableCell align="right">
                    <IconButton color="error" onClick={() => handleDeleteRow(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}

            {!readOnly && (
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col.field} align="right">
                    {col.type === "autocomplete" ? (
                      <Autocomplete
                        options={col.options || []}
                        value={newRow[col.field] || ""}
                        onChange={(e, newValue) =>
                          handleNewRowChange({
                            target: { name: col.field, value: newValue },
                          })
                        }
                        renderInput={(params) => (
                          <TextField {...params} size="small" placeholder="اختر" sx={{ width: 120 }} />
                        )}
                        size="small"
                      />
                    ) : col.type === "select" ? (
                      <Select
                        name={col.field}
                        value={newRow[col.field]}
                        onChange={handleNewRowChange}
                        size="small"
                        sx={{ width: 90 }}
                        displayEmpty
                      >
                        <MenuItem value="">اختر</MenuItem>
                        {(col.options || []).map((opt) => (
                          <MenuItem key={opt} value={opt}>
                            {opt}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : col.type === "readonly" && typeof col.formula === "function" ? (
                      <TextField
                        name={col.field}
                        value={col.formula(newRow)}
                        size="small"
                        disabled
                        sx={{ width: 100 }}
                      />
                    ) : (
                      <TextField
                        name={col.field}
                        value={newRow[col.field]}
                        onChange={handleNewRowChange}
                        size="small"
                        type={col.type === "number" ? "number" : "text"}
                        sx={{ width: 100 }}
                      />
                    )}
                  </TableCell>
                ))}
                <TableCell align="right">
                  <IconButton color="primary" onClick={handleAddRow}>
                    <AddIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {!readOnly && (
        <Button startIcon={<AddIcon />} sx={{ mt: 1, fontWeight: "bold" }} onClick={handleAddRow} variant="text">
          {addButtonLabel}
        </Button>
      )}
    </Box>
  );
}
