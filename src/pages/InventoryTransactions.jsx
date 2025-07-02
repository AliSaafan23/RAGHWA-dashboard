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

    const [rows, setRows] = useState([]);
    const [formOpen, setFormOpen] = useState(false);

    const handleAddTransaction = (data) => {
        setRows(prev => [
            ...prev,
            {
                id: prev.length + 1,
                date: data.date,
                type: data.transactionType,
                wharehouse: data.sourceWarehouse || data.warehouse || '',
                quantity: data.items ? data.items.reduce((sum, item) => sum + Number(item.quantity || 0), 0) : '',
                user: data.executedBy || '---',
                status: data.status || 'غير معتمدة',
                action: 'عرض',
                ...data
            }
        ]);
    };

    return (
        <Box sx={{display:'flex',flexDirection:'column',gap:4,}}>
            <Header/>
            <Filter inputs={InventoryFilters} />
            <Table rows={rows} />
            <InventoryTransactionForm open={formOpen} onClose={() => setFormOpen(false)} onSubmit={handleAddTransaction} user={{ name: 'المستخدم الحالي' }} />
        </Box>
    )
}
