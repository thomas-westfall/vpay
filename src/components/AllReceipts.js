import React, {Component} from 'react';
import axios from 'axios';

class AllReceipts extends Component{
    state={
        receipts: []
    }

    componentDidMount(){
        axios.get(`https://vpay-heroku.herokuapp.com/api/receipts/${this.props.loggeduser.id}`)
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
                                <span className="receiptId">Receipt No: {receipt.id}</span>
                                <div className="totalPrice">Total:
                                    <div>{receipt.totalPrice}</div>
                                </div>
                                <div className="tip">Tip:
                                    <div>{receipt.tipPercent}</div>
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
                <div className="receiptHistoryTitle"> RECEIPT HISTORY
                    <div classNam="orders">
                        {receiptList}
                    </div>
            </div>
        </div>
        );
    }
}

export default AllReceipts;