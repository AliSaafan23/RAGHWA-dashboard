
import { Box, Tab } from '@mui/material';
import React from 'react';
import InventoryTransactions from '../components/InventoryTransactionsComponents/InventoryTransactions';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import InventoryItemManagement from '../components/InventoryTransactionsComponents/InventoryItemManagement';
import InventoryCount from '../components/InventoryTransactionsComponents/InventoryCount';

export default function Inventory() {
    const [value, setValue] = React.useState('1');
    const handleChange = (event,newValue) => {
        setValue(newValue);
    }
  return (
    <Box>
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="Inventory Tabs">
          <Tab label="الحركات المخزنية الرئيسية" value="1" />
          <Tab label="إدارة الأصناف المخزنية" value="2" />
          <Tab label="الجرد المخزني" value="3" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <InventoryTransactions/>
      </TabPanel>
      <TabPanel value="2">
        <InventoryItemManagement/>
      </TabPanel>
      <TabPanel value="3">
        <InventoryCount/>
      </TabPanel>
    </TabContext>
    </Box>
  )
}
