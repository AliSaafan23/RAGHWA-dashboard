import React, { useState } from 'react'
import Header from '../components/InventoryTransactionsComponents/Header'
import Filter from '../components/InventoryTransactionsComponents/Filter'
import { Box } from '@mui/material';
import Table from '../components/InventoryTransactionsComponents/Table';
import InventoryTransactionForm from '../components/InventoryTransactionsComponents/InventoryTransactionForm';

export default function InventoryTransactions() {
    const InventoryFilters= [
        { label: 'نوع الحركة', items: ['Ten', 'Twenty', 'Thirty'] },
        { label: 'المستودع', items: ['Warehouse 1', 'Warehouse 2', 'Warehouse 3'] },
        { label: 'التاريخ', items: ['Date 1', 'Date 2', 'Date 3'] },
        { label: 'المستخدم', items: ['Customer 1', 'Customer 2', 'Customer 3'] },
        { label: 'الحالة', items: ['Customer 1', 'Customer 2', 'Customer 3'] }
    ];

    const [formOpen, setFormOpen] = useState(false);


    return (
        <Box sx={{display:'flex',flexDirection:'column',gap:4,}}>
            <Header/>
            <Filter inputs={InventoryFilters} />
            <Table />
            <InventoryTransactionForm open={formOpen} onClose={() => setFormOpen(false)}  user={{ name: 'المستخدم الحالي' }} />
        </Box>
    )
}
