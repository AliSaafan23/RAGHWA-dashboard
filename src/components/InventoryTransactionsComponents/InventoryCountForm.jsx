
import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import { COLORS } from '../../constants'
import DynamicForm from '../../custom/DynamicForm';
import { DataGrid } from '@mui/x-data-grid';
import Table from './Table';


export default function InventoryCountForm({open,onClose}) {
    const [formData, setFormData] = React.useState({});
    const [selectedInventory, setSelectedInventory] = React.useState('');

    // Fake products for each inventory (replace with real data as needed)
    const inventoryProducts = {
      'المخزن الرئيسي': [
        { id: 1, code: '1001', name: 'صابون سائل', recordedQuantity: 40, actualQuantity: '', difference: '-', notes: '', status: 'نشط', attachment: '', action: '' },
        { id: 2, code: '1002', name: 'كلور', recordedQuantity: 25, actualQuantity: '', difference: '-', notes: '', status: 'نشط', attachment: '', action: '' },
      ],
      'المخزن الفرعي 1': [
        { id: 3, code: '2001', name: 'مطهر', recordedQuantity: 10, actualQuantity: '', difference: '-', notes: '', status: 'نشط', attachment: '', action: '' },
      ],
      'المخزن الفرعي 2': [
        { id: 4, code: '3001', name: 'مناديل', recordedQuantity: 50, actualQuantity: '', difference: '-', notes: '', status: 'نشط', attachment: '', action: '' },
      ],
    };

 

    const inventories = ['المخزن الرئيسي', 'المخزن الفرعي 1', 'المخزن الفرعي 2'];
    const countTypes = ['جرد كلي', 'جرد جزئي'];
    const users = ['أحمد', 'فاطمة', 'محمد', 'سارة'];

    const inventoryCountFields = [
      {
        name: "inventory",
        label: "المخزن / الفرع",
        type: "select",
        options: inventories,
        required: true,
        sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
      },
      {
        name: "countType",
        label: "نوع الجرد",
        type: "select",
        options: countTypes,
        required: true,
        sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
      },
      {
        name: "countDate",
        label: "تاريخ الجرد",
        type: "date",
        required: true,
        defaultValue: new Date().toISOString().slice(0, 10),
        sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
      },
      {
        name: "countTime",
        label: "وقت الجرد",
        type: "time",
        required: true,
        sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
      },
      {
        name: "countUsers",
        label: "مستخدمي الجرد",
        type: "multiselect",
        options: users,
        required: true,
        sx: { backgroundColor: "#f5f5f5", borderRadius: 2 },
      },
    ];

    // الأعمدة المطلوبة للجرد
    const columns = [
      { field: 'code', headerName: 'كود الصنف', resizable: false },
      { field: 'name', headerName: 'اسم الصنف', resizable: false },
      { field: 'recordedQuantity', headerName: 'الكمية الدفترية', resizable: false },
      { field: 'actualQuantity', headerName: 'الكمية الفعلية', resizable: false, renderCell: (params) => <input type="number" style={{width: 60}} defaultValue={params.value} /> },
      { field: 'difference', headerName: 'الفرق', resizable: false },
      { field: 'notes', headerName: 'الملاحظات', resizable: false, renderCell: () => <input type="text" style={{width: 80}} placeholder="..." /> },
      { field: 'status', headerName: 'حالة الصنف', resizable: false },
      { field: 'attachment', headerName: 'صورة/مرفق', resizable: false, renderCell: () => <span role="img" aria-label="attachment">📷</span> },
      { field: 'action', headerName: 'إجراء', resizable: false, renderCell: () => <Button size="small" variant="outlined">...</Button> },
    ];
   const handleFormSubmit = (data) => {
        console.log(data)
        setFormData(data);
        setSelectedInventory(data.inventory);
        onClose();
    }


  // handle inventory select change manually
  const handleInventoryChange = (e) => {
    setSelectedInventory(e.target.value);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" dir="rtl">
        <DialogTitle sx={{ color: "#185BAA", fontWeight: "bold", fontSize: 30 }}>
          بدء جرد جديد
        </DialogTitle>
        <DialogContent>
          {/* Inventory select outside DynamicForm for live change */}
          <Box sx={{ mb: 2 }}>
            <label style={{ fontWeight: 'bold', marginInlineEnd: 8 }}>المخزن / الفرع:</label>
            <select
              value={selectedInventory}
              onChange={handleInventoryChange}
              style={{ minWidth: 180, padding: 6, borderRadius: 6, border: '1px solid #ccc', background: '#f5f5f5', fontSize: 16 }}
            >
              <option value="">اختر المخزن</option>
              {inventories.map(inv => (
                <option key={inv} value={inv}>{inv}</option>
              ))}
            </select>
          </Box>
          <DynamicForm
            fields={inventoryCountFields.filter(f => f.name !== 'inventory')}
            onSubmit={handleFormSubmit}
            formStyle={{
              backgroundColor: "#fafafa",
              padding: 0,
              borderRadius: 8,
            }}
            fieldWrapperStyle={{ marginBottom: 10 }}
            showdetailed={false}
            onCancel={onClose}
            extraItems=
            {selectedInventory && inventoryProducts[selectedInventory]?[ 
             <Table rows={inventoryProducts[selectedInventory]} columns={columns} />]:[]
            }
            formButtons={[
              <Button
                key="save"
                variant="contained"
                sx={{
                  backgroundColor: COLORS.PRIMARY,
                  px: 5,
                  py: 1.5,
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: COLORS.PRIMARY,
                  },
                }}
                type="submit"
              >
                حفظ
              </Button>,
              <Button
                key="cancel"
                variant="contained"
                sx={{
                  backgroundColor: "#ffffff",
                  color: COLORS.PRIMARY,
                  px: 5,
                  py: 1.5,
                  fontWeight: "bold",
                  border: "1px solid #1976d2",
                  "&:hover": {
                    backgroundColor: COLORS.PRIMARY,
                    color: "#fff",
                  },
                }}
                onClick={() => onClose(false)}
                type="button"
              >
                الغاء
              </Button>,
            ]}
          />

        </DialogContent>
      </Dialog>
    </>
  );
}
