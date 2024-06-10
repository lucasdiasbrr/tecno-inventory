// App.js
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
import ModelList from './components/ModelList';
import BrandList from './components/BrandList';
import CategoryList from './components/CategoryList';
import LocationList from './components/LocationList';
import StateList from './components/StateList';
import SupplierList from './components/SupplierList.js';
import ResponsibleList from './components/ResponsibleList';
import PhysicalConditionList from './components/PhysicalConditionList';
import OperatingSystemList from './components/OperatingSystemList';
import TechnicalSpecificationList from './components/TechnicalSpecificationList';

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
          <li>
            <div className="dropdown">
              <button className="dropbtn">Cadastros</button>
              <div className="dropdown-content">
                <Link to="/add-item">Adicionar Item</Link>
                <Link to="/add-model">Adicionar Modelo</Link>
                <Link to="/add-brand">Adicionar Marca</Link>
                <Link to="/add-category">Adicionar Categoria</Link>
                <Link to="/add-location">Adicionar Localização</Link>
                <Link to="/add-state">Adicionar Estado</Link>
                <Link to="/add-supplier">Adicionar Fornecedor</Link>
                <Link to="/add-responsible">Adicionar Responsável</Link>
                <Link to="/add-physical-condition">Adicionar Condição Física</Link>
                <Link to="/add-operating-system">Adicionar Sistema Operacional</Link>
                <Link to="/add-technical-specification">Adicionar Especificação Técnica</Link>
              </div>
            </div>
          </li>
          <li>
            <div className="dropdown">
              <button className="dropbtn">Listas</button>
              <div className="dropdown-content">
                <Link to="/list-models">Modelos</Link>
                <Link to="/list-brands">Marcas</Link>
                <Link to="/list-categories">Categorias</Link>
                <Link to="/list-locations">Localizações</Link>
                <Link to="/list-states">Estados</Link>
                <Link to="/list-suppliers">Fornecedores</Link>
                <Link to="/list-responsibles">Responsáveis</Link>
                <Link to="/list-physical-conditions">Condições Físicas</Link>
                <Link to="/list-operating-systems">Sistemas Operacionais</Link>
                <Link to="/list-technical-specifications">Especificações Técnicas</Link>
              </div>
            </div>
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
          <Route path="/list-models" element={<ModelList />} />
          <Route path="/list-brands" element={<BrandList />} />
          <Route path="/list-categories" element={<CategoryList />} />
          <Route path="/list-locations" element={<LocationList />} />
          <Route path="/list-states" element={<StateList />} />
          <Route path="/list-suppliers" element={<SupplierList />} />
          <Route path="/list-responsibles" element={<ResponsibleList />} />
          <Route path="/list-physical-conditions" element={<PhysicalConditionList />} />
          <Route path="/list-operating-systems" element={<OperatingSystemList />} />
          <Route path="/list-technical-specifications" element={<TechnicalSpecificationList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
