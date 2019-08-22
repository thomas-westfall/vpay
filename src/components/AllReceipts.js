import React, { Component } from 'react';
import './AllReceipts.css';
import { Link } from 'react-router-dom';
import loggeduser from '../store/utilities/loggeduser';

class AllReceipts extends Component {
    state = {
        receipts: []
    }

    componentDidMount() {
        this.setState({
            receipts : this.props.loggeduser.receipts
        })
    }

    render() {
        // const { receipts } = this.state;
        // const receiptList = receipts.length ? (
        //     receipts.map(receipt => {
        //         return (
        //             <div className="receipt" key={receipt.id}>
        //                 <div className="receiptContent">
        //                     <span className="receiptId">Receipt No: {receipt.id}</span>
        //                     <div className="totalPrice">Total:
        //                             <div>{receipt.totalPrice}</div>

        //                     </div>
        //                     <div className="tip"><u>Tip:</u> {receipt.tipPercent}
        //                     </div>
        //                 </div>
        //             </div>
        //         )
        //     })
        // ) : (
        //         <div className="noReceipts"> No receipts yet</div>
        //     )

        // return (
        //     <div className='receiptHistory'>
        //         <div className="receiptHistoryTitle"> RECEIPT HISTORY
        //             <div className="orders">
        //                 {receiptList}
        //             </div>
        //         </div>
        //     </div>
        // );
        return (
            <table className="ReceiptTable">
                <thead>
                    <tr>
                        <td>View</td>
                        <td>ID</td>
                        <td>Total</td>
                        <td>Tip Percent</td>
                        <td>Orders</td>
                        <td>Delete</td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.receipts ? 
                    this.state.receipts.map((eachReceipt) => (
                        <tr key={eachReceipt.id}>
                          <td className="cView">
                             <Link className="bView">View</Link>
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