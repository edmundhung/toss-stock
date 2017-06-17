import React from 'react';
import './style.css';

class StockPhotoForm extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateIdPhotoName = this.updateIdPhotoName.bind(this);
    this.updateIdPhotoWidth = this.updateIdPhotoWidth.bind(this);
    this.updateIdPhotoHeight = this.updateIdPhotoHeight.bind(this);
    this.updateIdPhotoLength = this.updateIdPhotoLength.bind(this);

    this.state = this.getInitialFormState();
  }

  getInitialFormState() {
    return {
      idPhotoName: '',
      idPhotoWidth: '',
      idPhotoHeight: '',
      idPhotoLength: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    const code = this.state.code.trim();
    // const receivedDate = this.state.receivedDate.trim();
    const condition = this.state.condition.trim();
    const status = this.state.status.trim();

    // validation
    if (code === '' || condition === '' || status === '') {
      return;
    }

    this.props.onSubmit({
      code,
      condition,
      status,
    });

    this.setState(this.getInitialFormState());
  }

  handleChange(name, value) {
    const { readOnly } = this.props;

    if (!readOnly) {
      this.setState({ [name]: value });
    }
  }

  updateIdPhotoName(event) {
    this.handleChange('idPhotoName', event.target.value);
  }

  updateIdPhotoWidth(event) {
    this.handleChange('idPhotoWidth', event.target.value);
  }

  updateIdPhotoHeight(event) {
    this.handleChange('idPhotoHeight', event.target.value);
  }

  updateIdPhotoLength(event) {
    this.handleChange('idPhotoLength', event.target.value);
  }

  render() {
    const {
      idPhotoName,
      idPhotoWidth,
      idPhotoHeight,
      idPhotoLength,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="stock-id-photo-name">File name of photo:</label>
          <input
            id="stock-id-photo-name"
            className="form-control"
            type="text"
            value={idPhotoName}
            onChange={this.updateIdPhotoName}
          />
          <label htmlFor="stock-id-photo-width">Measurements(cm):</label>
          <input
            id="stock-id-photo-width"
            className="form-control"
            type="text"
            value={idPhotoWidth}
            onChange={this.updateIdPhotoWidth}
            placeholder="Weight"
          />
          <span>x</span>
          <input
            id="stock-id-photo-height"
            className="form-control"
            type="text"
            value={idPhotoHeight}
            onChange={this.updateIdPhotoHeight}
            placeholder="Height"
          />
          <span>x</span>
          <input
            id="stock-id-photo-length"
            className="form-control"
            type="text"
            value={idPhotoLength}
            onChange={this.updateIdPhotoLength}
            placeholder="Length"
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="reset" className="btn btn-default">Reset</button>
      </form>
    );
  }
}

export default StockPhotoForm;
