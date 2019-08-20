import React, { Component } from 'react';
import './HomePage.css';

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
        <div className="OrderOwed-container">
            <h1>Order number {this.props.id} </h1>
            <ul>
                <li>
                    id: {order.id}
                </li>
                <li>
                    itemName: {order.itemName}
                </li>
                <li>
                    price: {order.price}
                </li>
                <li>
                    paid: {order.paid}
                    <button>Paid?</button>
                </li>
                <li>
                    receiptId: {order.receiptId}
                </li>
                <li>
                    userId: {order.userId}
                </li>
            </ul>
           
        </div>
    )
  }
}
    
export default OrderOwed;