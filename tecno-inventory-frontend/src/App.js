// tecno-inventory-frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Item List</Link></li>
          <li><Link to="/add-item">Add Item</Link></li>
        </ul>
      </nav>
      <div>
        <Routes>
          <Route path="/add-item" element={<ItemForm />} />
          <Route path="/" element={<ItemList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
