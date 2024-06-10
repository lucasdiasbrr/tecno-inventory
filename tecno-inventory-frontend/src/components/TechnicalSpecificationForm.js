// components/TechnicalSpecificationForm.js
import React, { useState } from 'react';
import { addTechnicalSpecification } from '../services/technicalSpecificationService';

const TechnicalSpecificationForm = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTechnicalSpecification({ name });
      setName('');
      setError('');
      alert('Especificação técnica adicionada com sucesso!');
    } catch (error) {
      setError('Erro ao adicionar especificação técnica. Por favor, tente novamente.');
    }
  };

  return (
    <div className="container">
      <h1>Adicionar Especificação Técnica</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default TechnicalSpecificationForm;
