import React, { Component } from 'react';
// import './OrdersOwed.css';
import OrderOwed from './OrderOwed'

class OrdersOwedContainer extends Component {
    constructor(props) {
      super(props);
        // this.state = {
        // //   selectedFile: null,
        // }
    }

    render() {
        const orders = this.props.loggeduser.orders.map(
            (order, key) => {
                return <OrderOwed order = {order} id={key} />
            }
        );

    return (
        <div className="OrdersOwedContainer">
            {orders}
        </div>
    )
  }
}
    
export default OrdersOwedContainer;