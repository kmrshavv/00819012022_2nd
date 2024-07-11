import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import './App.css';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={ProductList} />
                <Route path="/product/:id" component={ProductDetails} />
            </Switch>
        </Router>
    );
}

export default App;
