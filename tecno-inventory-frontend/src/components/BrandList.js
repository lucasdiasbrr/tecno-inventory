import React, { useEffect, useState } from 'react';
import { getBrands, deleteBrand, updateBrand } from '../services/brandService';
import { requestSort, getSortedItems } from '../utils/sortUtils';
import '../App.css';

const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [editingBrandId, setEditingBrandId] = useState(null);
  const [editedBrand, setEditedBrand] = useState({ name: '' });

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brands = await getBrands();
        setBrands(brands || []);
      } catch (error) {
        console.error('Falha ao buscar marcas:', error);
      }
    };

    fetchBrands();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBrand(id);
      setBrands(brands.filter(brand => brand.id !== id));
    } catch (error) {
      console.error('Falha ao deletar marca:', error);
    }
  };

  const handleEdit = (brand) => {
    setEditingBrandId(brand.id);
    setEditedBrand(brand);
  };

  const handleSave = async () => {
    try {
      await updateBrand(editingBrandId, editedBrand);
      setBrands(brands.map(brand => (brand.id === editingBrandId ? editedBrand : brand)));
      setEditingBrandId(null);
    } catch (error) {
      console.error('Falha ao atualizar marca:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBrand({ ...editedBrand, [name]: value });
  };

  const sortedBrands = getSortedItems(brands, sortConfig);

  return (
    <div className="container">
      <h1>Lista de Marcas</h1>
      {brands.length === 0 ? (
        <p>Nenhuma marca encontrada</p>
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
              {sortedBrands.map(brand => (
                <tr key={brand.id}>
                  <td>
                    {editingBrandId === brand.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editedBrand.name}
                        onChange={handleChange}
                      />
                    ) : (
                      brand.name
                    )}
                  </td>
                  <td>
                    {editingBrandId === brand.id ? (
                      <button onClick={handleSave}>Salvar</button>
                    ) : (
                      <button onClick={() => handleEdit(brand)}>Editar</button>
                    )}
                    <button onClick={() => handleDelete(brand.id)}>Deletar</button>
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

export default BrandList;
