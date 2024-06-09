import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import './App.css'; // Importa o CSS

const App = () => {
  const [itemsUpdated, setItemsUpdated] = React.useState(false);

  const handleItemAdded = () => {
    setItemsUpdated(!itemsUpdated);
  };

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Lista de Itens</Link></li>
          <li><Link to="/add-item">Adicionar Item</Link></li>
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/add-item" element={<ItemForm onItemAdded={handleItemAdded} />} />
          <Route path="/" element={<ItemList itemsUpdated={itemsUpdated} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
