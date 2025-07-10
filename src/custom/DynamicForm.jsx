import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Button,
  Switch,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";

const DynamicForm = ({
  fields,
  onSubmit,
  formStyle,
  fieldWrapperStyle,
  formButtons = null,
  extraItems,
  fieldsPerRow = 2,
}) => {
  const [formData, setFormData] = useState({});
  const [attachments, setAttachments] = useState([]);
  const [attachmentInput, setAttachmentInput] = useState({
    category: "",
    value: "",
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttachmentInputChange = (field, value) => {
    setAttachmentInput((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddAttachment = () => {
    if (attachmentInput.category && attachmentInput.value) {
      const newAttachment = {
        id: Date.now(),
        category: attachmentInput.category,
        value: attachmentInput.value,
      };
      setAttachments((prev) => [...prev, newAttachment]);
      setAttachmentInput({ category: "", value: "" });
    }
  };

  const handleRemoveAttachment = (id) => {
    setAttachments((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      serviceAttachments: attachments.map(({ id, ...rest }) => rest),
    };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, ...formStyle }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${fieldsPerRow}, 1fr)`,
          gap: 2,
          mb: 2,
        }}
      >
        {fields?.map((field) => {
          const { name, label, type, required, options, sx, variant = "outlined" } = field;

          if (label === "الملحقات المضافة") {
            return null;
          }


          if (type === "select" || type === "multiselect") {
            return (
              <FormControl required={required} key={name} sx={{ ...sx, minWidth: 120 }} style={fieldWrapperStyle}>
                <InputLabel>{label}</InputLabel>
                <Select
                multiple={type === "multiselect"}
                  value={formData[name] || (type === "multiselect" ? [] : "")}
                  label={label}
                  onChange={(e) =>
                  handleChange(
                    name,
                    type === "multiselect"
                      ? typeof e.target.value === "string"
                        ? e.target.value.split(",")
                        : e.target.value
                      : e.target.value
                  )
                }
                  sx={{
                    textAlign: "right",
                    "& .MuiSelect-select": {
                      textAlign: "right",
                    },
                    "& .MuiInputLabel-root": {
                      right: 30,
                      left: "auto",
                      transformOrigin: "top right",
                    },
                    "& .MuiInputLabel-shrink": {
                      transform: "translate(0, -6px) scale(0.75)",
                    },
                    ...sx,
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        textAlign: "right",
                        "& .MuiMenuItem-root": {
                          justifyContent: "flex-end",
                        },
                      },
                    },
                  }}
                renderValue={
                  type === "multiselect"
                    ? (selected) => (Array.isArray(selected) ? selected.join(", ") : "")
                    : undefined
                }
                >
                  {options.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          }

          if (type === "checkbox") {
            return (
              <FormControlLabel
                key={name}
                control={
                  <Checkbox checked={formData[name] || false} onChange={(e) => handleChange(name, e.target.checked)} />
                }
                label={label}
                labelPlacement="start"
                sx={{
                  justifyContent: "flex-end",
                  marginRight: 0,
                  ...sx,
                }}
                style={fieldWrapperStyle}
              />
            );
          }

          return (
            <TextField
              key={name}
              label={label}
              type={type}
              required={required}
              variant={variant}
              value={formData[name] || ""}
              onChange={(e) => handleChange(name, e.target.value)}
              sx={{ ...sx, minWidth: 120 }}
              style={fieldWrapperStyle}
              {...(type === "date" ? { InputLabelProps: { shrink: true }, placeholder: "" } : {})}
            />
          );
        })}
      </Box>
      {fields?.map((field) => {
        if (field.label === "الملحقات المضافة") {
          const { name, label, sx, variant = "outlined" } = field;
          return (
            <Box key={name} sx={{ ...sx }} style={fieldWrapperStyle}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {label}
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
                <TextField
                  label="الصنف"
                  value={attachmentInput.category}
                  onChange={(e) => handleAttachmentInputChange("category", e.target.value)}
                  variant={variant}
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="القيمة"
                  value={attachmentInput.value}
                  onChange={(e) => handleAttachmentInputChange("value", e.target.value)}
                  variant={variant}
                  sx={{ flex: 1 }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddAttachment}
                  startIcon={<AddIcon />}
                  disabled={!attachmentInput.category || !attachmentInput.value}
                >
                  إضافة
                </Button>
              </Box>
              {attachments.length > 0 && (
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">الصنف</TableCell>
                        <TableCell align="right">القيمة</TableCell>
                        <TableCell align="center">الإجراءات</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {attachments.map((attachment) => (
                        <TableRow key={attachment.id}>
                          <TableCell align="right">{attachment.category}</TableCell>
                          <TableCell align="right">{attachment.value}</TableCell>
                          <TableCell align="center">
                            <IconButton color="error" onClick={() => handleRemoveAttachment(attachment.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          );
        }
        return null;
      })}
      {extraItems}
      <Box sx={{ display: "flex", justifyContent: "start", gap: 2 }}>{formButtons}</Box>
    </form>
  );
};

export default DynamicForm;
