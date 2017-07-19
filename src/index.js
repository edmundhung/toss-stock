import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import configureStore from './store/configureStore';
import Home from './components/Home';
import StockDetail from './components/StockDetail';
import StockList from './components/StockList';
import FirebaseTrial from './components/FirebaseTrial';

import './index.css';

const store = configureStore();
const container = document.getElementById('root');

const app = (
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/stocks" component={StockList} />
        <Route path="/stocks/:code" component={StockDetail} />
        <Route exact path="/firebase" component={FirebaseTrial} />
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(app, container);
