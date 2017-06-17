import React from 'react';
import { Link } from 'react-router-dom';
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
      eventNames,
      eventDates,
      eventLocations,
      eventPeople,
      onDeleteStoke,
      isDeletedStock
    } = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
            <div className="well">
              <div className="well">
                <a href="#" className="btn btn-default btn-xs pull-right">Edit</a>
                <h4>Basic information</h4>
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
                    {(photos || []).map(photo => (
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
                    {(scannedImages || []).map(scannedImage => (
                    <tr key={scannedImage.scannedImageId}>
                      <td colSpan="4">{scannedImage.name}</td>
                      <td><a href="#" className="btn btn-danger btn-xs pull-right">Delete photo</a></td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
              <div className="well">
                <h4>Event</h4>
                <div className="row">
                  <div className="col-xs-3">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">Name</h4>
                      </div>
                      <div className="panel-body">
                        {(eventNames || []).map(eventName => (
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
                        {(eventDates || []).map(eventDate => (
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
                        {(eventLocations || []).map(eventLocation => (
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
                        {(eventPeople || []).map(eventPerson => (
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

export default StockDetail;
