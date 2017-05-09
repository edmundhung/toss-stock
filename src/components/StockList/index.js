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
      isAddingStock: false
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
      },
      state: { isAddingStock }
    } = this;

    return (
      <div>
        <button type="button" className="btn btn-success" onClick={this.onAddStock}>Add stock</button>
        <Modal show={isAddingStock} onHide={this.onCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Add stock</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <StockItemForm onSubmit={onCreateStock}/>
          </Modal.Body>
        </Modal>
        <table className="table table-striped table-hover">
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {stocks.map(stock => (
              <tr key={stock.code}>
                <td>{stock.code}</td>
                <td>{stock.receivedDate}</td>
                <td>{stock.description}</td>
                <td>{stock.donor}</td>
                <td>{stock.condition}</td>
                <td>{stock.classificationNum}</td>
                <td>{stock.sign}</td>
                <td>{stock.remarks}</td>
                <td><Link to={`/stocks/${stock.code}`} className="btn btn-info btn-xs">Detail</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default StockList;
