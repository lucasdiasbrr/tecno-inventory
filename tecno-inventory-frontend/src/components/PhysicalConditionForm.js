import React, { useState } from 'react';
import axios from 'axios';

const PhysicalConditionForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/physicalConditions', { name });
      alert('Condição Física adicionada com sucesso');
      setName('');
    } catch (error) {
      alert('Falha ao adicionar condição física');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Adicionar Condição Física</h2>
        <div>
          <label>Nome da Condição Física</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar Condição Física</button>
      </form>
    </div>
  );
};

export default PhysicalConditionForm;
