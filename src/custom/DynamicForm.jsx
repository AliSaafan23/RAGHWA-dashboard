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
} from "@mui/material";

const DynamicForm = ({
  fields,
  onSubmit,
  formStyle,
  fieldWrapperStyle,
  submitButtonProps,
  showdetailed = false,
  detailed,
  setDetailed,
  showCancelButton = true,
  onCancel,
  cancelButtonProps = {},
}) => {
  const [formData, setFormData] = useState({});

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "grid", gap: 10, ...formStyle }}
    >
      {fields.map((field) => {
        const {
          name,
          label,
          type,
          required,
          options,
          sx,
          variant = "outlined",
          fullWidth = true,
        } = field;

        if (type === "select") {
          return (
            <FormControl
              fullWidth={fullWidth}
              required={required}
              key={name}
              sx={sx}
              style={fieldWrapperStyle}
            >
              <InputLabel>{label}</InputLabel>
              <Select
                value={formData[name] || ""}
                label={label}
                onChange={(e) => handleChange(name, e.target.value)}
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
                <Checkbox
                  checked={formData[name] || false}
                  onChange={(e) => handleChange(name, e.target.checked)}
                />
              }
              label={label}
              sx={sx}
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
            fullWidth={fullWidth}
            variant={variant}
            value={formData[name] || ""}
            onChange={(e) => handleChange(name, e.target.value)}
            sx={sx}
            style={fieldWrapperStyle}
          />
        );
      })}
      {showdetailed &&
        typeof setDetailed === "function" &&
        typeof detailed !== "undefined" && (
          <FormControlLabel
            control={
              <Switch
                checked={detailed}
                onChange={(e) => setDetailed(e.target.checked)}
                color="primary"
              />
            }
            label="تفعيل"
            sx={{ mt: 2 }}
          />
        )}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="contained" type="submit" {...submitButtonProps}>
          {submitButtonProps.children || "Submit"}
        </Button>
        {showCancelButton && (
          <Button
            variant="outlined"
            type="button"
            onClick={onCancel}
            {...cancelButtonProps}
          >
            {cancelButtonProps.children || "الغاء"}
          </Button>
        )}
      </Box>
    </form>
  );
};

export default DynamicForm;
