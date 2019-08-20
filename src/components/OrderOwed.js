import React, { Component } from 'react';
import './OrderOwed.css';

class OrderOwed extends Component {
    constructor(props) {
      super(props);
        this.state = {
          selectedFile: null,
        }
     
    }

    // onChangeHandler=event=>{
    //   this.setState({
    //     selectedFile: event.target.files[0]
    //   })
    //   console.log(event.target.files[0])
    // }

    render() {
        const order = this.props.order;
        console.log(order);
    return (
        <div className="container">
            <div className="row">
                <h1 className="display-1">Order number {this.props.id}</h1>
            </div>
            <div className="row">
                <div class="col">id: {order.id}</div>
                <div class="col">itemName: {order.itemName}</div>
            </div>
            <div className="row">
                price: {order.price}
            </div>


            {/* <li>
                    price: {order.price}
                </li>
                <li>
                    paid: {order.paid.toString()}
                </li>
                <button type="button" class="btn btn-primary">Pay now?</button>
                <li>
                    receiptId: {order.receiptId}
                </li>
                <li>
                    userId: {order.userId}
                </li> */}
           
        </div>
    )
  }
}
    
export default OrderOwed;