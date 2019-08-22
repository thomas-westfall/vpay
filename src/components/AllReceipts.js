import React, { Component } from 'react';
import './AllReceipts.css';

class AllReceipts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            receipts: [],
            allorders: []
        }
    }

    componentDidMount() {
        this.setState({
            receipts : this.props.loggeduser.receipts
        })
    }

    viewreceipt = (eachReceipt) =>{
        console.log("DAWDAWD")
        document.getElementsByClassName("welcomeTableText")[0].innerHTML = "";
        var allOrders = []

                            eachReceipt.orders.map(item => {
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
                        
        return allOrders
    }

    render() {
        return (
            <table className="ReceiptTable">
                <thead>
                    <tr>
                        <td></td>
                        <td>ID</td>
                        <td>Total</td>
                        <td>Tip Percent</td>
                        <td>Orders</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.receipts ? 
                    this.state.receipts.map((eachReceipt) => (
                        <tr key={eachReceipt.id}>
                          <td className="cView">
                          <button onClick={() => this.props.displayorder(this.viewreceipt(eachReceipt))} className="bView">View</button>
                          </td>
                          <td>
                            {eachReceipt.id}
                          </td>
                          <td>
                              ${eachReceipt.totalPrice}
                          </td>
                          <td>
                              {eachReceipt.tipPercent}%
                          </td>
                          <td>
                              {eachReceipt.orders.length} Orders
                          </td>
                          <td className="cDel">
                             <button className="bDel">Delete</button>
                          </td>
                          {console.log(eachReceipt, "each one")}
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

export default AllReceipts;