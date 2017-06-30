import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import StockItemForm from '../StockItemForm';
import {
  getStocks,
  getNextStockCode,
  getDeletingStockCode,
  isShowingStockItemForm,
  isConfirmingStockDelete,
} from '../../store/reducers';
import {
  createStock,
  deleteStock,
  showStockItemForm,
  hideStockItemForm,
  confirmStockDelete,
  cancelStockDelete,
} from '../../store/stock';
import './style.css';

class StockList extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {
      // state
      stocks,
      deletingStockCode,
      isShowingItemForm,
      isConfirmingDelete,
      nextStockCode,

      // action creators
      createStock,
      deleteStock,
      showItemForm,
      hideItemForm,
      confirmDelete,
      cancelDelete,
    } = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
            <h6>Heritage stock</h6>
            <h2>Item List</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
            <div className="pull-right">
              <button type="button" className="btn btn-default" onClick={showItemForm}>
                Add stock
              </button>
              <Modal show={isShowingItemForm} onHide={hideItemForm}>
                <Modal.Header closeButton>
                  <Modal.Title>Add stock</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <StockItemForm
                    code={nextStockCode}
                    stock={null}
                    onSubmit={createStock}
                  />
                </Modal.Body>
              </Modal>
              <Modal show={isConfirmingDelete} onHide={cancelDelete}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirm delete stock #{deletingStockCode}?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                  <button type="button" className="btn btn-danger" onClick={() => deleteStock(deletingStockCode)}>
                    Confirm
                  </button>
                </Modal.Footer>
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
                      <td>
                        <button
                          type="button"
                          className="btn btn-link"
                          onClick={() => confirmDelete(stock.code)}
                        >
                          Delete
                        </button>
                      </td>
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

export function mapStateToProps(state) {
  return {
    stocks: getStocks(state),
    deletingStockCode: getDeletingStockCode(state),
    isShowingItemForm: isShowingStockItemForm(state),
    isConfirmingDelete: isConfirmingStockDelete(state),
    nextStockCode: getNextStockCode(state),
  };
}

export const actionCreators = {
  createStock: createStock,
  deleteStock: deleteStock,
  showItemForm: showStockItemForm,
  hideItemForm: hideStockItemForm,
  confirmDelete: confirmStockDelete,
  cancelDelete: cancelStockDelete,
};

export default connect(mapStateToProps, actionCreators)(StockList);
