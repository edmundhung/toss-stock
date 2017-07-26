import React from 'react';
import './style.css';

class StockApprovalForm extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateSign = this.updateSign.bind(this);
    this.updateRemarks = this.updateRemarks.bind(this);

    this.state = this.getInitialFormState();
  }

  getInitialFormState() {
    return {
      sign: '',
      remarks: '',
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

  updateSign(event) {
    this.handleChange('sign', event.target.value);
  }

  updateRemarks(event) {
    this.handleChange('remarks', event.target.value);
  }

  render() {
    const {
      sign,
      remarks,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="stock-sign">Sign:</label>
          <input
            id="stock-sign"
            className="form-control"
            type="text"
            value={sign}
            onChange={this.updateSign}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock-remarks">Remarks:</label>
          <input
            id="stock-remarks"
            className="form-control"
            type="textarea"
            value={remarks}
            onChange={this.updateRemarks}
          />
        </div>
        <button type="submit" className="btn btn-warning">Submit</button>
        <button type="reset" className="btn btn-default">Reset</button>
      </form>
    );
  }
}

export default StockApprovalForm;
