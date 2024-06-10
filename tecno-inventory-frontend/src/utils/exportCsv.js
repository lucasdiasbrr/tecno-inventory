// utils/exportCsv.js
export const exportToCSV = (items, filename, columns) => {
  const headers = columns.join(',');
  const rows = items.map(item => {
    return [
      item.name,
      item.quantity,
      item.serialNumber,
      item.price,
      item.description,
      item.purchaseDate,
      item.warranty,
      item.assetCode,
      item.additionalNotes,
      item.lastMaintenanceDate,
      item.nextMaintenanceDate,
      item.status,
      item.brand?.name,               // Assumindo que os dados estão estruturados corretamente
      item.model?.name,               // Assumindo que os dados estão estruturados corretamente
      item.category?.name,            // Assumindo que os dados estão estruturados corretamente
      item.location?.name,            // Assumindo que os dados estão estruturados corretamente
      item.state?.name,               // Assumindo que os dados estão estruturados corretamente
      item.supplier?.name,            // Assumindo que os dados estão estruturados corretamente
      item.responsible?.name,         // Assumindo que os dados estão estruturados corretamente
      item.physicalCondition?.name,   // Assumindo que os dados estão estruturados corretamente
      item.operatingSystem?.name,     // Assumindo que os dados estão estruturados corretamente
      item.technicalSpecification?.name // Assumindo que os dados estão estruturados corretamente
    ].map(field => (field === null || field === undefined) ? '' : `"${field}"`).join(',');
  }).join('\n');

  const csvContent = `${headers}\n${rows}`;
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
