import React, { useEffect, useState } from 'react';
import { getItems, deleteItem, updateItem } from '../services/itemService';
import { exportToCSV } from '../utils/exportCsv';
import { requestSort, getSortedItems } from '../utils/sortUtils';
import '../App.css';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedItem, setEditedItem] = useState({});

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getItems(true); // Buscar itens com detalhes incluídos
        setItems(items || []);
      } catch (error) {
        console.error('Falha ao buscar itens:', error);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Falha ao deletar item:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItemId(item.id);
    setEditedItem(item);
  };

  const handleSave = async () => {
    try {
      await updateItem(editingItemId, editedItem);
      setItems(items.map(item => (item.id === editingItemId ? editedItem : item)));
      setEditingItemId(null);
    } catch (error) {
      console.error('Falha ao atualizar item:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  const sortedItems = getSortedItems(items, sortConfig);

  return (
    <div className="container">
      <h1>Lista de Itens</h1>
      <button onClick={() => exportToCSV(sortedItems, 'itens.csv', [
        'Nome', 'Quantidade', 'Número de Série', 'Preço', 'Descrição', 'Data de Compra',
        'Garantia', 'Código de Patrimônio', 'Notas Adicionais', 'Data da Última Manutenção',
        'Próxima Data de Manutenção', 'Status', 'Marca', 'Modelo', 'Categoria', 'Localização',
        'Estado', 'Fornecedor', 'Responsável', 'Condição Física', 'Sistema Operacional',
        'Especificações Técnicas'
      ])}>
        Exportar para CSV
      </button>
      {items.length === 0 ? (
        <p>Nenhum item encontrado</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th onClick={() => requestSort('name', sortConfig, setSortConfig)}>
                  Nome {sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('quantity', sortConfig, setSortConfig)}>
                  Quantidade {sortConfig.key === 'quantity' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('serialNumber', sortConfig, setSortConfig)}>
                  Número de Série {sortConfig.key === 'serialNumber' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('price', sortConfig, setSortConfig)}>
                  Preço {sortConfig.key === 'price' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('description', sortConfig, setSortConfig)}>
                  Descrição {sortConfig.key === 'description' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('purchaseDate', sortConfig, setSortConfig)}>
                  Data de Compra {sortConfig.key === 'purchaseDate' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('warranty', sortConfig, setSortConfig)}>
                  Garantia {sortConfig.key === 'warranty' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('assetCode', sortConfig, setSortConfig)}>
                  Código de Patrimônio {sortConfig.key === 'assetCode' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('additionalNotes', sortConfig, setSortConfig)}>
                  Notas Adicionais {sortConfig.key === 'additionalNotes' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('lastMaintenanceDate', sortConfig, setSortConfig)}>
                  Data da Última Manutenção {sortConfig.key === 'lastMaintenanceDate' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('nextMaintenanceDate', sortConfig, setSortConfig)}>
                  Próxima Data de Manutenção {sortConfig.key === 'nextMaintenanceDate' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('status', sortConfig, setSortConfig)}>
                  Status {sortConfig.key === 'status' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('brand.name', sortConfig, setSortConfig)}>
                  Marca {sortConfig.key === 'brand.name' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('model.name', sortConfig, setSortConfig)}>
                  Modelo {sortConfig.key === 'model.name' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('category.name', sortConfig, setSortConfig)}>
                  Categoria {sortConfig.key === 'category.name' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('location.name', sortConfig, setSortConfig)}>
                  Localização {sortConfig.key === 'location.name' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('state.name', sortConfig, setSortConfig)}>
                  Estado {sortConfig.key === 'state.name' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('supplier.name', sortConfig, setSortConfig)}>
                  Fornecedor {sortConfig.key === 'supplier.name' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('responsible.name', sortConfig, setSortConfig)}>
                  Responsável {sortConfig.key === 'responsible.name' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('physicalCondition.name', sortConfig, setSortConfig)}>
                  Condição Física {sortConfig.key === 'physicalCondition.name' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('operatingSystem.name', sortConfig, setSortConfig)}>
                  Sistema Operacional {sortConfig.key === 'operatingSystem.name' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => requestSort('technicalSpecification.name', sortConfig, setSortConfig)}>
                  Especificações Técnicas {sortConfig.key === 'technicalSpecification.name' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {sortedItems.map(item => (
                <tr key={item.id}>
                  {editingItemId === item.id ? (
                    <>
                      <td><input type="text" name="name" value={editedItem.name} onChange={handleChange} /></td>
                      <td><input type="number" name="quantity" value={editedItem.quantity} onChange={handleChange} /></td>
                      <td><input type="text" name="serialNumber" value={editedItem.serialNumber} onChange={handleChange} /></td>
                      <td><input type="number" name="price" value={editedItem.price} onChange={handleChange} /></td>
                      <td><textarea name="description" value={editedItem.description} onChange={handleChange}></textarea></td>
                      <td><input type="date" name="purchaseDate" value={editedItem.purchaseDate} onChange={handleChange} /></td>
                      <td><input type="text" name="warranty" value={editedItem.warranty} onChange={handleChange} /></td>
                      <td><input type="text" name="assetCode" value={editedItem.assetCode} onChange={handleChange} /></td>
                      <td><textarea name="additionalNotes" value={editedItem.additionalNotes} onChange={handleChange}></textarea></td>
                      <td><input type="date" name="lastMaintenanceDate" value={editedItem.lastMaintenanceDate} onChange={handleChange} /></td>
                      <td><input type="date" name="nextMaintenanceDate" value={editedItem.nextMaintenanceDate} onChange={handleChange} /></td>
                      <td><input type="text" name="status" value={editedItem.status} onChange={handleChange} /></td>
                      <td><input type="text" name="brandId" value={editedItem.brandId} onChange={handleChange} /></td>
                      <td><input type="text" name="modelId" value={editedItem.modelId} onChange={handleChange} /></td>
                      <td><input type="text" name="categoryId" value={editedItem.categoryId} onChange={handleChange} /></td>
                      <td><input type="text" name="locationId" value={editedItem.locationId} onChange={handleChange} /></td>
                      <td><input type="text" name="stateId" value={editedItem.stateId} onChange={handleChange} /></td>
                      <td><input type="text" name="supplierId" value={editedItem.supplierId} onChange={handleChange} /></td>
                      <td><input type="text" name="responsibleId" value={editedItem.responsibleId} onChange={handleChange} /></td>
                      <td><input type="text" name="physicalConditionId" value={editedItem.physicalConditionId} onChange={handleChange} /></td>
                      <td><input type="text" name="operatingSystemId" value={editedItem.operatingSystemId} onChange={handleChange} /></td>
                      <td><input type="text" name="technicalSpecificationId" value={editedItem.technicalSpecificationId} onChange={handleChange} /></td>
                      <td>
                        <button onClick={handleSave}>Salvar</button>
                        <button onClick={() => setEditingItemId(null)}>Cancelar</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.serialNumber}</td>
                      <td>{item.price}</td>
                      <td>{item.description}</td>
                      <td>{item.purchaseDate}</td>
                      <td>{item.warranty}</td>
                      <td>{item.assetCode}</td>
                      <td>{item.additionalNotes}</td>
                      <td>{item.lastMaintenanceDate}</td>
                      <td>{item.nextMaintenanceDate}</td>
                      <td>{item.status}</td>
                      <td>{item.brand?.name}</td>
                      <td>{item.model?.name}</td>
                      <td>{item.category?.name}</td>
                      <td>{item.location?.name}</td>
                      <td>{item.state?.name}</td>
                      <td>{item.supplier?.name}</td>
                      <td>{item.responsible?.name}</td>
                      <td>{item.physicalCondition?.name}</td>
                      <td>{item.operatingSystem?.name}</td>
                      <td>{item.technicalSpecification?.name}</td>
                      <td>
                        <button onClick={() => handleEdit(item)}>Editar</button>
                        <button onClick={() => handleDelete(item.id)}>Deletar</button>
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

export default ItemList;
