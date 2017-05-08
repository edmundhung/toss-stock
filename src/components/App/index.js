import React from 'react';
import StockItemForm from '../StockItemForm';
import StockPhotoForm from '../StockPhotoForm';
import StockApprovalForm from '../StockApprovalForm';
import StockEventForm from '../StockEventForm';
import StockDetail from '../StockDetail';
import StockList from '../StockList';
import logo from '../../logo.svg';
import './style.css';

class App extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    this.createStock = this.createStock.bind(this);
    this.updateStock = this.updateStock.bind(this);
    this.state = {
      stockByCode: {
        "00001": {
           code: '0001',
           receivedDate: 21340835092475,
           description: 'dklahsklsdhgafk',
           donor: 'kldfna',
           condition: 'good',
           location: 'dsaf',
           category: 'SB',
           classificationNum: 'SB0001',
           photos: [
             {
               name: '1',
               length: 35,
               width: 12,
               height: 13
             },
             {
               name: '2',
               length: 35,
               width: 12,
               height: 13
             },
           ],
           scannedImages: [
             {
               name: '1',
               length: 35,
               width: 12,
               height: 13
             },
           ],
           sign: 'fsdf',
           remarks: 'djafbsdkf /r/n ',
           events: [
             {
               name: 'music',
               place: 'abc',
               dates: '23/4/2015',
               people: 'pigs',
             },
           ]
        }
      },
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
              <h3>Stock List</h3>
              <StockList stocks={stocks}/>
              <h3>Stock Detail</h3>
              <StockDetail {...this.state.stockByCode["00001"]}/>
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
