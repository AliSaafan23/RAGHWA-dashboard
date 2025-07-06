import { Box } from '@mui/material'
import React, { act, useState } from 'react'
import Table from './Table'
import InventoryTransactionForm from './InventoryTransactionForm'
import Header from '../Header'
import InventoryCountForm from './InventoryCountForm'

export default function InventoryCount() {
  const [open, setOpen] = useState(false);
  // const columns = [
  //   { field: 'code', headerName: 'كود الصنف', resizable: false },
  //   { field: 'name', headerName: 'اسم الصنف', resizable: false },
  //   { field: 'bookQty', headerName: 'الكمية الدفترية', resizable: false },
  //   { field: 'actualQty', headerName: 'الكمية الفعلية', resizable: false, editable: true },
  //   { field: 'diff', headerName: 'الفرق', resizable: false },
  //   { field: 'notes', headerName: 'الملاحظات', resizable: false, width: 120, editable: true },
  //   { field: 'status', headerName: 'حالة الصنف', resizable: false },
  //   { field: 'attachment', headerName: 'صورة/مرفق', resizable: false, renderCell: () => '📷' },
  //   { field: 'action', headerName: 'إجراء', resizable: false, renderCell: () => '...' },
  // ];

  // const rows = [
  //   {
  //     id: 1,
  //     code: '1001',
  //     name: 'صابون سائل',
  //     bookQty: 40,
  //     actualQty: 35,
  //     diff:'5',
  //     notes: '-',
  //     status: 'نشط',
  //     attachment: '',
  //     action: '',
  //   },
  // ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Header title="الجرد المخزني" btnTitle="بدء جرد جديد" setOpen={setOpen} />
      <InventoryCountForm open={open} onClose={setOpen}/>
    </Box>
  );
}
