import React, { useEffect, useState } from 'react';
import { getSuppliers, deleteSupplier } from '../services/supplierService';
import { exportToCSV } from '../utils/exportCsv';
import { requestSort, getSortedItems } from '../utils/sortUtils';
import '../App.css';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [editingSupplierId, setEditingSupplierId] = useState(null);
  const [editedSupplier, setEditedSupplier] = useState({});

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const suppliers = await getSuppliers();
        setSuppliers(suppliers || []);
      } catch (error) {
        console.error('Falha ao buscar fornecedores:', error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteSupplier(id);
      setSuppliers(suppliers.filter(supplier => supplier.id !== id));
    } catch (error) {
      console.error('Falha ao deletar fornecedor:', error);
    }
  };

  const handleEdit = (supplier) => {
    setEditingSupplierId(supplier.id);
    setEditedSupplier(supplier);
  };

  const handleSave = async () => {
    try {
      // Atualize o fornecedor (updateSupplier precisa ser implementado no supplierService)
      // await updateSupplier(editingSupplierId, editedSupplier);
      setSuppliers(suppliers.map(supplier => (supplier.id === editingSupplierId ? editedSupplier : supplier)));
      setEditingSupplierId(null);
    } catch (error) {
      console.error('Falha ao atualizar fornecedor:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSupplier({ ...editedSupplier, [name]: value });
  };

  const sortedSuppliers = getSortedItems(suppliers, sortConfig);

  return (
    <div className="container">
      <h1>Lista de Fornecedores</h1>
      <button onClick={() => exportToCSV(sortedSuppliers, 'fornecedores.csv', ['Nome', 'Contato', 'Email', 'Telefone'])}>
        Exportar para CSV
      </button>
      {suppliers.length === 0 ? (
        <p>Nenhum fornecedor encontrado</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th onClick={() => requestSort('name', sortConfig, setSortConfig)}>
                  Nome {sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('contact', sortConfig, setSortConfig)}>
                  Contato {sortConfig.key === 'contact' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('email', sortConfig, setSortConfig)}>
                  Email {sortConfig.key === 'email' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('phone', sortConfig, setSortConfig)}>
                  Telefone {sortConfig.key === 'phone' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {sortedSuppliers.map(supplier => (
                <tr key={supplier.id}>
                  {editingSupplierId === supplier.id ? (
                    <>
                      <td><input type="text" name="name" value={editedSupplier.name} onChange={handleChange} /></td>
                      <td><input type="text" name="contact" value={editedSupplier.contact} onChange={handleChange} /></td>
                      <td><input type="email" name="email" value={editedSupplier.email} onChange={handleChange} /></td>
                      <td><input type="tel" name="phone" value={editedSupplier.phone} onChange={handleChange} /></td>
                      <td>
                        <button onClick={handleSave}>Salvar</button>
                        <button onClick={() => setEditingSupplierId(null)}>Cancelar</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{supplier.name}</td>
                      <td>{supplier.contact}</td>
                      <td>{supplier.email}</td>
                      <td>{supplier.phone}</td>
                      <td>
                        <button onClick={() => handleEdit(supplier)}>Editar</button>
                        <button onClick={() => handleDelete(supplier.id)}>Deletar</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SupplierList;
