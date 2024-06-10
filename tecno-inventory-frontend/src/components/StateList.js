import React, { useEffect, useState } from 'react';
import { getStates, deleteState, updateState } from '../services/stateService';
import { requestSort, getSortedItems } from '../utils/sortUtils';
import '../App.css';

const StateList = () => {
  const [states, setStates] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [editingStateId, setEditingStateId] = useState(null);
  const [editedState, setEditedState] = useState({ name: '' });

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const states = await getStates();
        setStates(states || []);
      } catch (error) {
        console.error('Falha ao buscar estados:', error);
      }
    };

    fetchStates();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteState(id);
      setStates(states.filter(state => state.id !== id));
    } catch (error) {
      console.error('Falha ao deletar estado:', error);
    }
  };

  const handleEdit = (state) => {
    setEditingStateId(state.id);
    setEditedState(state);
  };

  const handleSave = async () => {
    try {
      await updateState(editingStateId, editedState);
      setStates(states.map(state => (state.id === editingStateId ? editedState : state)));
      setEditingStateId(null);
    } catch (error) {
      console.error('Falha ao atualizar estado:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedState({ ...editedState, [name]: value });
  };

  const sortedStates = getSortedItems(states, sortConfig);

  return (
    <div className="container">
      <h1>Lista de Estados</h1>
      {states.length === 0 ? (
        <p>Nenhum estado encontrado</p>
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
              {sortedStates.map(state => (
                <tr key={state.id}>
                  <td>
                    {editingStateId === state.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editedState.name}
                        onChange={handleChange}
                      />
                    ) : (
                      state.name
                    )}
                  </td>
                  <td>
                    {editingStateId === state.id ? (
                      <button onClick={handleSave}>Salvar</button>
                    ) : (
                      <button onClick={() => handleEdit(state)}>Editar</button>
                    )}
                    <button onClick={() => handleDelete(state.id)}>Deletar</button>
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

export default StateList;
