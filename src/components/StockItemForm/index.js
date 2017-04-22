import React from 'react';
import './style.css';

// function StockItemForm(props) {
//   const {
//     name,
//     type,
//   } = props;
//
//   return (
//     <form>
//       <label>
//         Name:
//         <input type="text" value={name}></input>
//       </label>
//       <label>
//         Type:
//         <select value={type}>
//           <option value="book">Book</option>
//           <option value="CD">CD</option>
//         </select>
//       </label>
//       <button type="submit">Submit</button>
//       <button type="reset">Reset</button>
//     </form>
//   );
// }

class StockItemForm extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      name: props.defaultName || '',
      type: ''
    };
  }

  handleChange(event) {
    const { readOnly } = this.props;

    if (!readOnly) {
      this.setState({ name: event.target.value });
    }
  }

  render() {
    const {
      name,
      type,
    } = this.state;

    return (
      <form>
        <label>
          Name:
          <input type="text" value={name} onChange={this.handleChange} />
        </label>
        <label>
          Type:
          <select value={type}>
            <option value="book">Book</option>
            <option value="CD">CD</option>
          </select>
        </label>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </form>
    );
  }
}

export default StockItemForm;
