# Reusable Import/Export Components

## ExportDataButton

A reusable button component for exporting data to CSV format.

### Props

- `data` (array): Array of objects to export
- `headers` (array): Optional array of headers for CSV export
- `filename` (string): Name of the exported file (default: 'exported_data.csv')
- `buttonText` (string): Text displayed on the button (default: 'تصدير البيانات')
- `variant` (string): Material-UI button variant (default: 'outlined')
- `color` (string): Material-UI button color (default: 'success')
- `icon` (React element): Icon to display in the button (default: FileDownloadIcon)
- `sx` (object): Material-UI sx prop for styling
- `mapDataToCSV` (function): Custom function to map data to CSV format

### Example Usage

```jsx
import ExportDataButton from '../common/ExportDataButton';

// Basic usage
<ExportDataButton
    data={myData}
    filename="my_data.csv"
/>

// With custom mapping
<ExportDataButton
    data={users}
    filename="users.csv"
    mapDataToCSV={(data, headers) => {
        const csvHeaders = ['Name', 'Email', 'Role'];
        return [
            csvHeaders.join(','),
            ...data.map(user => [
                user.name,
                user.email,
                user.role
            ].join(','))
        ].join('\n');
    }}
/>
```

## ImportDataButton

A reusable button component for importing data from CSV files.

### Props

- `onDataImported` (function): Callback function called with imported data
- `buttonText` (string): Text displayed on the button (default: 'استيراد بيانات')
- `variant` (string): Material-UI button variant (default: 'outlined')
- `color` (string): Material-UI button color (default: 'info')
- `icon` (React element): Icon to display in the button (default: FileUploadIcon)
- `acceptedFileTypes` (string): File types accepted by the input (default: '.csv,.xlsx,.xls')
- `sx` (object): Material-UI sx prop for styling
- `parseCSV` (function): Custom function to parse CSV data
- `validateData` (function): Custom function to validate imported data

### Example Usage

```jsx
import ImportDataButton from '../common/ImportDataButton';

// Basic usage
<ImportDataButton
    onDataImported={(data) => {
        setMyData(prevData => [...prevData, ...data]);
    }}
/>

// With custom parsing and validation
<ImportDataButton
    onDataImported={handleDataImported}
    parseCSV={(text) => {
        const rows = text.split('\n');
        return rows.slice(1).filter(row => row.trim()).map(row => {
            const values = row.split(',');
            return {
                name: values[0],
                email: values[1],
                role: values[2] || 'user'
            };
        });
    }}
    validateData={(data) => {
        const errors = [];
        data.forEach((item, index) => {
            if (!item.email || !item.email.includes('@')) {
                errors.push(`Row ${index + 1}: Invalid email`);
            }
        });
        return {
            isValid: errors.length === 0,
            errors
        };
    }}
/>
```

## Complete Example in StorageController

```jsx
import ExportDataButton from "../common/ExportDataButton";
import ImportDataButton from "../common/ImportDataButton";

const StorageController = () => {
  const [storages, setStorages] = useState([]);

  const mapStorageDataToCSV = (data, headers) => {
    const csvHeaders = ["اسم المستودع", "النوع", "الفرع", "عدد الأصناف", "المسؤول", "الحالة"];
    return [
      csvHeaders.join(","),
      ...data.map((storage) =>
        [
          storage.storageName,
          storage.storageType,
          storage.branch,
          storage.itemsCount,
          storage.manager,
          storage.status,
        ].join(",")
      ),
    ].join("\n");
  };

  const parseStorageCSV = (text) => {
    const rows = text.split("\n");
    return rows
      .slice(1)
      .filter((row) => row.trim())
      .map((row, index) => {
        const values = row.split(",");
        return {
          id: storages.length + index + 1,
          storageName: values[0] || "",
          storageType: values[1] || "",
          branch: values[2] || "",
          itemsCount: parseInt(values[3]) || 0,
          manager: values[4] || "",
          status: values[5] || "نشط",
        };
      });
  };

  const handleDataImported = (importedData) => {
    setStorages((prevStorages) => [...prevStorages, ...importedData]);
  };

  const validateStorageData = (data) => {
    const errors = [];
    data.forEach((item, index) => {
      if (!item.storageName || item.storageName.trim() === "") {
        errors.push(`الصف ${index + 1}: اسم المستودع مطلوب`);
      }
    });
    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
      <ExportDataButton data={storages} filename="storage_data.csv" mapDataToCSV={mapStorageDataToCSV} />
      <ImportDataButton
        onDataImported={handleDataImported}
        parseCSV={parseStorageCSV}
        validateData={validateStorageData}
      />
    </Box>
  );
};
```
