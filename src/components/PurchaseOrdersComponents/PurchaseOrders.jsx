import React, { useState } from "react";
import Header from "../Header.jsx";
import PurchaseOrdersForm from "./PurchaseOrdersForm";
import Table from "./Table";
import { Box, IconButton, Stack, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReceiptIcon from "@mui/icons-material/ReceiptLong";
import AddIcon from "@mui/icons-material/Add";
import ReceiptOfPurchaseOrderForm from "./ReceiptOfPurchaseOrderForm"; // 1. Import the form
import PurchaseInvoiceForm from "./PurchaseInvoiceForm";

export default function PurchaseOrders() {
  const [open, setOpen] = useState(false);
  const [openReceipt, setOpenReceipt] = useState(false); // 2. State for receipt form
  const [openInvoice, setOpenInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  // Handler to open invoice form with data from receipt
  const handleOpenInvoice = (receiptData) => {
    setInvoiceData(receiptData);
    setOpenInvoice(true);
  };

  const columns = [
    { field: "id", headerName: "رقم الامر", resizable: false },
    {
      field: "supplierName",
      headerName: " المورد",
      resizable: false,
    },
    {
      field: "status",
      headerName: "الحالة",
      resizable: false,
    },
    {
      field: "total",
      headerName: "الاجمالي",
      resizable: false,
    },
    {
      field: "receive",
      headerName: " استلام امر شراء واضافة فاتورة",
      width: 200,
      resizable: false,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          {params.row.status === "جديد" && (
            <Button
              variant="contained"
              color="success"
              size="small"
              startIcon={<ReceiptIcon />}
              onClick={() => setOpenReceipt(true)}
            >
              استلام
            </Button>
          )}
        </Stack>
      ),
    },
    {
      field: "actions",
      resizable: false,
      headerName: "إجراءات",
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton color="primary" onClick={() => onEdit(params.row)} size="small">
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => onDelete(params.row.id)} size="small">
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const rows = [
    { id: 1, supplierName: "مؤسسة الأفق التجاري", status: "جديد", total: 1500 },
    { id: 2, supplierName: "شركة النور", status: "مكتمل", total: 3200 },
    { id: 3, supplierName: "مؤسسة الشرق", status: "ملغي", total: 900 },
    { id: 4, supplierName: "شركة الخليج", status: "جديد", total: 2100 },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Header title="أمر الشراء الرئيسية" btnTitle="اضافة أمر شراء جديدة" setOpen={setOpen} />
      {/* <Filter inputs={InventoryFilters} /> */}
      <Table rows={rows} columns={columns} />
      <PurchaseOrdersForm open={open} onClose={setOpen} />
      <ReceiptOfPurchaseOrderForm
        open={openReceipt}
        onClose={setOpenReceipt}
        onAddInvoice={handleOpenInvoice} // Pass handler as prop
      />
      <PurchaseInvoiceForm
        open={openInvoice}
        onClose={setOpenInvoice}
        initialData={invoiceData} // Pass data to invoice form
      />
    </Box>
  );
}
