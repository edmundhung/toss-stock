import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './style.css';

class Home extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3 text-center">
            <h1>Tak Oi Secondary School</h1>
            <h3>Heritage Stock Management System</h3>
            <div className="well">
              <ul className="nav nav-pills nav-stacked">
                <li className=""><Link to="/stocks">Manage Stocks</Link></li>
                <li className=""><Link to="/stocks">Export Stocks</Link></li>
                <li className=""><Link to="/stocks">System Setting</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
