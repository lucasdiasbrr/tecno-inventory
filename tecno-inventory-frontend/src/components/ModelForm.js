import React, { useState } from 'react';
import { addModel } from '../services/modelServices';

const ModelForm = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addModel({ name });
      setName('');
      setError('');
      alert('Modelo adicionado com sucesso!');
    } catch (error) {
      setError('Erro ao adicionar modelo. Por favor, tente novamente.');
    }
  };

  return (
    <div className="container">
      <h1>Adicionar Modelo</h1>
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

export default ModelForm;
