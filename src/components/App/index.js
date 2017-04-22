import React from 'react';
import StockItemForm from '../StockItemForm';
import logo from '../../logo.svg';
import './style.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>TOSS Stock Management System</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <StockItemForm
          defaultName="ABC"
          readOnly
        />
      </div>
    );
  }
}

export default App;
