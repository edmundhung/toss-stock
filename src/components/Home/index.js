import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../Login';
import './style.css';

class Home extends React.PureComponent {
  // constructor(props, context) {
  //   super(props, context);
  // }

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
              <Login defaultEmail="librarian@takoi.edu.hk" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
