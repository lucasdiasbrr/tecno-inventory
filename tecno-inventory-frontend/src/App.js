import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import ModelForm from './components/ModelForm';
import BrandForm from './components/BrandForm';
import CategoryForm from './components/CategoryForm';
import LocationForm from './components/LocationForm';
import StateForm from './components/StateForm';
import SupplierForm from './components/SupplierForm';
import ResponsibleForm from './components/ResponsibleForm';
import PhysicalConditionForm from './components/PhysicalConditionForm';
import OperatingSystemForm from './components/OperatingSystemForm';
import TechnicalSpecificationForm from './components/TechnicalSpecificationForm';
import './App.css';

const App = () => {
  const [itemsUpdated, setItemsUpdated] = useState(false);

  const handleItemAdded = () => {
    setItemsUpdated(!itemsUpdated);
  };

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Lista de Itens</Link></li>
          <li><Link to="/add-item">Adicionar Item</Link></li>
          <li>
            <a href="#">Cadastros</a>
            <ul>
              <li><Link to="/add-model">Adicionar Modelo</Link></li>
              <li><Link to="/add-brand">Adicionar Marca</Link></li>
              <li><Link to="/add-category">Adicionar Categoria</Link></li>
              <li><Link to="/add-location">Adicionar Localização</Link></li>
              <li><Link to="/add-state">Adicionar Estado</Link></li>
              <li><Link to="/add-supplier">Adicionar Fornecedor</Link></li>
              <li><Link to="/add-responsible">Adicionar Responsável</Link></li>
              <li><Link to="/add-physical-condition">Adicionar Condição Física</Link></li>
              <li><Link to="/add-operating-system">Adicionar Sistema Operacional</Link></li>
              <li><Link to="/add-technical-specification">Adicionar Especificação Técnica</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<ItemList itemsUpdated={itemsUpdated} />} />
          <Route path="/add-item" element={<ItemForm onItemAdded={handleItemAdded} />} />
          <Route path="/add-model" element={<ModelForm />} />
          <Route path="/add-brand" element={<BrandForm />} />
          <Route path="/add-category" element={<CategoryForm />} />
          <Route path="/add-location" element={<LocationForm />} />
          <Route path="/add-state" element={<StateForm />} />
          <Route path="/add-supplier" element={<SupplierForm />} />
          <Route path="/add-responsible" element={<ResponsibleForm />} />
          <Route path="/add-physical-condition" element={<PhysicalConditionForm />} />
          <Route path="/add-operating-system" element={<OperatingSystemForm />} />
          <Route path="/add-technical-specification" element={<TechnicalSpecificationForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
