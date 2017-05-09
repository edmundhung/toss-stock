import React from 'react';
import './style.css';

class StockDetail extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {
      code,
      receivedDate,
      description,
      donor,
      condition,
      location,
      category,
      classificationNum,
      photos,
      scannedImages,
      sign,
      remarks,
      events,
    } = this.props;

    return (
      <div>
        <div className="btn-group btn-group-justified">
          <a href="#" className="btn btn-default">Edit</a>
          <a href="#" className="btn btn-default">Delete</a>
        </div>
        <div className="well">
          <div className="well">
            <h4>Basic information</h4>
            <hr />
            <div className="row">
              <div className="col-xs-3">Code:</div>
              <div className="col-xs-9">{code}</div>
            </div>
            <div className="row">
              <div className="col-xs-3">Date received:</div>
              <div className="col-xs-9">{receivedDate}</div>
            </div>
            <div className="row">
              <div className="col-xs-3">Description:</div>
              <div className="col-xs-9">{description}</div>
            </div>
            <div className="row">
              <div className="col-xs-3">Donated By:</div>
              <div className="col-xs-9">{donor}</div>
            </div>
            <div className="row">
              <div className="col-xs-3">Physical Condition:</div>
              <div className="col-xs-9">{condition}</div>
            </div>
            <div className="row">
              <div className="col-xs-3">Location:</div>
              <div className="col-xs-9">{location}</div>
            </div>
            <div className="row">
              <div className="col-xs-3">Category:</div>
              <div className="col-xs-9">{category}</div>
            </div>
            <div className="row">
              <div className="col-xs-3">Classification no.:</div>
              <div className="col-xs-9">{classificationNum}</div>
            </div>
            <div className="row">
              <div className="col-xs-3">Sign:</div>
              <div className="col-xs-9">{sign}</div>
            </div>
            <div className="row">
              <div className="col-xs-3">Remarks:</div>
              <div className="col-xs-9">{remarks}</div>
            </div>
          </div>
          <div className="well">
            <h4>Related pictures</h4>
            <hr />
            <table className="table table-hover">
              <thead>
                <tr className="active">
                  <th colSpan="4">ID photos</th>
                  <th><a href="#" className="btn btn-success btn-xs pull-right">Add ID photo</a></th>
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
                {photos.map(photo => (
                <tr>
                  <td>{photo.name}</td>
                  <td>{photo.width}</td>
                  <td>{photo.height}</td>
                  <td>{photo.length}</td>
                  <td><a href="#" className="btn btn-warning btn-xs pull-right">Delete photo</a></td>
                </tr>
              ))}
              </tbody>
            </table>
            <table className="table table-hover">
              <thead>
                <tr className="active">
                  <th colSpan="4">Scanned images</th>
                  <th><a href="#" className="btn btn-success btn-xs pull-right">Add scanned image</a></th>
                </tr>
                <tr>
                  <th colSpan="4">name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {photos.map(photo => (
                <tr>
                  <td colSpan="4">{photo.name}</td>
                  <td><a href="#" className="btn btn-warning btn-xs pull-right">Delete photo</a></td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
          <div className="well">
            <h4>Tags</h4>
            <hr />
            <div className="row">
              <div className="col-xs-3">
              </div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>place</th>
                  <th>dates</th>
                  <th>name</th>
                  <th>people</th>
                </tr>
              </thead>
              <tbody>
              {events.map(event => (
                <tr>
                  <td>{event.place}</td>
                  <td>{event.dates}</td>
                  <td>{event.name}</td>
                  <td>{event.people}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default StockDetail;
