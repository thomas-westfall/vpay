import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import AllReceipts from './AllReceipts';
import AllOrders from './AllOrders';
import OrdersOwedContainer from './OrdersOwedContainer';
import { withRouter } from 'react-router-dom';
import logo from './images/vpayLogov1.png';
const axios = require('axios');
const paypal_sdk = require('paypal-rest-sdk');

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      tlbox: [],
      amount: this.props.loggeduser.balance,
      email: this.props.loggeduser.email,
      username: this.props.loggeduser.username
    }
    console.log(this.props.loggeduser)

  }

  componentDidMount() {
    this.props.resetReceiptData();
    this.props.resetOrdersData();
    //console.log(this.props.loggeduser.email)
  }
  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
    console.log(event.target.files[0])

  }

  logout = () => {
    console.log('logout')
    this.props.logOut();
    this.props.me();
    this.props.history.push('/')
  }

  displayorder = (val) => {
    this.setState({ tlbox: val })
  }

  checkout = () => {
    paypal_sdk.configure({
      'mode': 'sandbox',
      'client_id': 'AYc_WD_FqZRhsF9vpUmXank8pwsAMS9Xjz3y89LeJ3kXQ_f5jumCjCIKnvYafaGZ0QOHYVs9GeY-M7cF',
      'client_secret': 'EMH6VI34GAwYTfH1ad5wiAU1Wf2_oZBWNYaSuqBy0IMA_tM9Xo8aSbK4mgETbHE1Pg8GLV4PACE5b35m'
    })
    
    var config_opts = {
        'mode':'sandbox',
        'client_id': 'AYc_WD_FqZRhsF9vpUmXank8pwsAMS9Xjz3y89LeJ3kXQ_f5jumCjCIKnvYafaGZ0QOHYVs9GeY-M7cF',
        'client_secret': 'EEMH6VI34GAwYTfH1ad5wiAU1Wf2_oZBWNYaSuqBy0IMA_tM9Xo8aSbK4mgETbHE1Pg8GLV4PACE5b35m'
    };

    var create_payment_json = {
      "sender_batch_header": {
          "email_subject": "Vpay Payment",
          "recipient_type": "EMAIL"
      },
      "items": [
          {
              "recipient_type": "EMAIL",
              "amount": {
                  "value": this.state.amount,
                  "currency": "USD"
              },
              "note": "Thank you for using Vpay!",
              "sender_item_id": "123",
              "receiver": this.state.email
          }
      ]
  };

  paypal_sdk.payout.create(create_payment_json,config_opts, function (err, data) {
      if (err) console.log(err);
      else{
          axios({
              method: 'put',
              url: 'https://vpay-backend-auth.herokuapp.com/api/users/balance',
              data: {
                username: this.props.loggeduser.username,
                balance: 0
              }
            });
      }
      console.log("Create Payment Response");
      console.log(data);
  });
  
  }

  render() {
    return (
      <div className="container-fluid">

        <nav className="navbar navbar-fixed-top">
          <img className="logoImg" src={logo} alt="logo" />
          <Link className="btn btn-danger" to='/' onClick={this.logout}>Log out</Link>
        </nav>

        <div className="row">
          {this.props.orders[0] ?
            <div className="colTR">
              <div className="TopRow">
                <h1 className="headingLabel">Orders of Receipt {this.props.orders[0].receiptId}</h1>
              </div>
              <div className="TopRowTX">
                <div className="receiptHistory">
                  <AllOrders  orders={this.props.orders} />
                </div>
              </div>
            </div>


            :
            <div className="colTL">
              <div className="TopRow">
                <table className="welcomeTable">
                  <tbody>
                    <tr>
                      <td className="welcomeTableText">
                        <h1>Nice day for some food, {this.props.loggeduser.firstName}!</h1>
                        Through this website, you'll be able to assign the orders that your friend/family/enemy made with YOUR money. Have them pay you back so you can call it even!
                              You have ${this.props.loggeduser.balance} in your balance
                            </td>
                      <td>
                      </td>
                    </tr>
                    <tr className="OrdersInfo">
                      {this.state.tlbox}
                    </tr>
                    <tr>
                      <div>
                        {console.log(this.props)}
                        {this.props.loggeduser.balance == 0 ?
                        "":
                        // <form action={"/pay/" + this.state.amount + "/" + this.state.email + "/" + this.props.loggeduser.username} method="post">
                        //   <input className="cView"type="submit" value="Cash out"></input>
                        // </form>
                        <button onClick={() => this.checkout()}></button>
                        }
                      </div>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          }


          <div className="colTR">
            <div className="TopRow">
              <h1 className="headingLabel">Receipt History</h1>
            </div>
            <div className="TopRowTX">
              <div className="receiptHistory">
                <AllReceipts displayorder={this.displayorder} loggeduser={this.props.loggeduser} fetchOrdersData={this.props.fetchOrdersData} resetOrdersData={this.props.resetOrdersData} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="colBL">
            <div className="TopRow">
              <h1 className="headingLabel" >Upload A Receipt</h1>
            </div>
            <div className="TopRowT">
              <form method="post" action="#" id="#" className="upload-form">
                <div className="form-group files">
                  <input type="file" className="form-control" name="file" onChange={this.onChangeHandler} multiple="" />
                </div>
                <center>
              <button type="button" className="uploadButton" onClick={() => this.props.fetchReceiptData(this.state.selectedFile)}>Upload</button>
              {this.props.data.amounts ?
                <Link to="/orders">
                  <button className="toOrdersButtonS">Proceed</button></Link> :
                <button className="toOrdersButtonB">No Orders</button>}
            </center>
              </form>
            </div>

          </div>
          <div className="colBR">
            <div className="TopRow">
              <h1 className="headingLabel">Order History</h1>
            </div>
            <div className="TopRowTX">
              <div className="receiptHistory">
                <OrdersOwedContainer loggeduser={this.props.loggeduser} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(HomePage);