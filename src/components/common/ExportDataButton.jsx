import React from 'react';
import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const ExportDataButton = ({ 
    data = [], 
    headers = [], 
    filename = 'exported_data.csv',
    buttonText = 'تصدير البيانات',
    variant = 'outlined',
    color = 'success',
    icon = <FileDownloadIcon />,
    sx = {},
    mapDataToCSV = null,
    ...props 
}) => {
    const handleExportData = () => {
        if (!data || data.length === 0) {
            console.warn('No data to export');
            return;
        }

        let csvContent;
        
        if (mapDataToCSV && typeof mapDataToCSV === 'function') {
            // Use custom mapping function if provided
            csvContent = mapDataToCSV(data, headers);
        } else {
            // Default CSV conversion
            const csvHeaders = headers.length > 0 ? headers : Object.keys(data[0] || {});
            csvContent = [
                csvHeaders.join(','),
                ...data.map(row => 
                    csvHeaders.map(header => {
                        const value = row[header] || '';
                        // Handle values that might contain commas
                        return typeof value === 'string' && value.includes(',') 
                            ? `"${value}"` 
                            : value;
                    }).join(',')
                )
            ].join('\n');
        }

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <Button 
            variant={variant}
            color={color}
            startIcon={icon}
            onClick={handleExportData}
            sx={sx}
            {...props}
        >
            {buttonText}
        </Button>
    );
};

export default ExportDataButton; 