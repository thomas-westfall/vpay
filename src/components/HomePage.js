import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './HomePage.css';
import AllReceipts from './AllReceipts'
import OrdersOwedContainer from './OrdersOwedContainer';

class HomePage extends Component {
    constructor(props) {
      super(props);
        this.state = {
          selectedFile: null,
        }
     
    }
    
    componentDidMount(){
      this.props.resetReceiptData();
    }
    onChangeHandler=event=>{
      this.setState({
        selectedFile: event.target.files[0]
      })
      console.log(event.target.files[0])
  
    }

    render() {
    return (
      <div className="container-fluid">

        <nav className="navbar navbar-fixed-top">
          <p class="navbar-brand">vPay</p>
          <h1>Welcome back {this.props.loggeduser.firstName} {this.props.loggeduser.lastName}</h1>
          <Link className="btn btn-danger" to="/" onClick={()=>this.props.logOut()}>Log out</Link>
        </nav>

        <div className="row">
          <div className="col">
            
            <div className="row">
              <h1>Upload file</h1>
            </div>
            <div className="row">
              <form method="post" action="#" id="#" className="upload-form">
                <div className="form-group files">
                  <input type="file" className="form-control" name="file"  onChange={this.onChangeHandler} multiple="" />
                </div>
              </form>
            </div>

            <div className="col">

            <center>
            <button type="button" className="btn btn-success" onClick={()=>this.props.fetchReceiptData(this.state.selectedFile)}>Upload</button>
              {this.props.data.amounts ? 
              <Link  to="/orders">
              <button className="btn btn-primary">Proceed</button></Link> : 
              <button className="btn btn-secondary">No Orders</button>}
            </center>
            
            </div>            
          </div>




          <div className="col">
            <div className="row">
              <div className="receiptHistory">
                <AllReceipts loggeduser={this.props.loggeduser}/>
              </div>
            </div>
          </div>

        </div>
             
        <div className="row">
          <OrdersOwedContainer loggeduser={this.props.loggeduser} />
        </div>
        

    </div>
    )
  }
  }
    
export default HomePage;