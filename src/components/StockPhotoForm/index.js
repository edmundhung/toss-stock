import React from 'react';
import classNames from 'classnames';
import './style.css';

class StockPhotoForm extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateLength = this.updateLength.bind(this);
    this.updateWidth = this.updateWidth.bind(this);
    this.updateHeight = this.updateHeight.bind(this);
    this.reset = this.reset.bind(this);

    this.state = this.getInitialFormState(props);
  }

  getInitialFormState(props) {
    const { type } = props;

    if (type === "SCAN_PHOTO") {
      const defaultState = {
        photoId: '',
        name: '',
        nameError: '',
      };
    } else {
      const defaultState = {
        photoId: '',
        name: '',
        nameError: '',
        length: '',
        lengthError: '',
        width: '',
        widthError: '',
        height: '',
        heightError: '',
      };
    }

    return defaultState;
  }

  reset() {
    this.setState(
      this.getInitialFormState()
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.props === "SCAN_PHOTO") {
      const photo = {
        photoId: Date.now(),
        name: this.state.name.trim(),
      }

      let isValid = true;
      let nameError;

      // validation
      if (photo.name === '') {
        isValid = false;
        nameError = 'Name is required.';
      } else if (isNaN(photo.length)) {
        isValid = false;
        lengthError = 'Length must be a number.';
      }

      if (!isValid) {
        this.setState(() => ({
          submitted: true,
          nameError,
        }));

        return;
      }

    } else {
      const photo = {
        photoId: Date.now(),
        name: this.state.name.trim(),
        length: this.state.length.trim(),
        width: this.state.width.trim(),
        height: this.state.height.trim(),
      }

      let isValid = true;
      let nameError;
      let lengthError;
      let widthError;
      let heightError;

      // validation
      if (photo.name === '') {
        isValid = false;
        nameError = 'Name is required.';
      } else if (isNaN(photo.length)) {
        isValid = false;
        lengthError = 'Length must be a number.';
      } else if (photo.length < 0) {
        isValid = false;
        lengthError = 'Length must be positive.';
      } else if (isNaN(photo.width)) {
        isValid = false;
        widthError = 'Width must be a number.';
      } else if (photo.width < 0) {
        isValid = false;
        widthError = 'Width must be positive.';
      } else if (isNaN(photo.height)) {
        isValid = false;
        heightError = 'Height must be a number.';
      } else if (photo.height < 0) {
        isValid = false;
        heightError = 'Height must be positive.';
      }

      if (!isValid) {
        this.setState(() => ({
          submitted: true,
          nameError,
          lengthError,
          widthError,
          heightError,
        }));

        return;
      }

    }

    this.props.onSubmit(photo);
    this.reset();
  }

  handleChange(name, value) {
    const { readOnly } = this.props;

    if (!readOnly) {
      this.setState({ [name]: value });
    }
  }

  updateName(event) {
    this.handleChange('name', event.target.value);
  }

  updateLength(event) {
    this.handleChange('length', event.target.value);
  }

  updateWidth(event) {
    this.handleChange('width', event.target.value);
  }

  updateHeight(event) {
    this.handleChange('height', event.target.value);
  }


  render() {

    if (this.props === "SCAN_PHOTO") {
      const {
        submitted,
        name,
        nameError,
      } = this.state;
    } else {
      const {
        submitted,
        name,
        nameError,
        length,
        lengthError,
        width,
        widthError,
        height,
        heightError,
      } = this.state;
    }

    return (
      <form className="clearfix" onSubmit={this.handleSubmit}>
        <div className={classNames('form-group', { 'has-error': submitted && nameError })}>
          <label htmlFor="stock-id-photo-name">File name of photo:</label>
          <input
            id="stock-id-photo-name"
            className="form-control"
            type="text"
            value={name}
            onChange={this.updateName}
          />
          <div className="help-block">
            {submitted && nameError}
          </div>
        </div>
        <div className={classNames('form-group', { 'has-error': submitted && (lengthError || widthError || heightError)})}>
          <label htmlFor="stock-id-photo-length">Measurements:</label>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-3">
                <input
                  id="stock-id-photo-length"
                  className="form-control"
                  type="text"
                  value={length}
                  onChange={this.updateLength}
                  placeholder="Length"
                />
              </div>
              <div className="col-xs-1 ">
                <p>x</p>
              </div>
              <div className="col-xs-3">
                <input
                  id="stock-id-photo-width"
                  className="form-control"
                  type="text"
                  value={width}
                  onChange={this.updateWidth}
                  placeholder="Width"
                />
              </div>
              <div className="col-xs-1">
                <p>x</p>
              </div>
              <div className="col-xs-3">
                <input
                  id="stock-id-photo-height"
                  className="form-control"
                  type="text"
                  value={height}
                  onChange={this.updateHeight}
                  placeholder="Height"
                />
              </div>
              <div className="col-xs-1">
                <p>cm</p>
              </div>
            </div>
          </div>
          <div className="help-block">
            {submitted && lengthError}
          </div>
          <div className="help-block">
            {submitted && widthError}
          </div>
          <div className="help-block">
            {submitted && heightError}
          </div>
        </div>
        <div className="pull-right">
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="reset" className="btn btn-default" onClick={this.reset}>Reset</button>
        </div>
      </form>
    );
  }
}

export default StockPhotoForm;
