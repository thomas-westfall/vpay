import React, { Component } from 'react';
import './OrdersOwedContainer.css';
import OrderOwed from './OrderOwed';
import PayButton from './PayButton';

class OrdersOwedContainer extends Component {
    state = {
        orders: []
    }
    componentDidMount() {
        this.setState({
            orders: this.props.loggeduser.orders,
            username: this.props.loggeduser.username,
            balance: this.props.loggeduser.balance
        })
    }
    render() {
        console.log(this.state.orders)
        return (
            <table className="ReceiptTable">
                <thead>
                    <tr>
                        <td>Item ID</td>
                        <td>Item Name</td>
                        <td>Price</td>
                        <td>Receipt ID</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.orders ?
                        this.state.orders.map((order) => (
                            <tr key={order.id}>
                                <td>
                                    {order.id}
                                </td>
                                <td>
                                    {order.itemName}
                                </td>
                                <td>
                                    ${order.price}
                                </td>
                                <td>
                                    {order.receiptId}
                                </td>
                                <td>
                                    {order.paid ?
                                        "Paid!"
                                        :
                                        <PayButton id={order.id} username={order.receipt.user.username} balance={this.state.balance} amount={order.price} />
                                    }
                                </td>
                            </tr>
                        )
                        )
                        :
                        ""}
                    <tr>

                    </tr>
                </tbody>
            </table>
        )
    }
}

export default OrdersOwedContainer;