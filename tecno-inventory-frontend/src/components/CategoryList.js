import React, { useEffect, useState } from 'react';
import { getCategories, deleteCategory, updateCategory } from '../services/categoryService';
import { requestSort, getSortedItems } from '../utils/sortUtils';
import '../App.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editedCategory, setEditedCategory] = useState({ name: '' });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories || []);
      } catch (error) {
        console.error('Falha ao buscar categorias:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      console.error('Falha ao deletar categoria:', error);
    }
  };

  const handleEdit = (category) => {
    setEditingCategoryId(category.id);
    setEditedCategory(category);
  };

  const handleSave = async () => {
    try {
      await updateCategory(editingCategoryId, editedCategory);
      setCategories(categories.map(category => (category.id === editingCategoryId ? editedCategory : category)));
      setEditingCategoryId(null);
    } catch (error) {
      console.error('Falha ao atualizar categoria:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory({ ...editedCategory, [name]: value });
  };

  const sortedCategories = getSortedItems(categories, sortConfig);

  return (
    <div className="container">
      <h1>Lista de Categorias</h1>
      {categories.length === 0 ? (
        <p>Nenhuma categoria encontrada</p>
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
              {sortedCategories.map(category => (
                <tr key={category.id}>
                  <td>
                    {editingCategoryId === category.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editedCategory.name}
                        onChange={handleChange}
                      />
                    ) : (
                      category.name
                    )}
                  </td>
                  <td>
                    {editingCategoryId === category.id ? (
                      <button onClick={handleSave}>Salvar</button>
                    ) : (
                      <button onClick={() => handleEdit(category)}>Editar</button>
                    )}
                    <button onClick={() => handleDelete(category.id)}>Deletar</button>
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

export default CategoryList;
