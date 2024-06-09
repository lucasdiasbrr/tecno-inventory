import React, { useState } from 'react';
import axios from 'axios';

const LocationForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/locations', { name });
      alert('Localização adicionada com sucesso');
      setName('');
    } catch (error) {
      alert('Falha ao adicionar localização');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Adicionar Localização</h2>
        <div>
          <label>Nome da Localização</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar Localização</button>
      </form>
    </div>
  );
};

export default LocationForm;
