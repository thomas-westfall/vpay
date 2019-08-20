import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './HomePage.css';
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

          <OrdersOwedContainer loggeduser={this.props.loggeduser} />
          
        </div>

    </div>
    )
  }
  }
    
export default HomePage;