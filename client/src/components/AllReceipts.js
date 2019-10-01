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
                          <button onClick={() => this.props.fetchOrdersData(eachReceipt.orders)} className="bView">View</button>
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
                             <button className="bDel" onClick={() => this.props.resetOrdersData()}>Hide</button>
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