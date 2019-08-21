import React, { Component } from 'react';
import './OrdersOwedContainer.css';
import OrderOwed from './OrderOwed'

class OrdersOwedContainer extends Component {
    render() {
        let orders;
        if (this.props.loggeduser.orders ){
            orders = this.props.loggeduser.orders.map(
                (order, key) => {
                    return <OrderOwed order = {order} id={key} />
                }
            );
    
        }
    return (
        <div className="container orders-owed-container">
            {this.props.loggeduser.orders ? ({orders}) : ""}
        </div>
    )
  }
}
    
export default OrdersOwedContainer;