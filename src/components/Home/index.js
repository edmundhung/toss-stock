import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Home extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-8 col-xs-offset-2 text-center">
            <h3>Tak Oi Secondary School</h3>
            <h1>Heritage Stock<br/>Management System</h1>
          </div>
          <div className="col-xs-4 col-xs-offset-4">
            <hr />
            <div className="well">
              <ul className="nav nav-pills nav-stacked">
                <li>
                  <Link to="/stocks">Manage Stocks</Link>
                </li>
                <li>
                  <Link to="/stocks">Export Stocks</Link>
                </li>
                <li>
                  <Link to="/stocks">System Setting</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
