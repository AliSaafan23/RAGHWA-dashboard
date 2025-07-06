import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const initialProduct = {
  name: "",
  unit: "",
  quantity: "",
  price: "",
  total: "",
};

const productOptions = [
  { name: "زيت محركات شل 30", unit: "لتر", price: 1250 },
  { name: "Shell Engine Oil 5W-20", unit: "لتر", price: 1250 },
];

export default function AddProductTable({ products, setProducts }) {
  const [newProduct, setNewProduct] = useState(initialProduct);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...newProduct, [name]: value };
    // Auto-fill unit and price if product selected
    if (name === "name") {
      const found = productOptions.find((p) => p.name === value);
      if (found) {
        updated.unit = found.unit;
        updated.price = found.price;
        updated.total = found.quantity ? found.price * found.quantity : "";
      }
    }
    // Calculate total if quantity or price changes
    if (name === "quantity" || name === "price") {
      const qty = name === "quantity" ? value : updated.quantity;
      const prc = name === "price" ? value : updated.price;
      updated.total = qty && prc ? Number(qty) * Number(prc) : "";
    }
    setNewProduct(updated);
  };

  const handleAdd = () => {
    if (!newProduct.name || !newProduct.quantity || !newProduct.unit || !newProduct.price) return;
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setNewProduct(initialProduct);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <Box sx={{ my: 2 }}>
      <TableContainer>
        <Table size="small" sx={{ minWidth: 650, direction: "rtl" }}>
          <TableHead>
            <TableRow>
              <TableCell align="right">المنتج</TableCell>
              <TableCell align="right">الوحدة</TableCell>
              <TableCell align="right">الكمية</TableCell>
              <TableCell align="right">السعر</TableCell>
              <TableCell align="right">الإجمالي</TableCell>
              <TableCell align="right">إجراء</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.unit}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.total}</TableCell>
                <TableCell align="right">
                  <IconButton color="error" onClick={() => handleDelete(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="right" sx={{ minWidth: 180 }}>
                <Select
                  name="name"
                  value={newProduct.name}
                  onChange={handleChange}
                  displayEmpty
                  size="small"
                  sx={{ width: "100%" }}
                >
                  <MenuItem value="">اختر المنتج</MenuItem>
                  {productOptions.map((opt) => (
                    <MenuItem key={opt.name} value={opt.name}>
                      {opt.name}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell align="right">
                <TextField name="unit" value={newProduct.unit} size="small" disabled sx={{ width: 80 }} />
              </TableCell>
              <TableCell align="right">
                <TextField
                  name="quantity"
                  value={newProduct.quantity}
                  onChange={handleChange}
                  size="small"
                  type="number"
                  sx={{ width: 80 }}
                />
              </TableCell>
              <TableCell align="right">
                <TextField
                  name="price"
                  value={newProduct.price}
                  onChange={handleChange}
                  size="small"
                  type="number"
                  sx={{ width: 100 }}
                />
              </TableCell>
              <TableCell align="right">
                <TextField name="total" value={newProduct.total} size="small" disabled sx={{ width: 100 }} />
              </TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={handleAdd}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button startIcon={<AddIcon />} sx={{ mt: 1, fontWeight: "bold" }} onClick={handleAdd} variant="text">
        إضافة منتج
      </Button>
    </Box>
  );
}
