import React, { useState } from 'react';
import axios from 'axios';

const ResponsibleForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/responsibles', { name });
      alert('Responsável adicionado com sucesso');
      setName('');
    } catch (error) {
      alert('Falha ao adicionar responsável');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Adicionar Responsável</h2>
        <div>
          <label>Nome do Responsável</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar Responsável</button>
      </form>
    </div>
  );
};

export default ResponsibleForm;
