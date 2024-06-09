import React, { useState } from 'react';
import { addItem } from '../services/itemService';

const ItemForm = ({ onItemAdded }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const newItem = { name, quantity, category };
      await addItem(newItem);
      if (onItemAdded) {
        onItemAdded();
      }
      setName('');
      setQuantity('');
      setCategory('');
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      setError('Erro ao adicionar item. Por favor, tente novamente.');
    }
  };

  return (
    <div className="container">
      <h1>Adicionar Item</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantidade:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Categoria:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default ItemForm;
