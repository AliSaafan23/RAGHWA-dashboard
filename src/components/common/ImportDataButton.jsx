import React from "react";
import { Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const ImportDataButton = ({
  onDataImported,
  buttonText = "استيراد بيانات",
  variant = "outlined",
  color = "info",
  icon = <FileUploadIcon />,
  acceptedFileTypes = ".csv,.xlsx,.xls",
  sx = {},
  parseCSV = null,
  validateData = null,
  ...props
}) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        let parsedData;

        if (parseCSV && typeof parseCSV === "function") {
          // Use custom parsing function if provided
          parsedData = parseCSV(text);
        } else {
          // Default CSV parsing
          const rows = text.split("\n");
          const headers = rows[0].split(",");

          parsedData = rows
            .slice(1)
            .filter((row) => row.trim())
            .map((row, index) => {
              const values = row.split(",");
              const rowData = {};
              headers.forEach((header, idx) => {
                rowData[header.trim()] = values[idx]?.trim() || "";
              });
              return rowData;
            });
        }

        // Validate data if validation function is provided
        if (validateData && typeof validateData === "function") {
          const validationResult = validateData(parsedData);
          if (!validationResult.isValid) {
            console.error("Data validation failed:", validationResult.errors);
            alert(`خطأ في البيانات المستوردة: ${validationResult.errors.join(", ")}`);
            return;
          }
        }

        // Call the callback with parsed data
        if (onDataImported && typeof onDataImported === "function") {
          onDataImported(parsedData);
        } else {
          console.warn("No onDataImported callback provided");
        }
      } catch (error) {
        console.error("Error parsing file:", error);
        alert("حدث خطأ في قراءة الملف");
      }
    };

    reader.readAsText(file, "UTF-8");

    // Reset file input after processing
    event.target.value = "";
  };

  return (
    <Button variant={variant} color={color} component="label" startIcon={icon} sx={sx} {...props}>
      {buttonText}
      <input type="file" hidden accept={acceptedFileTypes} onChange={handleFileUpload} />
    </Button>
  );
};

export default ImportDataButton;
