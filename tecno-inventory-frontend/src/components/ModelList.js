import React, { useEffect, useState } from 'react';
import { getModels, deleteModel, updateModel } from '../services/modelService';
import { requestSort, getSortedItems } from '../utils/sortUtils';
import '../App.css';

const ModelList = () => {
  const [models, setModels] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [editingModelId, setEditingModelId] = useState(null);
  const [editedModel, setEditedModel] = useState({ name: '' });

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const models = await getModels();
        setModels(models || []);
      } catch (error) {
        console.error('Falha ao buscar modelos:', error);
      }
    };

    fetchModels();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteModel(id);
      setModels(models.filter(model => model.id !== id));
    } catch (error) {
      console.error('Falha ao deletar modelo:', error);
    }
  };

  const handleEdit = (model) => {
    setEditingModelId(model.id);
    setEditedModel(model);
  };

  const handleSave = async () => {
    try {
      await updateModel(editingModelId, editedModel);
      setModels(models.map(model => (model.id === editingModelId ? editedModel : model)));
      setEditingModelId(null);
    } catch (error) {
      console.error('Falha ao atualizar modelo:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedModel({ ...editedModel, [name]: value });
  };

  const sortedModels = getSortedItems(models, sortConfig);

  return (
    <div className="container">
      <h1>Lista de Modelos</h1>
      {models.length === 0 ? (
        <p>Nenhum modelo encontrado</p>
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
              {sortedModels.map(model => (
                <tr key={model.id}>
                  <td>
                    {editingModelId === model.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editedModel.name}
                        onChange={handleChange}
                      />
                    ) : (
                      model.name
                    )}
                  </td>
                  <td>
                    {editingModelId === model.id ? (
                      <button onClick={handleSave}>Salvar</button>
                    ) : (
                      <button onClick={() => handleEdit(model)}>Editar</button>
                    )}
                    <button onClick={() => handleDelete(model.id)}>Deletar</button>
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

export default ModelList;
