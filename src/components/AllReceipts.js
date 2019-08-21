import React, { Component } from 'react';
import axios from 'axios';
import './AllReceipts.css';
import loggeduser from '../store/utilities/loggeduser';

class AllReceipts extends Component {
    state = {
        receipts: []
    }

    componentDidMount() {
        axios.get(`https://vpay-heroku.herokuapp.com/api/receipts/${this.props.loggeduser.id}`)
            .then(res => {
                console.log(res)
                this.setState({
                    receipts: res.data
                })
            })
    }

    render() {
        const { receipts } = this.state;
        const receiptList = receipts.length ? (
            receipts.map(receipt => {
                return (
                    <div className="receipt" key={receipt.id}>
                        <div className="receiptContent">
                            <span className="receiptId">Receipt No: {receipt.id}</span>
                            <div className="totalPrice">Total:
                                    <div>{receipt.totalPrice}</div>

                            </div>
                            <div className="tip"><u>Tip:</u> {receipt.tipPercent}
                            </div>
                        </div>
                    </div>
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