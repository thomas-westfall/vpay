import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AllReceipts.css';
import loggeduser from '../store/utilities/loggeduser';


class AllReceipts extends Component {
    state = {
        receipts: [],
        orders: [],
        view: true
    }

    async componentDidMount() {
        await axios.get('https://vpay-heroku.herokuapp.com/api/receipts' + '/' + this.props.loggeduser.id)
            .then(res => {
                this.setState({
                    receipts: res.data
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
        const receiptList = receipts.length ? (
            receipts.map(receipt => {
                return (
                    <div className="receipt" key={receipt.id}>
                        <div className="receiptContent">
                            <p>
                                <span className="receiptId"><u>Receipt No:</u> {receipt.id}</span>
                                <div className="totalPrice"><u>Total:</u> {receipt.totalPrice}</div>
                                <div className="tip"><u>Tip:</u> {receipt.tipPercent}</div>
                            </p>
                        </div>
                    </div>
                )
            })
        ) : (
                <div className="noReceipts"> No receipts yet</div>
            )

        const orderList = () => {
            let allOrders = [];
            this.state.orders.map(order => {
                order.map(item => {
                    allOrders.push(
                        <div className="order" key={item.id}>
                            <div className="orderContent">
                                <p>
                                    <span className="orderId"><u>Order No:</u> {item.id}</span>
                                    <div className="orderName"><u>Order Name:</u> {item.itemName}</div>
                                    <div className="orderPrice"><u>Price:</u> {item.price}</div>
                                </p>
                            </div>
                        </div>
                    )
                }

                )
                allOrders.push(<div>---------------------</div>)
            })
            console.log(allOrders);
            return allOrders;
        }

        return (
            <div className='receiptHistory'>
                <div className="receiptHistoryTitle">
                    Receipt History
                </div>
                <div className="orders">
                    {this.state.view ? receiptList : orderList()}
                    <button type="button" className="showOrderButton" onClick={() => this.setState({ view: !this.state.view })}>Show Orders</button>
                </div>
            </div>
        );
    }
}

export default AllReceipts;