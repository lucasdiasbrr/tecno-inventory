// components/TechnicalSpecificationList.js
import React, { useEffect, useState } from 'react';
import { getTechnicalSpecifications, deleteTechnicalSpecification, updateTechnicalSpecification } from '../services/technicalSpecificationService';
import { requestSort, getSortedItems } from '../utils/sortUtils';
import '../App.css';

const TechnicalSpecificationList = () => {
  const [technicalSpecifications, setTechnicalSpecifications] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [editingTechnicalSpecificationId, setEditingTechnicalSpecificationId] = useState(null);
  const [editedTechnicalSpecification, setEditedTechnicalSpecification] = useState({ name: '' });

  useEffect(() => {
    const fetchTechnicalSpecifications = async () => {
      try {
        const technicalSpecifications = await getTechnicalSpecifications();
        setTechnicalSpecifications(technicalSpecifications || []);
      } catch (error) {
        console.error('Falha ao buscar especificações técnicas:', error);
      }
    };

    fetchTechnicalSpecifications();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTechnicalSpecification(id);
      setTechnicalSpecifications(technicalSpecifications.filter(spec => spec.id !== id));
    } catch (error) {
      console.error('Falha ao deletar especificação técnica:', error);
    }
  };

  const handleEdit = (spec) => {
    setEditingTechnicalSpecificationId(spec.id);
    setEditedTechnicalSpecification(spec);
  };

  const handleSave = async () => {
    try {
      await updateTechnicalSpecification(editingTechnicalSpecificationId, editedTechnicalSpecification);
      setTechnicalSpecifications(technicalSpecifications.map(spec => (spec.id === editingTechnicalSpecificationId ? editedTechnicalSpecification : spec)));
      setEditingTechnicalSpecificationId(null);
    } catch (error) {
      console.error('Falha ao atualizar especificação técnica:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTechnicalSpecification({ ...editedTechnicalSpecification, [name]: value });
  };

  const sortedTechnicalSpecifications = getSortedItems(technicalSpecifications, sortConfig);

  return (
    <div className="container">
      <h1>Lista de Especificações Técnicas</h1>
      {technicalSpecifications.length === 0 ? (
        <p>Nenhuma especificação técnica encontrada</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th onClick={() => requestSort('name', sortConfig, setSortConfig)}>
                  Nome {sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {sortedTechnicalSpecifications.map(spec => (
                <tr key={spec.id}>
                  <td>
                    {editingTechnicalSpecificationId === spec.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editedTechnicalSpecification.name}
                        onChange={handleChange}
                      />
                    ) : (
                      spec.name
                    )}
                  </td>
                  <td>
                    {editingTechnicalSpecificationId === spec.id ? (
                      <button onClick={handleSave}>Salvar</button>
                    ) : (
                      <button onClick={() => handleEdit(spec)}>Editar</button>
                    )}
                    <button onClick={() => handleDelete(spec.id)}>Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TechnicalSpecificationList;
