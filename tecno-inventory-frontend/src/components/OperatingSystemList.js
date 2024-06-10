import React, { useEffect, useState } from 'react';
import { getOperatingSystems, deleteOperatingSystem, updateOperatingSystem } from '../services/operatingSystemService';
import { requestSort, getSortedItems } from '../utils/sortUtils';
import '../App.css';

const OperatingSystemList = () => {
  const [operatingSystems, setOperatingSystems] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [editingOperatingSystemId, setEditingOperatingSystemId] = useState(null);
  const [editedOperatingSystem, setEditedOperatingSystem] = useState({ name: '' });

  useEffect(() => {
    const fetchOperatingSystems = async () => {
      try {
        const operatingSystems = await getOperatingSystems();
        setOperatingSystems(operatingSystems || []);
      } catch (error) {
        console.error('Falha ao buscar sistemas operacionais:', error);
      }
    };

    fetchOperatingSystems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteOperatingSystem(id);
      setOperatingSystems(operatingSystems.filter(operatingSystem => operatingSystem.id !== id));
    } catch (error) {
      console.error('Falha ao deletar sistema operacional:', error);
    }
  };

  const handleEdit = (operatingSystem) => {
    setEditingOperatingSystemId(operatingSystem.id);
    setEditedOperatingSystem(operatingSystem);
  };

  const handleSave = async () => {
    try {
      await updateOperatingSystem(editingOperatingSystemId, editedOperatingSystem);
      setOperatingSystems(operatingSystems.map(operatingSystem => (operatingSystem.id === editingOperatingSystemId ? editedOperatingSystem : operatingSystem)));
      setEditingOperatingSystemId(null);
    } catch (error) {
      console.error('Falha ao atualizar sistema operacional:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedOperatingSystem({ ...editedOperatingSystem, [name]: value });
  };

  const sortedOperatingSystems = getSortedItems(operatingSystems, sortConfig);

  return (
    <div className="container">
      <h1>Lista de Sistemas Operacionais</h1>
      {operatingSystems.length === 0 ? (
        <p>Nenhum sistema operacional encontrado</p>
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
              {sortedOperatingSystems.map(operatingSystem => (
                <tr key={operatingSystem.id}>
                  <td>
                    {editingOperatingSystemId === operatingSystem.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editedOperatingSystem.name}
                        onChange={handleChange}
                      />
                    ) : (
                      operatingSystem.name
                    )}
                  </td>
                  <td>
                    {editingOperatingSystemId === operatingSystem.id ? (
                      <button onClick={handleSave}>Salvar</button>
                    ) : (
                      <button onClick={() => handleEdit(operatingSystem)}>Editar</button>
                    )}
                    <button onClick={() => handleDelete(operatingSystem.id)}>Deletar</button>
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

export default OperatingSystemList;
