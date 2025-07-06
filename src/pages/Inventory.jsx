
import { Box } from '@mui/material';
import React from 'react';
import InventoryTransactions from '../components/InventoryTransactionsComponents/InventoryTransactions';
import InventoryItemManagement from '../components/InventoryTransactionsComponents/InventoryItemManagement';
import InventoryCount from '../components/InventoryTransactionsComponents/InventoryCount';
import TabBarComponent from '../components/TabBarComponent';

export default function Inventory() {
    const tabs= [
        { label: 'الحركات المخزنية الرئيسية', value: '1' },
        { label: 'إدارة الأصناف المخزنية', value: '2' },
        { label: 'الجرد المخزني', value: '3' }
    ];
    const tabPanels= [
        { value: '1', component: <InventoryTransactions /> },
        { value: '2', component: <InventoryItemManagement /> },
        { value: '3', component: <InventoryCount /> }
    ];
  return (
    <Box>
      <TabBarComponent tabs={tabs} tabPanels={tabPanels} />
    </Box>
  )
}
