import Header from '../Header'
import { Box, Button } from '@mui/material';
import Table from './Table';
import { useState } from 'react';
import InventoryTransactionForm from './InventoryTransactionForm';
import AddItemForm from './AddItemForm';

export default function InventoryItemManagement() {

 const [open, setOpen] = useState(false);

    const columns = [
      { field: 'category', headerName: 'الفئة',resizable: false,},
      { field: 'code', headerName: 'الكود',    resizable: false,},
      { field: 'name', headerName: 'اسم الصنف',    resizable: false,},
      { field: 'balance', headerName: 'الرصيد الحالي في كل مستودع',    resizable: false ,width:220,},
      { field: 'unit', headerName: 'الوحدة' ,    resizable: false,},
      { field: 'status', headerName: 'حالة الصنف', resizable: false,},
    ];

    const rows = [
      { id: 1, code: 'A100', name: 'حاسوب محمول', category: 'الكترونيات', balance: '50 (رئيسي), 20 (فرعي 1)', unit: 'قطعة', status: 'نشط' },
      { id: 2, code: 'B200', name: 'أرز', category: 'مواد غذائية', balance: '100 (رئيسي), 0 (فرعي 2)', unit: 'كرتونة', status: 'نشط' },
      { id: 3, code: 'C300', name: 'دفتر', category: 'أدوات مكتبية', balance: '30 (رئيسي), 10 (فرعي 1), 5 (فرعي 2)', unit: 'علبة', status: 'موقوف' },
      { id: 4, code: 'D400', name: 'منظف أرضيات', category: 'منظفات', balance: '80 (رئيسي)', unit: 'لتر', status: 'نشط' },
      { id: 5, code: 'E500', name: 'كرسي مكتب', category: 'أثاث', balance: '5 (رئيسي), 2 (فرعي 1)', unit: 'قطعة', status: 'نشط' },
    ];
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Header title="ادارة الاصناف المخزنية" btnTitle="اضافة صنف جديد" setOpen={setOpen} />
        <Box sx={{ display: 'flex', gap: 2, mb: 1,  }}>
          <Button variant="outlined" color="success" component="label">
            تصدير بيانات
          </Button>
          <Button variant="outlined" color="info" component="label">
            استيراد بيانات
            <input type="file" hidden onChange={() => { }} />
          </Button>
        </Box>
        <Table rows={rows} columns={columns} />
        <AddItemForm open={open} setOpen={setOpen} />
      </Box>
    );
}
