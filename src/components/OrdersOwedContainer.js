import React, { Component } from 'react';
import './OrdersOwedContainer.css';
import OrderOwed from './OrderOwed'

class OrdersOwedContainer extends Component {
    render() {
        let orders;
        // console.log(this.props.loggeduser.orders);
        // if (this.props.loggeduser.orders){
            console.log(this.props.loggeduser, "this is logged user");
            orders = this.props.loggeduser.orders.map(
                (order, key) => {
                    return <OrderOwed order = {order} id={key} />
                })
            // );
    
        // }
    return (
        <div className="container orders-owed-container">
            {orders}
        </div>
    )
  }
}
    
export default OrdersOwedContainer;