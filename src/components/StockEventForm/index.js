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

    this.state = this.getInitialFormState();
  }

  getInitialFormState() {
    return {
      eventNames: [],
      eventNamesError: '',
      eventDates: [],
      eventDatesError: '',
      eventLocations: [],
      eventLocationsError: '',
      eventPeople: [],
      eventPeopleError: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    // const stock = {
    //   code: this.props.code,
    //   receivedDate: this.state.receivedDate.trim(),
    //   description: this.state.description.trim(),
    //   donor: this.state.donor.trim(),
    //   condition: this.state.condition.trim(),
    //   location: this.state.location.trim(),
    //   category: this.state.category.trim(),
    //   classificationNum: this.state.category.trim() + this.state.classificationNum.trim(),
    //   sign: this.state.sign.trim(),
    //   remarks: this.state.remarks.trim(),
    //   photos: (this.props.stock != null ) ? this.props.stock.photos : [],
    //   scannedImages: (this.props.stock != null ) ? this.props.stock.scannedImages : [],
    //   eventNames: (this.props.stock != null ) ? this.props.stock.eventNames : [],
    //   eventDates: (this.props.stock != null ) ? this.props.stock.eventDates : [],
    //   eventLocations: (this.props.stock != null ) ? this.props.stock.eventLocations : [],
    //   eventPeople: (this.props.stock != null ) ? this.props.stock.eventPeople : [],
    // }
    const eventNames = this.state.eventNames.trim();
    const eventDates = this.state.eventDates.trim();
    const eventLocations = this.state.eventLocations.trim();
    const eventPeople = this.state.eventPeople.trim();

    // validation
    if (eventNames === '' || eventDates === '' || eventLocations === '' || eventPeople === '') {
      return;
    }

    this.props.onSubmit({
      eventNames,
      eventDates,
      eventLocations,
      eventPeople,
    });

    this.setState(this.getInitialFormState());
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
      eventNames,
      eventDates,
      eventLocations,
      eventPeople,
    } = this.state;

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
        <button type="reset" className="btn btn-default">Reset</button>
      </form>
    );
  }
}

export default StockEventForm;
