import React from 'react';
import classNames from 'classnames';
import './style.css';

class LoginForm extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.switchUser = this.switchUser.bind(this);

    this.state = this.getInitialFormState(props);
  }

  getInitialFormState(props) {
    return {
      submitted: false,
      email: props.defaultEmail || '',
      emailError: '',
      password: '',
      passwordError: '',
    }
  }

  componentDidMount() {
    this.password.focus();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.email === '' && prevState.email === this.props.defaultEmail) {
      this.email.focus();
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    let isValid = true;
    let emailError = '';
    let passwordError = '';

    // validation
    if (user.email.trim() === '') {
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

  switchUser() {
    this.setState(() => ({
      email: '',
    }));
  }

  handleChange(name, value) {
    const { readOnly } = this.props;

    if (!readOnly) {
      this.setState({ [name]: value });
    }
  }

  updateEmail(event) {
    this.handleChange('email', event.target.value);
  }

  updatePassword(event) {
    this.handleChange('password', event.target.value);
  }

  render() {
    const {
      props: {
        defaultEmail,
      },
      state: {
        submitted,
        email,
        emailError,
        password,
        passwordError,
      },
    } = this;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className={classNames('form-group', { 'has-error': submitted && emailError })}>
          <div className="input-group">
            <input
              id="user-email"
              className="form-control"
              tabIndex="1"
              ref={input => { this.email = input; }}
              type="email"
              placeholder="Email"
              value={email}
              disabled={email === defaultEmail}
              onChange={this.updateEmail}
            />
            <div className="input-group-btn">
              <button type="button" className="btn btn-default" onClick={this.switchUser}>
                <i className="glyphicon glyphicon-user" />
              </button>
            </div>
          </div>
          <div className="help-block">
            {submitted && emailError}
          </div>
        </div>
        <div className={classNames('form-group', { 'has-error': submitted && passwordError })}>
          <div className="input-group">
            <input
              id="user-password"
              className="form-control"
              tabIndex="2"
              ref={input => { this.password = input; }}
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.updatePassword}
            />
            <div className="input-group-btn">
              <button type="submit" className="btn btn-warning" tabIndex="3">
                <i className="glyphicon glyphicon-ok" />
              </button>
            </div>
          </div>
          <div className="help-block">
            {submitted && passwordError}
          </div>
        </div>
      </form>
    );
  }
}

export default LoginForm;
