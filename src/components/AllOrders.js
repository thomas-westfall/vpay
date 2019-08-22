import React, { Component } from 'react';
import './AllReceipts.css';

class AllOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders : [],
        }
    }

    componentDidMount() {
        this.setState({
            orders : this.props.orders
        })
    }
    render() {
        return (
            <table className="ReceiptTable">
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Item Name</td>
                        <td>Price</td>
                        <td>Paid</td>
                        <td>Owner</td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.orders[0] ? 
                    this.state.orders.map((eachOrder) => (
                        <tr key={eachOrder.id}>
                          <td>
                            {eachOrder.id}
                          </td>
                          <td>
                            {eachOrder.itemName}
                          </td>
                          <td>
                            ${eachOrder.price}
                          </td>
                          <td>
                              {eachOrder.paid ? "Yes" : "No"}
                          </td>
                          <td>
                              {eachOrder.userId}
                          </td>
                          {console.log(eachOrder, "each one")}
                        </tr>
                      )
                      )
                    :
                    "" }
                    <tr>

                    </tr>
                </tbody>
            </table>
        )
    }
}

export default AllOrders;