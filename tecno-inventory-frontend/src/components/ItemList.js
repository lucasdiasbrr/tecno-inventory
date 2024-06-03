// tecno-inventory-frontend/src/components/ItemList.js
import React, { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../services/itemService';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getItems();
        setItems(items || []);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  return (
    <div>
      <h1>Item List</h1>
      <ul>
        {items.length === 0 && <li>No items found</li>}
        {items.map(item => (
          <li key={item.id}>
            {item.name} - {item.quantity} - {item.category}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
