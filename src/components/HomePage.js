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
    }

  }

  componentDidMount() {
    this.props.resetReceiptData();
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

  render() {
    return (
      <div className="container-fluid">

        <nav className="navbar navbar-fixed-top">
          <img className="logoImg" src={logo} alt="logo"/>
          <Link className="btn btn-danger" to='/' onClick={this.logout}>Log out</Link>
        </nav>

        <div className="row">
          <div className="colTL">
            <div className="TopRow">
              <h1>Upload file</h1>
            </div>
            {/* <div className="TopRowT">
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
            </center> */}
          </div>
            
          <div className="colTR">
            <div className="TopRow">
            <h1>Receipt History</h1>
              </div>
              <div className="TopRowTX">
              <div className="receiptHistory">
                <AllReceipts loggeduser={this.props.loggeduser} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="colBL">
            <div className="TopRow">
              <h1>Upload A Receipt</h1>
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
            <h1>Order History</h1>
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