import React from 'react';
import StockItemForm from '../StockItemForm';
import StockPhotoForm from '../StockPhotoForm';
import StockApprovalForm from '../StockApprovalForm';
import StockEventForm from '../StockEventForm';
import logo from '../../logo.svg';
import './style.css';

class App extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    this.createStock = this.createStock.bind(this);
    this.updateStock = this.updateStock.bind(this);
    this.state = {
      stockByCode: {},
    };
  }

  mergeStock(stock) {
    this.setState({
      stockByCode: {
        ...this.state.stockByCode,
        [stock.code]: stock,
      },
    });
  }

  createStock(stock) {
    if (typeof this.state.stockByCode[stock.code] !== 'undefined') {
      return;
    }

    this.mergeStock(stock);
  }

  updateStock(stock) {
    if (typeof this.state.stockByCode[stock.code] === 'undefined') {
      return;
    }

    this.mergeStock(stock);
  }

  getStocks() {
    return Object
      .keys(this.state.stockByCode)
      .map(code => this.state.stockByCode[code]);
  }

  render() {
    const stocks = this.getStocks();

    return (
      <div>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>TOSS Stock Management System</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <ol>
                {stocks.map(stock => (
                  <li key={stock.code}>{stock.code} {stock.condition} {stock.status}</li>
                ))}
              </ol>
              <h3>Add stock</h3>
              <StockItemForm onSubmit={this.createStock} />
              <hr />
              <StockPhotoForm onSubmit={null} />
              <hr />
              <StockApprovalForm onSubmit={null} />
              <hr />
              <StockEventForm onSubmit={null} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
