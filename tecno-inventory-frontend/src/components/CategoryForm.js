import React, { useState } from 'react';
import axios from 'axios';

const CategoryForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/categories', { name });
      alert('Categoria adicionada com sucesso');
      setName('');
    } catch (error) {
      alert('Falha ao adicionar categoria');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Adicionar Categoria</h2>
        <div>
          <label>Nome da Categoria</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar Categoria</button>
      </form>
    </div>
  );
};

export default CategoryForm;
