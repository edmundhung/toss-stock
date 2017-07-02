import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import StockItemForm from '../StockItemForm';
import StockEventForm from '../StockEventForm';
import {
  getStockByCode,
  getItemFormCode,
  getEventFormCode,
  isShowingStockItemForm,
  isShowingStockEventForm,
} from '../../store/reducers';
import {
  updateStockItem,
  updateStockEvent,
  showStockItemForm,
  hideStockItemForm,
  showStockEventForm,
  hideStockEventForm,
} from '../../store/stock';
import './style.css';

class StockDetail extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {
      // state
      stock,
      isShowingItemForm,
      isShowingEventForm,
      itemFormCode,
      eventFormCode,

      // action creators
      updateStockItem,
      updateStockEvent,
      showItemForm,
      hideItemForm,
      showEventForm,
      hideEventForm,
    } = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
            <div className="well">
              <div className="well">
                <button type="button" className="btn btn-default btn-xs pull-right" onClick={() => showItemForm(stock.code)}>
                  Edit
                </button>
                <Modal show={isShowingItemForm} onHide={hideItemForm}>
                  <Modal.Header closeButton>
                    <Modal.Title>Update stock #{itemFormCode}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <StockItemForm
                      code={stock.code}
                      stock={stock}
                      onSubmit={updateStockItem}
                    />
                  </Modal.Body>
                </Modal>
                <h4>Basic information</h4>
                <div className="row">
                  <div className="col-xs-3">Code:</div>
                  <div className="col-xs-9">{stock.code}</div>
                </div>
                <div className="row">
                  <div className="col-xs-3">Date received:</div>
                  <div className="col-xs-9">{stock.receivedDate}</div>
                </div>
                <div className="row">
                  <div className="col-xs-3">Description:</div>
                  <div className="col-xs-9">{stock.description}</div>
                </div>
                <div className="row">
                  <div className="col-xs-3">Donated By:</div>
                  <div className="col-xs-9">{stock.donor}</div>
                </div>
                <div className="row">
                  <div className="col-xs-3">Physical Condition:</div>
                  <div className="col-xs-9">{stock.condition}</div>
                </div>
                <div className="row">
                  <div className="col-xs-3">Location:</div>
                  <div className="col-xs-9">{stock.location}</div>
                </div>
                <div className="row">
                  <div className="col-xs-3">Category:</div>
                  <div className="col-xs-9">{stock.category}</div>
                </div>
                <div className="row">
                  <div className="col-xs-3">Classification no.:</div>
                  <div className="col-xs-9">{stock.classificationNum}</div>
                </div>
                <div className="row">
                  <div className="col-xs-3">Sign:</div>
                  <div className="col-xs-9">{stock.sign}</div>
                </div>
                <div className="row">
                  <div className="col-xs-3">Remarks:</div>
                  <div className="col-xs-9">{stock.remarks}</div>
                </div>
              </div>
              <div className="well">
                <h4>Related pictures</h4>
                <table className="table table-hover">
                  <thead>
                    <tr className="active">
                      <th colSpan="4">ID photos</th>
                      <th><a href="#" className="btn btn-default btn-xs pull-right">Add ID photo</a></th>
                    </tr>
                    <tr>
                      <th>name</th>
                      <th>width</th>
                      <th>height</th>
                      <th>length</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {(stock.photos || []).map(photo => (
                    <tr key={photo.photoId}>
                      <td>{photo.name}</td>
                      <td>{photo.width}</td>
                      <td>{photo.height}</td>
                      <td>{photo.length}</td>
                      <td><a href="#" className="btn btn-danger btn-xs pull-right">Delete photo</a></td>
                    </tr>
                  ))}
                  </tbody>
                </table>
                <table className="table table-hover">
                  <thead>
                    <tr className="active">
                      <th colSpan="4">Scanned images</th>
                      <th><a href="#" className="btn btn-default btn-xs pull-right">Add scanned image</a></th>
                    </tr>
                    <tr>
                      <th colSpan="4">name</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {(stock.scannedImages || []).map(scannedImage => (
                    <tr key={scannedImage.scannedImageId}>
                      <td colSpan="4">{scannedImage.name}</td>
                      <td><a href="#" className="btn btn-danger btn-xs pull-right">Delete photo</a></td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
              <div className="well">
                <button type="button" className="btn btn-default btn-xs pull-right" onClick={() => showEventForm(stock.code)}>
                  Edit
                </button>
                <Modal show={isShowingEventForm} onHide={hideEventForm}>
                  <Modal.Header closeButton>
                    <Modal.Title>Update event tags #{eventFormCode}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <StockEventForm
                      code={stock.code}
                      stock={stock}
                      onSubmit={updateStockEvent}
                    />
                  </Modal.Body>
                </Modal>
                <h4>Event</h4>
                <div className="row">
                  <div className="col-xs-3">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">Name</h4>
                      </div>
                      <div className="panel-body">
                        {(stock.eventNames || []).map(eventName => (
                          <span className="label label-default" key={JSON.stringify(eventName)}>{eventName}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-3">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">Date</h4>
                      </div>
                      <div className="panel-body">
                        {(stock.eventDates || []).map(eventDate => (
                          <span className="label label-default" key={JSON.stringify(eventDate)}>{eventDate}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-3">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">Location</h4>
                      </div>
                      <div className="panel-body">
                        {(stock.eventLocations || []).map(eventLocation => (
                          <span className="label label-default" key={JSON.stringify(eventLocation)}>{eventLocation}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-3">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">People</h4>
                      </div>
                      <div className="panel-body">
                        {(stock.eventPeople || []).map(eventPerson => (
                          <span className="label label-default" key={JSON.stringify(eventPerson)}>{eventPerson}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="clearfix">
                <div className="pull-right">
                  <Link to="/stocks" className="btn btn-default">Close</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export function mapStateToProps(state, props) {
  const { code } = props.match.params;
  const stockByCode = getStockByCode(state);
  const stock = stockByCode[code];

  return {
    stock,
    isShowingItemForm: isShowingStockItemForm(state),
    isShowingEventForm: isShowingStockEventForm(state),
    itemFormCode: getItemFormCode(state),
    eventFormCode: getEventFormCode(state),
  };
}

export const actionCreators = {
  updateStockItem: updateStockItem,
  updateStockEvent: updateStockEvent,
  showItemForm: showStockItemForm,
  hideItemForm: hideStockItemForm,
  showEventForm: showStockEventForm,
  hideEventForm: hideStockEventForm,
};

export default connect(mapStateToProps, actionCreators)(StockDetail);
