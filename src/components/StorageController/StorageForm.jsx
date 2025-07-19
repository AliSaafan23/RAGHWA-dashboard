import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Box,
  Alert,
} from "@mui/material";
import { useGetAllBranchesQuery } from "../../redux/Slices/branches";
import { useCreateStorageMutation } from "../../redux/Slices/storage";

export default function StorageForm({ open, onClose }) {
  const [formData, setForm] = useState({
    name: "",
    icon: null,
    address: "",
    phoneNumber: "",
    email: "",
    zone: "",
    isActive: false,
    branchId: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [createStorage, { isLoading, error }] = useCreateStorageMutation();
  const { data: branches, isLoading: isbranchesLoading, error: branchesError } = useGetAllBranchesQuery();

  const handleChange = (name, value) => {
    if (name === "icon" && value && !/jpeg|jpg|png/.test(value.type)) {
      setErrorMessage("يرجى اختيار صورة بصيغة JPEG أو PNG");
      return;
    }
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("تغيير:", name, value instanceof File ? "[File]" : value); // Debug log
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (
      !formData.name ||
      !formData.icon ||
      !formData.address ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.branchId
    ) {
      setErrorMessage("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      console.log(
        "FormData:",
        [...formDataToSend.entries()].map(([k, v]) => `${k}=${v instanceof File ? "[File]" : v}`)
      );
      const response = await createStorage(formDataToSend).unwrap();
      console.log("Response:", response);
      onClose();
    } catch (err) {
      console.error("Creating branch failed:", err);
      setErrorMessage(err.data?.message || "فشل إنشاء المخزن");
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" dir="rtl">
      <DialogTitle sx={{ color: "#185BAA", fontWeight: "bold", fontSize: 30 }}>اضافة مخزن جديدة</DialogTitle>
      <DialogContent sx={{ backgroundColor: "#fafafa", borderRadius: 2 }}>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        {branchesError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            خطأ في جلب الفروع: {branchesError.message}
          </Alert>
        )}
        <div className="App">
          <div className="modern-form">
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 2,
                  mb: 2,
                  marginTop: 2,
                  alignItems: "center",
                }}
              >
                <TextField
                  label="اسم المخزن"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}
                  required
                />
                <FormControl
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}
                >
                  <InputLabel>اختر الفرع</InputLabel>
                  <Select
                    label="اختر الفرع"
                    name="branchId"
                    value={formData.branchId}
                    onChange={(e) => handleChange("branchId", e.target.value)}
                    sx={{ height: "56px" }}
                    required
                    disabled={isbranchesLoading}
                  >
                    {isbranchesLoading ? (
                      <MenuItem disabled>جاري تحميل الفروع...</MenuItem>
                    ) : (
                      branches?.data?.map((company) => (
                        <MenuItem key={company.id} value={company.id.toString()}>
                          {company.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="file"
                    name="icon"
                    accept="image/jpeg,image/png"
                    onChange={(e) => handleChange("icon", e.target.files[0])}
                    style={{
                      backgroundColor: "#f5f5f5",
                      borderRadius: "8px",
                      padding: "16.5px 14px",
                      width: "100%",
                      border: "1px solid #c4c4c4",
                    }}
                    required
                  />
                </Box>
                <TextField
                  label="رقم الهاتف"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}
                  required
                />
                <TextField
                  label="البريد الإلكتروني"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}
                  required
                />
                <TextField
                  label="العنوان"
                  name="address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}
                  required
                />

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.isActive}
                        onChange={(e) => handleChange("isActive", e.target.checked)}
                      />
                    }
                    label="نشط"
                  />
                </Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
                <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                  حفظ
                </Button>
                <Button type="button" variant="outlined" color="primary" onClick={onClose}>
                  الغاء
                </Button>
              </Box>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
