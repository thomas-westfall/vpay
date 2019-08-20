import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';



class AllReceipts extends Component{
    state={
        receipts: []
    }

    componentDidMount(){
        axios.get('https://vpay-heroku.herokuapp.com/api/receipts')
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
                <div className="totalPrice"> TOTAL PRICE:
                </div>
            </div>
        </div>
        );
    }
}

    // const orders= axios.get("https://vpay-heroku.herokuapp.com/api/orders").then(res => {
    // this.setState({orders: res.data});
    // });

    // }

export default AllReceipts;