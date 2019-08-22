import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AllReceipts.css';
import loggeduser from '../store/utilities/loggeduser';

class AllReceipts extends Component {
    state = {
        receipts: [],
        orders: [],
        view: false
    }

    componentDidMount() {
        axios.get(`https://vpay-backend-auth.herokuapp.com/api/receipts/${this.props.loggeduser.id}`)
            .then(res => {
                console.log(res)
                this.setState({
                    receipts: res.data,
                })
            })
            let allOrders = [];
            this.state.receipts.map(receipt => {
                allOrders.push(receipt.orders)
            })
            this.setState({
                orders: allOrders
            })
    }


    render() {
        const { receipts } = this.state;
        var allOrders = [];
        const receiptList = receipts.length ? (
            
            receipts.map(receipt => {
                return (
                    <td>
                    <div className="receipt" key={receipt.id}>
                        <div className="receiptContent">
                            <span className="receiptId">Receipt No: {receipt.id}</span>
                            <div className="totalPrice">Total:
                                    <div>{receipt.totalPrice}</div>

                            </div>
                            <div className="tip"><u>Tip:</u> {receipt.tipPercent}
                            </div>
                            <div className="orders"><u>Orders:</u>
                            {allOrders = []}
                            {receipt.orders.map(item => {
                            allOrders.push(
                                <div id={item.id} className="order" key={item.id}>
                                    <div className="orderContent">
                                        <p>
                                            <span className="orderId"><u>Order No:</u> {item.id}</span>
                                            <div className="orderName"><u>Order Name:</u> {item.itemName}</div>
                                            <div className="orderPrice"><u>Price:</u> {item.price}</div>
                                        </p>
                                    </div>
                                </div>
                            )
                        
        
                        
                            })
                        }
                        {console.log(allOrders.length)}

                        {/* for the showhide button. doesnt work (showhides all receipts orders) */}
                        {/* {this.state.view ? (
                            <div>
                            <button type="button" className="showOrderButton" onClick={() => this.setState({ view: !this.state.view })}>Hide Orders</button>
                            {allOrders}
                            </div>
            
                            ): (<button type="button" className="showOrderButton" onClick={() => this.setState({ view: !this.state.view })}>Show Orders</button>
                        )} */}
                         {allOrders}
                            </div>
                        </div>
                    </div>
                    </td>
                )
            })
        ) : (
                <div className="noReceipts"> No receipts yet</div>
            )

        return (
            <div className='receiptHistory'>
                <div className="receiptHistoryTitle"> RECEIPT HISTORY
                    <div className="orders">
                    {receiptList}
                    </div>
                </div>
            </div>
        );
    }
}

export default AllReceipts;