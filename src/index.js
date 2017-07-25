import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { configureStore } from './store';
import Home from './components/Home';
import StockDetail from './components/StockDetail';
import StockList from './components/StockList';

import './index.css';

const store = configureStore();
const container = document.getElementById('root');

const app = (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/stocks" component={StockList} />
        <Route path="/stocks/:code" component={StockDetail} />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(app, container);
