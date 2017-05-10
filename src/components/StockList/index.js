import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import StockItemForm from '../StockItemForm';
import './style.css';

class StockList extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.onAddStock = this.onAddStock.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.state = {
      isAddingStock: false,
    };
  }

  onAddStock() {
    this.setState({
      isAddingStock: true
    });
  }

  onCancel() {
    this.setState({
      isAddingStock: false
    });
  }

  render() {
    const {
      props: {
        stocks,
        onCreateStock,
        isCreatedStock,
      },
      state: { isAddingStock }
    } = this;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
            <h6>Heritage stoke</h6>
            <h2>Item List</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
            <div className="pull-right">
              <button type="button" className="btn btn-default" onClick={this.onAddStock}>Add stock</button>
              {isCreatedStock && (
                <div className="alert alert-success">
                  Suceess!
                </div>
              )}
              <Modal show={isAddingStock} onHide={this.onCancel}>
                <Modal.Header closeButton>
                  <Modal.Title>Add stock</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <StockItemForm onSubmit={onCreateStock}/>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Date Received</th>
                    <th>Description (w/ situation)</th>
                    <th>Donated by</th>
                    <th>Physical conditions</th>
                    <th>Classification no.</th>
                    <th>Sign</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody className="text-primary">
                  {stocks.map(stock => (
                    <tr key={stock.code}>
                      <td><Link to={`/stocks/${stock.code}`} className="text-info">#{stock.code}</Link></td>
                      <td>{stock.receivedDate}</td>
                      <td>{stock.description}</td>
                      <td>{stock.donor}</td>
                      <td>{stock.condition}</td>
                      <td>{stock.classificationNum}</td>
                      <td>{stock.sign}</td>
                      <td>{stock.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StockList;
