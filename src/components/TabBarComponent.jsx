
import { Box, Tab } from '@mui/material';
import React from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';

export default function TabBarComponent({tabs,tabPanels}) {
    const [value, setValue] = React.useState('1');
    const handleChange = (event,newValue) => {
        setValue(newValue);
    }
  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange}>
        {  tabs.map((tab) => (
            <Tab label={tab.label} value={tab.value} key={tab.value} />))}
        </TabList>
      </Box>
     {tabPanels.map((panel) => (
         <TabPanel value={panel.value} key={panel.value}>
           {panel.component}
         </TabPanel>
     ))}
    </TabContext>
  )
}
