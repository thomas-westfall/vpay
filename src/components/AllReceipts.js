import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './AllReceipts.css';
import loggeduser from '../store/utilities/loggeduser';


class AllReceipts extends Component{
    state={
        receipts: []
    }

    componentDidMount(){
        axios.get('https://vpay-heroku.herokuapp.com/api/receipts' + '/' + this.props.loggeduser.id)
            .then(res => {
                console.log(res)
                this.setState ({
                    receipts: res.data
                })
            })
    }

    render(){
        const {receipts} = this.state;
        const receiptList = receipts.length ? (
            receipts.map(receipt => {
                return (
                    <div className="receipt" key={receipt.id}>
                        <div className="receiptContent">
                            <p>
                                <span className="receiptId"><u>Receipt No:</u> {receipt.id}</span>
                                <div className="totalPrice"><u>Total:</u> {receipt.totalPrice}
                                </div>
                                <div className="tip"><u>Tip:</u> {receipt.tipPercent}
                                </div>
                            </p>
                        </div>
                    </div>
                )
            })
        ) : (
            <div className="noReceipts"> No receipts yet</div>
        )

        return (
            <div className='receiptHistory'>
                <div className="receiptHistoryTitle">
                    Receipt History
                </div>
                <div classNam="orders">
                    {receiptList}
                </div>
            </div>
        );
    }
}

export default AllReceipts;