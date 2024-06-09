import React, { useState } from 'react';
import axios from 'axios';

const SupplierForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/suppliers', { name });
      alert('Fornecedor adicionado com sucesso');
      setName('');
    } catch (error) {
      alert('Falha ao adicionar fornecedor');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Adicionar Fornecedor</h2>
        <div>
          <label>Nome do Fornecedor</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar Fornecedor</button>
      </form>
    </div>
  );
};

export default SupplierForm;
