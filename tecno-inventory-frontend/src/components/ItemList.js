import React, { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../services/itemService';
import '../App.css';

const ItemList = ({ itemsUpdated }) => {
  const [items, setItems] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getItems();
        setItems(items || []);
      } catch (error) {
        console.error('Falha ao buscar itens:', error);
      }
    };

    fetchItems();
  }, [itemsUpdated]);

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Falha ao deletar item:', error);
    }
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const exportToCSV = () => {
    const csvRows = [
      ['Nome', 'Quantidade', 'Categoria'],
      ...sortedItems.map(item => [item.name, item.quantity, item.category])
    ];

    const csvContent = csvRows.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'itens.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <h1>Lista de Itens</h1>
      <button onClick={exportToCSV}>Exportar para CSV</button>
      {items.length === 0 ? (
        <p>Nenhum item encontrado</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th onClick={() => requestSort('name')}>
                  Nome {sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('quantity')}>
                  Quantidade {sortConfig.key === 'quantity' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('category')}>
                  Categoria {sortConfig.key === 'category' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {sortedItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.category}</td>
                  <td><button onClick={() => handleDelete(item.id)}>Deletar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ItemList;
