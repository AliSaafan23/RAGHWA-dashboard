import React, { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

// Create RTL cache for Emotion
const cacheRtl = createCache({
  key: 'mui-rtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// Create an RTL theme
const theme = createTheme({
  direction: 'ltr',
  typography: {
    fontFamily: '"Noto Sans Arabic", sans-serif', // Arabic font
  },
});

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
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
      <div dir="rtl">
        <form
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: 10, ...formStyle }}
          dir="rtl" // Apply RTL at the form level
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
                    sx={{
                      textAlign: 'right',
                      '& .MuiSelect-select': {
                        textAlign: 'right',
                      },
                      '& .MuiInputLabel-root': {
                        right: 30,
                        left: 'auto',
                        transformOrigin: 'top right',
                      },
                      '& .MuiInputLabel-shrink': {
                        transform: 'translate(0, -6px) scale(0.75)',
                      },
                      ...sx, // Merge with user-provided sx
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          textAlign: 'right',
                          '& .MuiMenuItem-root': {
                            justifyContent: 'flex-end',
                          },
                        },
                      },
                    }}
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
                  labelPlacement="start" // Place label on the right for RTL
                  sx={{
                    justifyContent: 'flex-end', // Align checkbox and label to the right
                    marginRight: 0, // Adjust margin for RTL
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
                  labelPlacement="end" // Place label on the right for RTL
                  sx={{
                    justifyContent: 'flex-end',
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
                label={label} // Ensure this is an Arabic string, e.g., "الاسم"
                type={type}
                required={required}
                fullWidth={fullWidth}
                variant={variant}
                value={formData[name] || ""}
                onChange={(e) => handleChange(name, e.target.value)}
                sx={{
                  '& .MuiInputBase-root': {
                    textAlign: 'left', // Align input text to the right
                  },
                  '& .MuiInputLabel-root': {
                    // Force right alignment with higher specificity
                    right: 'auto !important',
                    transformOrigin: 'top left', // Adjust label animation origin
                  },
                  '& .MuiInputLabel-shrink': {
                    transform: 'translate(12px, -6px) scale(0.75)', // Adjust for RTL when shrunk
                  },
                  ...sx, // Merge with user-provided sx
                }}
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
                label="تفعيل" // Arabic label for "Enable"
                labelPlacement="start" // Place label on the right for RTL
                sx={{
                  justifyContent: 'flex-end',
                  marginRight: 0,
                  mt: 2,
                }}
              />
            )}
          <Box sx={{ display: "flex", justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="contained"
              type="submit"
              sx={{ textAlign: 'center', ...submitButtonProps.sx }}
              {...submitButtonProps}
            >
              {submitButtonProps.children || "إرسال"} {/* Arabic for "Submit" */}
            </Button>
            {showCancelButton && (
              <Button
                variant="outlined"
                type="button"
                onClick={onCancel}
                sx={{ textAlign: 'center', ...cancelButtonProps.sx }}
                {...cancelButtonProps}
              >
                {cancelButtonProps.children || "إلغاء"} {/* Arabic for "Cancel" */}
              </Button>
            )}
          </Box>
        </form>
      </div>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default DynamicForm;