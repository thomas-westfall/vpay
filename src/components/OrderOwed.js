// NO LONGER IN USE, CAN STILL USE THIS TO LOOK OVER





import React, { Component } from 'react';
import './OrderOwed.css';
import PayButton from './PayButton'
import Checkout from './Checkout';

class OrderOwed extends Component {
    render() {
        const order = this.props.order;
        console.log(order);
    return (
        <div className="card">
            {/* <div className="row row-title">
                <h1>Order number {this.props.id}</h1>
            </div>
            <div className="row">
                <div class="col col-title">ID</div>
                <div class="col col-title">Item Name</div>
                <div class="col col-title">Price</div>
            </div>
            <div className="row">
                <div class="col">{order.id}</div>
                <div class="col">{order.itemName}</div>
                <div class="col">{order.price}</div>
            </div>
            <div className="row">
                <div class="col col-title">paid:</div>
                <div class="col col-title">receiptId:</div>
                <div class="col col-title">userId:</div>
            </div>
            <div className="row">
                <div class="col">{order.paid.toString()}</div>
                <div class="col">{order.receiptId}</div>
                <div class="col">{order.userId}</div>
            </div>
            <div className="row">
                <div class="col"><button type="button" class="btn btn-primary">Pay now?</button></div>
            </div> */}
        
        
           
        </div>
    )
  }
}
    
export default OrderOwed;