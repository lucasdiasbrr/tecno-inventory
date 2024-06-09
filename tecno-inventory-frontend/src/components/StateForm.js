import React, { useState } from 'react';
import axios from 'axios';

const StateForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/states', { name });
      alert('Estado adicionado com sucesso');
      setName('');
    } catch (error) {
      alert('Falha ao adicionar estado');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Adicionar Estado</h2>
        <div>
          <label>Nome do Estado</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar Estado</button>
      </form>
    </div>
  );
};

export default StateForm;
