import React, { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../services/itemService';

const ItemList = ({ itemsUpdated }) => {
  const [items, setItems] = useState([]);

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

  const exportToCSV = () => {
    const csvRows = [
      ['Nome', 'Quantidade', 'Categoria'],
      ...items.map(item => [item.name, item.quantity, item.category])
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
      {items.length === 0 ? (
        <p>Nenhum item encontrado</p>
      ) : (
        <>
          <button onClick={exportToCSV}>Exportar para CSV</button>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Categoria</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.category}</td>
                  <td><button onClick={() => handleDelete(item.id)}>Deletar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ItemList;
