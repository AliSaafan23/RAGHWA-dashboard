import { Box, Button, TextField } from '@mui/material';
import React from 'react'
import AddIcon from "@mui/icons-material/Add";

export default function FormWithTableComponent({formFields,itemData,items,handleChange,handleAddItem}) {
  return (
 <Box sx={{display:'flex',flexDirection:'column',gap:2, mb:2}}>
            <Box sx={{display:'flex',alignItems:'center', gap:2}}>
              {formFields.map((item) => {
                if (item.type === 'select') {
                  return (
                    <TextField
                      key={item.name}
                      label={item.label}
                      select
                      name={item.name}
                      value={itemData[item.name]}
                      onChange={handleChange}
                      required={item.required}
                      size="small"
                      sx={{ minWidth: 90, background: '#f5f5f5', borderRadius: 2 }}
                      SelectProps={{ native: true }}
                    >
                      <option value=""></option>
                      {item.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </TextField>
                  );
                } else {
                  return (
                    <TextField
                      key={item.name}
                      label={item.label}
                      type={item.type}
                      name={item.name}
                      value={itemData[item.name] }
                      onChange={handleChange}
                      required={item.required}
                      size="small"
                      sx={{ minWidth: 90, background: '#f5f5f5', borderRadius: 2 }}
                    />
                  );
                }
              })}
              <Button
                disabled={
                  !formFields.every(f => itemData[f.name])
                }
                key="add-item"
                variant="outlined"
                color="primary"
                sx={{
                  mb: 1,
                  fontWeight: 'bold',
                  fontSize: 18,
                  backgroundColor: '#f5faff',
                }}
                startIcon={<AddIcon sx={{ fontSize: 22 }} />}
                onClick={handleAddItem}
              >
                اضف صنف
              </Button>
            </Box>
            {/* جدول الاصناف المضافة */}
            {items.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden', direction: 'rtl' }}>
                  <thead style={{ background: '#f0f0f0' }}>
                    <tr>
                      <th style={{ padding: 8, border: '1px solid #e0e0e0' }}>#</th>
                      {formFields.map(f => (
                        <th key={f.name} style={{ padding: 8, border: '1px solid #e0e0e0' }}>{f.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ padding: 8, border: '1px solid #e0e0e0', textAlign: 'center' }}>{idx + 1}</td>
                        {formFields.map(f => (
                          <td key={f.name} style={{ padding: 8, border: '1px solid #e0e0e0', textAlign: 'center' }}>{item[f.name]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            )}
          </Box>  )
}
