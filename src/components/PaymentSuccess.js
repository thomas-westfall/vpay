
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

class PaymentSuccess extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div >
          <h1>PAYMENT OMG SUCCESS IM RICH BOI</h1>
          <Link to='/home'>BACK HOME</Link>
      </div>
    )
  }
}

export default PaymentSuccess;