import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { COLORS } from '../../constants'
import InventoryTransactionForm from './InventoryTransactionForm';

export default function Header() {
      const [open, setOpen] = useState(false);
    
      const handleAddSupplier = (data) => {
        // Handle supplier creation logic here
        console.log("Supplier Data:", data);
      };
    
      return (
        <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'16px'}}>
      <Typography sx={{ fontWeight: 'bold', fontSize: '26px',color:COLORS.PRIMARY}} >الحركات المخزنية الرئيسية</Typography>
           <Button variant="contained" sx={{backgroundColor:COLORS.PRIMARY}} onClick={() => setOpen(true)}>إضافة حركة جديدة</Button>
            <InventoryTransactionForm
              open={open}
              onClose={() => setOpen(false)}
              onSubmit={handleAddSupplier}
            />
          </Box>
      );
}
