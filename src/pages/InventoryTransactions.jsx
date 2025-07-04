import Header from '../components/InventoryTransactionsComponents/Header'
import Filter from '../components/InventoryTransactionsComponents/Filter'
import { Box } from '@mui/material';
import Table from '../components/InventoryTransactionsComponents/Table';
import InventoryTransactionForm from '../components/InventoryTransactionsComponents/InventoryTransactionForm';

export default function InventoryTransactions() {
    const InventoryFilters= [
        { label: 'نوع الحركة', items: ['اضافة/استلام', 'اخراج/صرف', 'تحويل','جرد وتعديل','اتلاف','مرتجع مشتريات','مرتجع مبيعات'] },
        { label: 'المستودع', items: ['مستودع 1', 'مستودع 2', 'مستودع 3'] },
        { label: 'التاريخ', items: ['2024-05-11', '2023-10-01', '2025-08-04'] },
        { label: 'المستخدم', items: [' 1 مستخدم', 'مستخدم 2', 'مستخدم 3'] },
        { label: 'الحالة', items: ['معتمد', ' غير معتمد'] }
    ];

    return (
        <Box sx={{display:'flex',flexDirection:'column',gap:4,}}>
            <Header/>
            <Filter inputs={InventoryFilters} />
            <Table />
        </Box>
    )
}
