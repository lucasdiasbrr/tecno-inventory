import React, { useState } from 'react';
import axios from 'axios';

const TechnicalSpecificationForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/technicalSpecifications', { name });
      alert('Especificação Técnica adicionada com sucesso');
      setName('');
    } catch (error) {
      alert('Falha ao adicionar especificação técnica');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Adicionar Especificação Técnica</h2>
        <div>
          <label>Nome da Especificação Técnica</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar Especificação Técnica</button>
      </form>
    </div>
  );
};

export default TechnicalSpecificationForm;
