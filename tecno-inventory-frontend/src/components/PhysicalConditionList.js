import React, { useEffect, useState } from 'react';
import { getPhysicalConditions, deletePhysicalCondition, updatePhysicalCondition } from '../services/physicalConditionService';
import { requestSort, getSortedItems } from '../utils/sortUtils';
import '../App.css';

const PhysicalConditionList = () => {
  const [physicalConditions, setPhysicalConditions] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [editingPhysicalConditionId, setEditingPhysicalConditionId] = useState(null);
  const [editedPhysicalCondition, setEditedPhysicalCondition] = useState({ name: '' });

  useEffect(() => {
    const fetchPhysicalConditions = async () => {
      try {
        const physicalConditions = await getPhysicalConditions();
        setPhysicalConditions(physicalConditions || []);
      } catch (error) {
        console.error('Falha ao buscar condições físicas:', error);
      }
    };

    fetchPhysicalConditions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePhysicalCondition(id);
      setPhysicalConditions(physicalConditions.filter(physicalCondition => physicalCondition.id !== id));
    } catch (error) {
      console.error('Falha ao deletar condição física:', error);
    }
  };

  const handleEdit = (physicalCondition) => {
    setEditingPhysicalConditionId(physicalCondition.id);
    setEditedPhysicalCondition(physicalCondition);
  };

  const handleSave = async () => {
    try {
      await updatePhysicalCondition(editingPhysicalConditionId, editedPhysicalCondition);
      setPhysicalConditions(physicalConditions.map(physicalCondition => (physicalCondition.id === editingPhysicalConditionId ? editedPhysicalCondition : physicalCondition)));
      setEditingPhysicalConditionId(null);
    } catch (error) {
      console.error('Falha ao atualizar condição física:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPhysicalCondition({ ...editedPhysicalCondition, [name]: value });
  };

  const sortedPhysicalConditions = getSortedItems(physicalConditions, sortConfig);

  return (
    <div className="container">
      <h1>Lista de Condições Físicas</h1>
      {physicalConditions.length === 0 ? (
        <p>Nenhuma condição física encontrada</p>
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
              {sortedPhysicalConditions.map(physicalCondition => (
                <tr key={physicalCondition.id}>
                  <td>
                    {editingPhysicalConditionId === physicalCondition.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editedPhysicalCondition.name}
                        onChange={handleChange}
                      />
                    ) : (
                      physicalCondition.name
                    )}
                  </td>
                  <td>
                    {editingPhysicalConditionId === physicalCondition.id ? (
                      <button onClick={handleSave}>Salvar</button>
                    ) : (
                      <button onClick={() => handleEdit(physicalCondition)}>Editar</button>
                    )}
                    <button onClick={() => handleDelete(physicalCondition.id)}>Deletar</button>
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

export default PhysicalConditionList;
