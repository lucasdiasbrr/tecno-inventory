import React, { useState } from 'react';

const ItemForm = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { name, quantity, category };
    // Send item to API
    fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Item added:', data);
      // Clear the form
      setName('');
      setQuantity('');
      setCategory('');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Item Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Quantity</label>
        <input 
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Category</label>
        <input 
          type="text" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
        />
      </div>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default ItemForm;
