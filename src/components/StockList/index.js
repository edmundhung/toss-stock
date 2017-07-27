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

function convertStockToCsv(header, datalist) {
  // var array = datalist;
  // console.log("array", array);
  // console.log("count", array[0].eventDates);

  // var tcat = ["Basic Information", "Related Pictures", "Event Tags"];
  // var thead = ["Code", "Date Received", "Description", "Donor", "Physical Condition", "Location", "Category",
              // "Classification No.", "Sign", "Remarks", "ID Photos", "Scanned Images", "Name", "Date", "Location", "People"];
  // var subthead = ["Name", "Length(cm)", "Width(cm)", "Height(cm)"];

  // var maxLengthPhotos = Math.max.apply(null, array.map(function(a){ return a.photos.length; }));
  // var maxLengthScannedImages = Math.max.apply(null, array.map(function(a){ return a.scannedImages.length; }));
  // var maxLengthEventDates = Math.max.apply(null, array.map(function(a){ return a.eventDates.length; }));
  // var maxLengthEventLocations = Math.max.apply(null, array.map(function(a){ return a.eventLocations.length; }));
  // var maxLengthEventNames = Math.max.apply(null, array.map(function(a){ return a.eventNames.length; }));
  // var maxLengthEventPeople = Math.max.apply(null, array.map(function(a){ return a.eventPeople.length; }));


  var str = '';
  // str += "Basic Information,,,,,,,,,,Related Picture,,Event Tags\n";
  str += header.map(function(h){ return h; });
  str += "\n";

  console.log("str", str);

  for (var i = 0; i < datalist.length; i++) {
    var line = '';
    for (var index in datalist[i]) {
      if (line !== '') line += ','

      line += datalist[i][index];
    }

    str += line + '\n';
  }

  return str;
}

function getDataDic(stocks) {


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
  const eventTagList = stocks.reduce(function(result, stock) {
    const eventNameList = (stock.eventNames || []).map(function(name) {
      return {
        code: stock.code,
        type: "name",
        value: name,
      }
    });
    const eventDateList = (stock.eventDates || []).map(function(date) {
      return {
        code: stock.code,
        type: "date",
        value: date,
      }
    });
    const eventLocationList = (stock.eventLocations || []).map(function(location) {
      return {
        code: stock.code,
        type: "location",
        value: location,
      }
    });
    const eventPeopleList = (stock.eventPeople || []).map(function(person) {
      return {
        code: stock.code,
        type: "people",
        value: person,
      }
    });

    return result.concat(eventNameList, eventDateList, eventLocationList, eventPeopleList);
  }, []);

  // console.log(basicInfoList);
  console.log(photoList);
  console.log(scannedImageList);
  console.log(eventTagList);
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
    const basicInfoHeader = [ "Code", "Received Date", "Description", "Donor", "Condition", "Location", "Category", "Sign", "Remarks" ];
    const csvContent = convertStockToCsv(basicInfoHeader, basicInfoList)

    // const csvContent = convertStockToCsv(stocks);
    // const dataDic = getDataDic(stocks);
    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
    const link = document.createElement("a");

    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "my_data.csv".
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
