import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Header from '../Header';
import StockItemForm from '../StockItemForm';
import {
  getStocks,
  getNextStockCode,
  getDeletingStockCode,
  isShowingStockItemForm,
  isConfirmingStockDelete,
} from '../../store/reducers';
import {
  showList,
  createStock,
  deleteStock,
  showStockItemForm,
  hideStockItemForm,
  confirmStockDelete,
  cancelStockDelete,
} from '../../store/stock';
import './style.css';

function convertStockToCsv(header, datalist, filename) {
  const csvContent = []
    .concat(header.join(','))
    .concat(datalist.map(data => Object.keys(data).map(key => JSON.stringify(data[key])).join(',')))
    .join('\n');

  const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
  const link = document.createElement('a');

  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename + '.csv');
  document.body.appendChild(link);

  link.click();
}

class StockList extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.exportStocks = this.exportStocks.bind(this);
  }

  componentDidMount() {
    this.props.showList();
  }

  exportStocks() {
    const { stocks } = this.props;

    const date = new Date().toISOString().substr(0, 10).replace('-', '').replace('-', '');
    // Basic Information
    const basicInfoList = stocks.map(function(stock) {
      return {
        code: stock.code,
        receivedDate: stock.receivedDate,
        description: stock.description,
        donor: stock.donor,
        condition: stock.condition,
        location: stock.location,
        category: stock.category,
        sign: stock.sign,
        remarks: stock.remarks,
      }
    });
    const basicInfoHeader = [ 'Code', 'Received Date', 'Description', 'Donor', 'Condition', 'Location', 'Category', 'Sign', 'Remarks' ];
    convertStockToCsv(basicInfoHeader, basicInfoList, 'basicInfo_' + date);

    // ID Photos
    const photoList = stocks.reduce(function (result, stock) {
     const currentStockPhotos = (stock.photos || []).map(function (photo) {
       return {
         code: stock.code,
         photoId: photo.photoId,
         name: photo.name,
         length: photo.length,
         width: photo.width,
         height: photo.height,
       };
     });
     return result.concat(currentStockPhotos);
    }, []);
    const photoHeader = [ 'Code', 'Photo ID', 'Name', 'Length', 'Width', 'Height' ];
    convertStockToCsv(photoHeader, photoList, 'IDPhotos_' + date);

    // Scanned Images
    const scannedImageList = stocks.reduce(function(result, stock) {
      const currentStockPhotos = (stock.scannedImages || []).map(function (photo) {
        return {
          code: stock.code,
          photoId: photo.photoId,
          name: photo.name,
        };
      });
      return result.concat(currentStockPhotos);
    }, []);
    const scannedImageHeader = [ 'Code', 'Photo ID', 'Name' ];
    convertStockToCsv(scannedImageHeader, scannedImageList, 'ScannedImages_' + date);

    // Event Tags
    const eventTagList = stocks.reduce(function(result, stock) {
      const eventNameList = (stock.eventNames || []).map(function(name) {
        return {
          code: stock.code,
          type: 'name',
          value: name,
        }
      });
      const eventDateList = (stock.eventDates || []).map(function(date) {
        return {
          code: stock.code,
          type: 'date',
          value: date,
        }
      });
      const eventLocationList = (stock.eventLocations || []).map(function(location) {
        return {
          code: stock.code,
          type: 'location',
          value: location,
        }
      });
      const eventPeopleList = (stock.eventPeople || []).map(function(person) {
        return {
          code: stock.code,
          type: 'people',
          value: person,
        }
      });

      return result.concat(eventNameList, eventDateList, eventLocationList, eventPeopleList);
    }, []);
    const eventTagHeader = [ 'Code', 'Type', 'Value' ];
    convertStockToCsv(eventTagHeader, eventTagList, 'EventTags_' + date);
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
        <Header>
          <div className="pull-right">
            <button type="button" className="btn btn-default btn-stock-mgt" onClick={this.exportStocks}>
              <i className="glyphicon glyphicon-save margin-right-5" />
              Export
            </button>
            <button type="button" className="btn btn-default btn-stock-mgt" onClick={() => showItemForm()}>
              <i className="glyphicon glyphicon-plus margin-right-5" />
              Add
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
          <h2>Item List</h2>
        </Header>
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
                          className="btn btn-link btn-xs"
                          onClick={() => confirmDelete(stock.code)}
                        >
                          <i className="glyphicon glyphicon-trash" />
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
  showList: showList,
  createStock: createStock,
  deleteStock: deleteStock,
  showItemForm: showStockItemForm,
  hideItemForm: hideStockItemForm,
  confirmDelete: confirmStockDelete,
  cancelDelete: cancelStockDelete,
};

export default connect(mapStateToProps, actionCreators)(StockList);
