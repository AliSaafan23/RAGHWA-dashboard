import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box } from '@mui/material';


export default function Filter({inputs = []}) {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };


  return (
    <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',gap: 2 }}>
      {inputs.map((item, index) => (
        <FormControl key={index} fullWidth sx={{ height: 40, minHeight: 40 }}>
          <InputLabel id={`select-label-${index}`} >{item.label}</InputLabel>
          <Select
           sx={{ height: 40, minHeight: 40 }}
            labelId={`select-label-${index}`}
            id={`select-${index}`}
            value={value}
            label={item.label}
            onChange={handleChange}
          
          >
            {(item.items || []).map((subItem, subIndex) => (
              <MenuItem key={subIndex} value={subItem}  >
                {subItem}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </Box>
  )
}
