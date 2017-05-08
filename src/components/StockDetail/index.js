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
        <div>
          Code: {code}
        </div>
        <div>
          Date received: {receivedDate}
        </div>
        <div>
          Description: {description}
        </div>
        <div>
          Donated By: {donor}
        </div>
        <div>
          Physical Condition: {condition}
        </div>
        <div>
          Location: {location}
        </div>
        <div>
          Category: {category}
        </div>
        <div>
          Classification no.: {classificationNum}
        </div>
        <div>
          Photos:
          <table className="table">
            <thead>
              <tr>
                <th>name</th>
                <th>width</th>
                <th>height</th>
                <th>length</th>
              </tr>
            </thead>
            {photos.map(photo => (
              <tr>
                <td>{photo.name}</td>
                <td>{photo.width}</td>
                <td>{photo.height}</td>
                <td>{photo.length}</td>
              </tr>
            ))}
          </table>
        </div>
        <div>
          Scanned images:
          <ul>
            {photos.map(photo => (
              <li>{photo.name}</li>
            ))}
          </ul>
        </div>
        <div>
          Sign: {sign}
        </div>
        <div>
          Remarks: {remarks}
        </div>
        <div>
          Event:
          <table className="table">
            <thead>
              <tr>
                <th>place</th>
                <th>dates</th>
                <th>name</th>
                <th>people</th>
              </tr>
            </thead>
            {events.map(event => (
              <tr>
                <td>{event.place}</td>
                <td>{event.dates}</td>
                <td>{event.name}</td>
                <td>{event.people}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }
}

export default StockDetail;
