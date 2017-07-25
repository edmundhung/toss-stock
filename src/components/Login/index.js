import React from 'react';
import classNames from 'classnames';
import './style.css';

class Login extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePassword = this.updatePassword.bind(this);

    this.state = this.getInitialFormState();
  }

  getInitialFormState() {
    return {
      submitted: false,
      email: 'librarian@takoi.edu.hk',
      emailError: '',
      password: '',
      passwordError: '',
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    let isValid = true;
    let emailError;
    let passwordError;

    // validation
    if (user.email === '') {
      isValid = false;
      emailError = 'Email is required.';
    } else if (user.password === '') {
      isValid = false;
      passwordError = 'Password is required.';
    }

    if (!isValid) {
      this.setState(() => ({
        submitted: true,
        emailError,
        passwordError,
      }));

      return;
    }

    this.props.onSubmit(user);
  }

  handleChange(name, value) {
    const { readOnly } = this.props;

    if (!readOnly) {
      this.setState({ [name]: value });
    }
  }

  updatePassword(event) {
    this.handleChange('password', event.target.value);
  }

  updateEmail(event) {
    this.handleChange('email', event.target.value);
  }

  render() {
    const {
      submitted,
      email,
      emailError,
      password,
      passwordError,
    } = this.state;

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
              <form onSubmit={this.handleSubmit}>
                <div className={classNames('form-group', { 'has-error': submitted && emailError })}>
                  <input
                    id="user-email"
                    className="form-control"
                    type="email"
                    value={email}
                    disabled
                    onChange={this.updateEmail}
                  />
                  <div className="help-block">
                    {submitted && emailError}
                  </div>
                </div>
                <div className={classNames('form-group', { 'has-error': submitted && passwordError })}>
                  <input
                    id="user-password"
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.updatePassword}
                  />
                  <div className="help-block">
                    {submitted && passwordError}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
