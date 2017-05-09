import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class StockDetail extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {
      stocks
    } = this.props;

    return (
      <div>
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

export default StockDetail;
