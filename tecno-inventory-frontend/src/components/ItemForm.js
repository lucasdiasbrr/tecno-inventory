// components/ItemForm.js
import React, { useState, useEffect } from 'react';
import { addItem, getBrands, getModels, getCategories, getLocations, getStates, getSuppliers, getResponsibles, getPhysicalConditions, getOperatingSystems, getTechnicalSpecifications } from '../services/itemService';

const ItemForm = ({ onItemAdded }) => {
  const [itemData, setItemData] = useState({
    name: '',
    quantity: '',
    serialNumber: '',
    price: '',
    description: '',
    purchaseDate: '',
    warranty: '',
    assetCode: '',
    additionalNotes: '',
    lastMaintenanceDate: '',
    nextMaintenanceDate: '',
    status: '',
    brandId: '',
    modelId: '',
    categoryId: '',
    locationId: '',
    stateId: '',
    supplierId: '',
    responsibleId: '',
    physicalConditionId: '',
    operatingSystemId: '',
    technicalSpecificationId: ''
  });

  const [dropdownData, setDropdownData] = useState({
    brands: [],
    models: [],
    categories: [],
    locations: [],
    states: [],
    suppliers: [],
    responsibles: [],
    physicalConditions: [],
    operatingSystems: [],
    technicalSpecifications: []
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brands, models, categories, locations, states, suppliers, responsibles, physicalConditions, operatingSystems, technicalSpecifications] = await Promise.all([
          getBrands(),
          getModels(),
          getCategories(),
          getLocations(),
          getStates(),
          getSuppliers(),
          getResponsibles(),
          getPhysicalConditions(),
          getOperatingSystems(),
          getTechnicalSpecifications()
        ]);
        setDropdownData({
          brands,
          models,
          categories,
          locations,
          states,
          suppliers,
          responsibles,
          physicalConditions,
          operatingSystems,
          technicalSpecifications
        });
      } catch (error) {
        console.error('Erro ao buscar dados dos dropdowns:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData({ ...itemData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await addItem(itemData);
      onItemAdded(); // Chame a função passada como prop
      setItemData({
        name: '',
        quantity: '',
        serialNumber: '',
        price: '',
        description: '',
        purchaseDate: '',
        warranty: '',
        assetCode: '',
        additionalNotes: '',
        lastMaintenanceDate: '',
        nextMaintenanceDate: '',
        status: '',
        brandId: '',
        modelId: '',
        categoryId: '',
        locationId: '',
        stateId: '',
        supplierId: '',
        responsibleId: '',
        physicalConditionId: '',
        operatingSystemId: '',
        technicalSpecificationId: ''
      });
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      setError('Erro ao adicionar item. Por favor, tente novamente.');
    }
  };

  return (
    <div className="container">
      <h1>Adicionar Item</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input type="text" name="name" value={itemData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Quantidade</label>
          <input type="number" name="quantity" value={itemData.quantity} onChange={handleChange} required />
        </div>
        <div>
          <label>Número de Série</label>
          <input type="text" name="serialNumber" value={itemData.serialNumber} onChange={handleChange} />
        </div>
        <div>
          <label>Preço</label>
          <input type="number" name="price" value={itemData.price} onChange={handleChange} />
        </div>
        <div>
          <label>Descrição</label>
          <textarea name="description" value={itemData.description} onChange={handleChange}></textarea>
        </div>
        <div>
          <label>Data de Compra</label>
          <input type="date" name="purchaseDate" value={itemData.purchaseDate} onChange={handleChange} />
        </div>
        <div>
          <label>Garantia</label>
          <input type="text" name="warranty" value={itemData.warranty} onChange={handleChange} />
        </div>
        <div>
          <label>Código de Patrimônio</label>
          <input type="text" name="assetCode" value={itemData.assetCode} onChange={handleChange} />
        </div>
        <div>
          <label>Notas Adicionais</label>
          <textarea name="additionalNotes" value={itemData.additionalNotes} onChange={handleChange}></textarea>
        </div>
        <div>
          <label>Data da Última Manutenção</label>
          <input type="date" name="lastMaintenanceDate" value={itemData.lastMaintenanceDate} onChange={handleChange} />
        </div>
        <div>
          <label>Próxima Data de Manutenção</label>
          <input type="date" name="nextMaintenanceDate" value={itemData.nextMaintenanceDate} onChange={handleChange} />
        </div>
        <div>
          <label>Status</label>
          <input type="text" name="status" value={itemData.status} onChange={handleChange} />
        </div>
        <div>
          <label>Marca</label>
          <select name="brandId" value={itemData.brandId} onChange={handleChange}>
            <option value="">Selecione</option>
            {dropdownData.brands.map(brand => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Modelo</label>
          <select name="modelId" value={itemData.modelId} onChange={handleChange}>
            <option value="">Selecione</option>
            {dropdownData.models.map(model => (
              <option key={model.id} value={model.id}>{model.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Categoria</label>
          <select name="categoryId" value={itemData.categoryId} onChange={handleChange}>
            <option value="">Selecione</option>
            {dropdownData.categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Localização</label>
          <select name="locationId" value={itemData.locationId} onChange={handleChange}>
            <option value="">Selecione</option>
            {dropdownData.locations.map(location => (
              <option key={location.id} value={location.id}>{location.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Estado</label>
          <select name="stateId" value={itemData.stateId} onChange={handleChange}>
            <option value="">Selecione</option>
            {dropdownData.states.map(state => (
              <option key={state.id} value={state.id}>{state.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Fornecedor</label>
          <select name="supplierId" value={itemData.supplierId} onChange={handleChange}>
            <option value="">Selecione</option>
            {dropdownData.suppliers.map(supplier => (
              <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Responsável</label>
          <select name="responsibleId" value={itemData.responsibleId} onChange={handleChange}>
            <option value="">Selecione</option>
            {dropdownData.responsibles.map(responsible => (
              <option key={responsible.id} value={responsible.id}>{responsible.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Condição Física</label>
          <select name="physicalConditionId" value={itemData.physicalConditionId} onChange={handleChange}>
            <option value="">Selecione</option>
            {dropdownData.physicalConditions.map(physicalCondition => (
              <option key={physicalCondition.id} value={physicalCondition.id}>{physicalCondition.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Sistema Operacional</label>
          <select name="operatingSystemId" value={itemData.operatingSystemId} onChange={handleChange}>
            <option value="">Selecione</option>
            {dropdownData.operatingSystems.map(operatingSystem => (
              <option key={operatingSystem.id} value={operatingSystem.id}>{operatingSystem.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Especificações Técnicas</label>
          <select name="technicalSpecificationId" value={itemData.technicalSpecificationId} onChange={handleChange}>
            <option value="">Selecione</option>
            {dropdownData.technicalSpecifications.map(technicalSpecification => (
              <option key={technicalSpecification.id} value={technicalSpecification.id}>{technicalSpecification.value}</option>
            ))}
          </select>
        </div>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default ItemForm;
