import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './HomePage.css';
import axios from 'axios';

// const paypal = require('paypal-rest-sdk');
// var express = require('express')
// var app = express()

// paypal.configure({
//   'mode': 'sandbox',
//   'client_id': 'AYc_WD_FqZRhsF9vpUmXank8pwsAMS9Xjz3y89LeJ3kXQ_f5jumCjCIKnvYafaGZ0QOHYVs9GeY-M7cF',
//   'client_secret': 'EMH6VI34GAwYTfH1ad5wiAU1Wf2_oZBWNYaSuqBy0IMA_tM9Xo8aSbK4mgETbHE1Pg8GLV4PACE5b35m'
// })

class HomePage extends Component {
    constructor(props) {
      super(props);
        this.state = {
          selectedFile: null,
          amount: 100,
          email: "sb-uvsaw97577@personal.example.com" //password: EQWNpvYw
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
      <div className="HomePage">
        <h1 className="topBar">Welcome back to vPay, {this.props.loggeduser.firstName} {this.props.loggeduser.lastName}</h1>
        <Link className="logOutButton" to="/" onClick={()=>this.props.logOut()}>Log out</Link>
        
        <div className="container">
            <div className="row">
            <div className="col-md-6">
                <form method="post" action="#" id="#">
                <div className="form-group files">
                  <label>Upload Your File </label>
                  <input type="file" className="form-control" name="file"  onChange={this.onChangeHandler} multiple=""></input>
                </div>
              </form>
              <div><button type="button" className="uploadButton" onClick={()=>this.props.fetchReceiptData(this.state.selectedFile)}>Upload</button>{this.props.data.amounts ?
            <Link  to="/orders"><button className="toOrdersButtonS" >Proceed</button></Link>
            : <button className="toOrdersButtonB">No Orders</button>}</div>
            </div>
          </div>
        </div>

    <div>
      {console.log(this.props)}
      <form action={"/pay/" + this.state.amount + "/" + this.props.loggeduser.email} method="post">
        <input type="submit" value="Paydawdawd"></input>
      </form>

    </div>
    </div>
    )
  }
  }
    
export default HomePage;