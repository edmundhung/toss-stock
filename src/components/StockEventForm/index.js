import React from 'react';
import './style.css';

class StockEventForm extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePlace = this.updatePlace.bind(this);
    this.updateDates = this.updateDates.bind(this);
    this.updateEvent = this.updateEvent.bind(this);

    this.state = this.getInitialFormState();
  }

  getInitialFormState() {
    return {
      place: '',
      dates: '',
      event: '',
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

  updatePlace(event) {
    this.handleChange('place', event.target.value);
  }

  updateDates(event) {
    this.handleChange('dates', event.target.value);
  }

  updateEvent(event) {
    this.handleChange('event', event.target.value);
  }

  render() {
    const {
      place,
      dates,
      event,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="stock-place">Place:</label>
          <input
            id="stock-place"
            className="form-control"
            type="textarea"
            value={place}
            onChange={this.updatePlace}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock-dates">Dates:</label>
          <input
            id="stock-dates"
            className="form-control"
            type="text"
            value={dates}
            onChange={this.updateDates}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock-event">Event:</label>
          <input
            id="stock-event"
            className="form-control"
            type="text"
            value={event}
            onChange={this.updateEvent}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="reset" className="btn btn-default">Reset</button>
      </form>
    );
  }
}

export default StockEventForm;
