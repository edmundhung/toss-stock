import React from 'react';
import './style.css';

class StockEventForm extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateEventNames = this.updateEventNames.bind(this);
    this.updateEventDates = this.updateEventDates.bind(this);
    this.updateEventLocations = this.updateEventLocations.bind(this);
    this.updateEventPeople = this.updateEventPeople.bind(this);
    this.reset = this.reset.bind(this);

    this.state = this.getInitialFormState(props);
  }

  getInitialFormState(props) {
    const { stock } = props;

    const defaultState = {
      eventNames: [],
      eventNamesError: '',
      eventDates: [],
      eventDatesError: '',
      eventLocations: [],
      eventLocationsError: '',
      eventPeople: [],
      eventPeopleError: '',
    };

    if (stock === null) {
      return defaultState;
    }

    return {
      ...defaultState,
      eventNames: stock.eventNames.join(', '),
      eventDates: stock.eventDates.join(', '),
      eventLocations: stock.eventLocations.join(', '),
      eventPeople: stock.eventPeople.join(', '),
    };
  }

  reset() {
    this.setState(
      this.getInitialFormState(this.props)
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    const eventTag = {
      eventNames: this.state.eventNames.split(',').map(name => name.trim()),
      eventDates: this.state.eventDates.split(',').map(date => date.trim()),
      eventLocations: this.state.eventLocations.split(',').map(location => location.trim()),
      eventPeople: this.state.eventPeople.split(',').map(person => person.trim()),
    };

    this.props.onSubmit(eventTag);
    this.reset();
  }

  handleChange(name, value) {
    const { readOnly } = this.props;

    if (!readOnly) {
      this.setState({ [name]: value });
    }
  }

  updateEventNames(event) {
    this.handleChange('eventNames', event.target.value);
  }

  updateEventDates(event) {
    this.handleChange('eventDates', event.target.value);
  }

  updateEventLocations(event) {
    this.handleChange('eventLocations', event.target.value);
  }

  updateEventPeople(event) {
    this.handleChange('eventPeople', event.target.value);
  }

  render() {
    const {
      props: {
        code,
      },
      state: {
        eventNames,
        eventDates,
        eventLocations,
        eventPeople,
      },
    } = this;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="stock-event-names">Names:</label>
          <input
            id="stock-event-names"
            className="form-control"
            type="textarea"
            value={eventNames}
            onChange={this.updateEventNames}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock-event-dates">Dates:</label>
          <input
            id="stock-event-dates"
            className="form-control"
            type="text"
            value={eventDates}
            onChange={this.updateEventDates}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock-event-locations">Locations:</label>
          <input
            id="stock-event-locations"
            className="form-control"
            type="text"
            value={eventLocations}
            onChange={this.updateEventLocations}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock-event-people">People:</label>
          <input
            id="stock-event-people"
            className="form-control"
            type="text"
            value={eventPeople}
            onChange={this.updateEventPeople}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="button" className="btn btn-default" onClick={this.reset}>Reset</button>
      </form>
    );
  }
}

export default StockEventForm;
