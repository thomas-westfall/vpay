import React, { Component } from 'react';
import './OrdersOwedContainer.css';
import OrderOwed from './OrderOwed'

class OrdersOwedContainer extends Component {
    render() {
        const orders = this.props.loggeduser.orders.map(
            (order, key) => {
                return <OrderOwed order = {order} id={key} />
            }
        );

    return (
        <div className="container orders-owed-container">
            {orders}
        </div>
    )
  }
}
    
export default OrdersOwedContainer;