// utils/sortUtils.js
export const getSortedItems = (items, sortConfig) => {
  if (!sortConfig.key) {
    return items;
  }
  const sortedItems = [...items];
  sortedItems.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
  return sortedItems;
};

export const requestSort = (key, sortConfig, setSortConfig) => {
  let direction = 'ascending';
  if (sortConfig.key === key && sortConfig.direction === 'ascending') {
    direction = 'descending';
  }
  setSortConfig({ key, direction });
};
