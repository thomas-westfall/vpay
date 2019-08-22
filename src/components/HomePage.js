import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import AllReceipts from './AllReceipts'
import OrdersOwedContainer from './OrdersOwedContainer';
import { withRouter } from 'react-router-dom';
import logo from './images/vpayLogov1.png';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      tlbox: [],
      amount: 100, //this.props.loggeduser.balance
      email: this.props.loggeduser.email
    }
    console.log(this.props.loggeduser)

  }

  componentDidMount() {
    this.props.resetReceiptData();
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
    this.setState({tlbox: val})
  }

  render() {
    return (
      <div className="container-fluid">

        <nav className="navbar navbar-fixed-top">
          <img className="logoImg" src={logo} alt="logo" />
          <Link className="btn btn-danger" to='/' onClick={this.logout}>Log out</Link>
        </nav>

        <div className="row">
          <div className="colTL">
            <div className="TopRow">
              <table className="welcomeTable">
                <tbody>
                  <tr>
                    <td className="welcomeTableText">
                      <h1>Nice day for some food, {this.props.loggeduser.firstName}!</h1>
                      Through this website, you'll be able to assign the orders that your friend/family/enemy made with YOUR money. Have them pay you back so you can call it even!
                    </td>
                    <td>
                    </td>
                  </tr>
                  <tr>
                  {this.state.tlbox}
                  </tr>
                  <tr>
                  <div>
                    {console.log(this.props)}
                    <form action={"/pay/" + this.state.amount + "/" + this.state.email} method="post">
                    <input type="submit" value="Cash out"></input>
                    </form>
                    </div>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="colTR">
            <div className="TopRow">
              <h1 className="headingLabel">Receipt History</h1>
            </div>
            <div className="TopRowTX">
              <div className="receiptHistory">
                <AllReceipts displayorder={this.displayorder} loggeduser={this.props.loggeduser} />
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
              </form>
            </div>
            <center>
              <button type="button" className="uploadButton" onClick={() => this.props.fetchReceiptData(this.state.selectedFile)}>Upload</button>
              {this.props.data.amounts ?
                <Link to="/orders">
                  <button className="toOrdersButtonS">Proceed</button></Link> :
                <button className="toOrdersButtonB">No Orders</button>}
            </center>
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