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
  Autocomplete,
} from "@mui/material";

const DynamicForm = ({
  fields,
  onSubmit,
  formStyle,
  fieldWrapperStyle,
  formButtons = null,
  extraItems,
  fieldsPerRow = 2,
  formData: externalFormData,
  setFormData: externalSetFormData,
}) => {
  const [internalFormData, setInternalFormData] = useState({});
  const formData = externalFormData ?? internalFormData;
  const setFormData = externalSetFormData ?? setInternalFormData;

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, ...formStyle }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${fieldsPerRow}, 1fr)`,
          gap: 2,
          mb: 2,
          marginTop: 2,
        }}
      >
        {fields?.map((field) => {
          const {
            name,
            label,
            type,
            required,
            options,
            sx,
            variant = "outlined",
            getOptionLabel,
            isOptionEqualToValue,
          } = field;

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
                    <MenuItem key={opt?.value || opt} value={opt?.value || opt}>
                      {opt?.label || opt}
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

          if (type === "switch") {
            return (
              <FormControlLabel
                key={name}
                control={
                  <Switch
                    checked={formData[name] || false}
                    onChange={(e) => handleChange(name, e.target.checked)}
                  />
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

          if (type === "autocomplete") {
            return (
              <Autocomplete
                key={name}
                options={options || []}
                getOptionLabel={getOptionLabel || ((option) => option.label || option)}
                value={formData[name] || null}
                onChange={(e, newValue) => handleChange(name, newValue)}
                sx={{ ...sx, minWidth: 120 }}
                renderInput={(params) => (
                  <TextField {...params} label={label} required={required} variant={variant} />
                )}
                isOptionEqualToValue={
                  isOptionEqualToValue
                    ? isOptionEqualToValue
                    : (option, value) => option?.value === value?.value
                }
              />
            );
          }

          if (type === "file") {
            return (
              <TextField
                key={name}
                label={label}
                type="file"
                required={required}
                variant={variant}
                onChange={(e) => handleChange(name, e.target.files[0])}
                sx={{ ...sx, minWidth: 120 }}
                style={fieldWrapperStyle}
                InputLabelProps={{ shrink: true }}
              />
            );
          }

          // Default input (text, email, number, etc.)
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

      {extraItems}
      <Box sx={{ display: "flex", justifyContent: "start", gap: 2 }}>{formButtons}</Box>
    </form>
  );
};

export default DynamicForm;
