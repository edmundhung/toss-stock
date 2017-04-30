import React from 'react';
import './style.css';

class StockItemForm extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCode = this.updateCode.bind(this);
    this.updateCondition = this.updateCondition.bind(this);

    this.state = this.getInitialFormState();
  }

  getInitialFormState() {
    return {
      code: '',
      condition: 'good',
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    const code = this.state.code.trim();
    const condition = this.state.condition.trim();

    // validation
    if (code === '' || condition === '') {
      return;
    }

    this.props.onSubmit({
      code,
      condition,
    });

    this.setState(this.getInitialFormState());
  }

  handleChange(name, value) {
    const { readOnly } = this.props;

    if (!readOnly) {
      this.setState({ [name]: value });
    }
  }

  updateCode(event) {
    this.handleChange('code', event.target.value);
  }

  updateCondition(event) {
    this.handleChange('condition', event.target.value);
  }

  render() {
    const {
      code,
      condition,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="stock-code">Code no.:</label>
          <input
            id="stock-code"
            className="form-control"
            type="text"
            value={code}
            onChange={this.updateCode}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock-condition">Physical conditions:</label>
          <select
            id="stock-condition"
            className="form-control"
            value={condition}
            onChange={this.updateCondition}
          >
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="reset" className="btn btn-default">Reset</button>
      </form>
    );
  }
}

export default StockItemForm;
