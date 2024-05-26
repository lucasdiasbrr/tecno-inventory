import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

const App = () => {
  return (
    <Router>
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
