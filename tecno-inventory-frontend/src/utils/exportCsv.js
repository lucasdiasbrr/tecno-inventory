export const exportToCSV = (items, filename, headers) => {
    const csvRows = [
      headers,
      ...items.map(item => headers.map(header => item[header.toLowerCase()]))
    ];
  
    const csvContent = csvRows.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  