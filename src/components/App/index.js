import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from '../Home';
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
    this.deleteStock = this.deleteStock.bind(this);
    this.updateStock = this.updateStock.bind(this);
    this.state = {
      isCreatedStock: false,
      isDeletedStock: false,
      stockByCode: {
        "00001": {
           code: '00001',
           receivedDate: 21340835092475,
           description: 'dklahsklsdhgafk',
           donor: 'kldfna',
           condition: 'good',
           location: 'dsaf',
           category: 'SB',
           classificationNum: 'SB0001',
           photos: [
             {
               photoId: '1',
               name: '1',
               length: 35,
               width: 12,
               height: 13
             },
             {
               photoId: '2',
               name: '2',
               length: 35,
               width: 12,
               height: 13
             },
           ],
           scannedImages: [
             {
               scannedImageId: '1',
               name: '1',
               length: 35,
               width: 12,
               height: 13
             },
           ],
           sign: 'fsdf',
           remarks: 'djafbsdkf /r/n ',
           eventNames: [
             'music',
             '2017',
           ],
           eventDates: [
             '12/01/2017',
             '13/01/2017',
           ],
           eventLocations: [
             'Hall',
           ],
           eventPeople: [
             'Ms Sin',
             'Ms Lam'
           ],
        }
      },
    };
  }

  createStock(stock) {
    if (typeof this.state.stockByCode[stock.code] !== 'undefined') {
      return;
    }

    this.setState({
      stockByCode: {
        ...this.state.stockByCode,
        [stock.code]: stock,
      },
      isCreatedStock: true,
    });
  }

  deleteStock(stockCode) {
    if (typeof this.state.stockByCode[stockCode] !== 'undefined') {
      return;
    }

    const stockByCode = Object
      .keys(this.state.stockByCode)
      .filter(code => code !== stockCode)
      .reduce((result, code) => ({ ...result, [code]: this.state.stockByCode[code] }), {})

    this.setState({
      stockByCode,
      isDeletedStock: true,
    });
  }

  updateStock(stock) {
    if (typeof this.state.stockByCode[stock.code] === 'undefined') {
      return;
    }

    this.setState({
      stockByCode: {
        ...this.state.stockByCode,
        [stock.code]: stock,
      },
    });
  }

  getStocks() {
    return Object
      .keys(this.state.stockByCode)
      .map(code => this.state.stockByCode[code]);
  }

  render() {
    const stocks = this.getStocks();

    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/stocks"
            render={() =>
              <StockList
                stocks={stocks}
                onCreateStock={this.createStock}
                isCreatedStock={this.state.isCreatedStock}
                onDeleteStoke={this.deleteStock}
                isDeletedStock={this.state.isDeletedStock}
              />
            }
          />
          <Route
            path="/stocks/:code"
            render={({match}) =>
              <StockDetail
                {...this.state.stockByCode[match.params.code]}
              />
            }
          />
          <div className="container hidden">
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
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
      </Router>
    );
  }
}

export default App;
