import React from 'react';
import './style.css';

class StockDetail extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {
      stocks
    } = this.props;
    
    return (
      <div>
        <ol>
          {stocks.map(stock => (
            <li key={stock.code}>{stock.code} {stock.condition} {stock.status}</li>
          ))}
        </ol>
      </div>
    );
  }
}

export default StockDetail;
