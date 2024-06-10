import React, { useEffect, useState } from 'react';
import { getResponsibles, deleteResponsible, updateResponsible } from '../services/responsibleService';
import { requestSort, getSortedItems } from '../utils/sortUtils';
import '../App.css';

const ResponsibleList = () => {
  const [responsibles, setResponsibles] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [editingResponsibleId, setEditingResponsibleId] = useState(null);
  const [editedResponsible, setEditedResponsible] = useState({ name: '' });

  useEffect(() => {
    const fetchResponsibles = async () => {
      try {
        const responsibles = await getResponsibles();
        setResponsibles(responsibles || []);
      } catch (error) {
        console.error('Falha ao buscar responsáveis:', error);
      }
    };

    fetchResponsibles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteResponsible(id);
      setResponsibles(responsibles.filter(responsible => responsible.id !== id));
    } catch (error) {
      console.error('Falha ao deletar responsável:', error);
    }
  };

  const handleEdit = (responsible) => {
    setEditingResponsibleId(responsible.id);
    setEditedResponsible(responsible);
  };

  const handleSave = async () => {
    try {
      await updateResponsible(editingResponsibleId, editedResponsible);
      setResponsibles(responsibles.map(responsible => (responsible.id === editingResponsibleId ? editedResponsible : responsible)));
      setEditingResponsibleId(null);
    } catch (error) {
      console.error('Falha ao atualizar responsável:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedResponsible({ ...editedResponsible, [name]: value });
  };

  const sortedResponsibles = getSortedItems(responsibles, sortConfig);

  return (
    <div className="container">
      <h1>Lista de Responsáveis</h1>
      {responsibles.length === 0 ? (
        <p>Nenhum responsável encontrado</p>
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
              {sortedResponsibles.map(responsible => (
                <tr key={responsible.id}>
                  <td>
                    {editingResponsibleId === responsible.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editedResponsible.name}
                        onChange={handleChange}
                      />
                    ) : (
                      responsible.name
                    )}
                  </td>
                  <td>
                    {editingResponsibleId === responsible.id ? (
                      <button onClick={handleSave}>Salvar</button>
                    ) : (
                      <button onClick={() => handleEdit(responsible)}>Editar</button>
                    )}
                    <button onClick={() => handleDelete(responsible.id)}>Deletar</button>
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

export default ResponsibleList;
