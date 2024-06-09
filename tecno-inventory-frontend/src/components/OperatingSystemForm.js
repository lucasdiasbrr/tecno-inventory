import React, { useState } from 'react';
import axios from 'axios';

const OperatingSystemForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/operatingSystems', { name });
      alert('Sistema Operacional adicionado com sucesso');
      setName('');
    } catch (error) {
      alert('Falha ao adicionar sistema operacional');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Adicionar Sistema Operacional</h2>
        <div>
          <label>Nome do Sistema Operacional</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar Sistema Operacional</button>
      </form>
    </div>
  );
};

export default OperatingSystemForm;
