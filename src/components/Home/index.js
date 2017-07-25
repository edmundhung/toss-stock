import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginForm from '../LoginForm';
import './style.css';

class Home extends React.PureComponent {
  // constructor(props, context) {
  //   super(props, context);
  // }

  render() {
    const {
      // state
      defaultEmail,

      // actionCreators
      login,
    } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-8 col-xs-offset-2 text-center">
            <h3>Tak Oi Secondary School</h3>
            <h1>Heritage Stock<br/>Management System</h1>
          </div>
          <div className="col-xs-4 col-xs-offset-4">
            <div className="well">
              <LoginForm
                defaultEmail={defaultEmail}
                onSubmit={login}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export function mapStateToProps(state) {
  return {
    defaultEmail: 'librarian@takoi.edu.hk',
  };
}

export const actionCreators = {
  login: () => {},
};

export default connect(mapStateToProps, actionCreators)(Home);
