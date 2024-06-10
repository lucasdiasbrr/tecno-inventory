import React, { useEffect, useState } from 'react';
import { getLocations, deleteLocation, updateLocation } from '../services/locationService';
import { requestSort, getSortedItems } from '../utils/sortUtils';
import '../App.css';

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [editingLocationId, setEditingLocationId] = useState(null);
  const [editedLocation, setEditedLocation] = useState({ name: '' });

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locations = await getLocations();
        setLocations(locations || []);
      } catch (error) {
        console.error('Falha ao buscar localizações:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteLocation(id);
      setLocations(locations.filter(location => location.id !== id));
    } catch (error) {
      console.error('Falha ao deletar localização:', error);
    }
  };

  const handleEdit = (location) => {
    setEditingLocationId(location.id);
    setEditedLocation(location);
  };

  const handleSave = async () => {
    try {
      await updateLocation(editingLocationId, editedLocation);
      setLocations(locations.map(location => (location.id === editingLocationId ? editedLocation : location)));
      setEditingLocationId(null);
    } catch (error) {
      console.error('Falha ao atualizar localização:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedLocation({ ...editedLocation, [name]: value });
  };

  const sortedLocations = getSortedItems(locations, sortConfig);

  return (
    <div className="container">
      <h1>Lista de Localizações</h1>
      {locations.length === 0 ? (
        <p>Nenhuma localização encontrada</p>
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
              {sortedLocations.map(location => (
                <tr key={location.id}>
                  <td>
                    {editingLocationId === location.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editedLocation.name}
                        onChange={handleChange}
                      />
                    ) : (
                      location.name
                    )}
                  </td>
                  <td>
                    {editingLocationId === location.id ? (
                      <button onClick={handleSave}>Salvar</button>
                    ) : (
                      <button onClick={() => handleEdit(location)}>Editar</button>
                    )}
                    <button onClick={() => handleDelete(location.id)}>Deletar</button>
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

export default LocationList;
