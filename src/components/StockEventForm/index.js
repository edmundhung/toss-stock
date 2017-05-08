import React from 'react';
import './style.css';

class StockEventForm extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePlace = this.updatePlace.bind(this);
    this.updateDates = this.updateDates.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updatePeople = this.updatePeople.bind(this);

    this.state = this.getInitialFormState();
  }

  getInitialFormState() {
    return {
      place: '',
      dates: '',
      name: '',
      people: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    const place = this.state.place.trim();
    const dates = this.state.dates.trim();
    const name = this.state.name.trim();
    const people = this.state.people.trim();

    // validation
    if (place === '' || dates === '' || name === '' || people === '') {
      return;
    }

    this.props.onSubmit({
      place,
      dates,
      name,
      people,
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

  updateName(event) {
    this.handleChange('name', event.target.value);
  }

  updatePeople(event) {
    this.handleChange('people', event.target.value);
  }

  render() {
    const {
      place,
      dates,
      name,
      people,
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
          <label htmlFor="stock-name">Event:</label>
          <input
            id="stock-name"
            className="form-control"
            type="text"
            value={name}
            onChange={this.updateName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock-people">People:</label>
          <input
            id="stock-people"
            className="form-control"
            type="text"
            value={people}
            onChange={this.updatePeople}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="reset" className="btn btn-default">Reset</button>
      </form>
    );
  }
}

export default StockEventForm;
