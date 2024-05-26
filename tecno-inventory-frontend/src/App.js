import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
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
        <Switch>
          <Route path="/add-item">
            <ItemForm />
          </Route>
          <Route path="/">
            <ItemList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
