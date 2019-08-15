import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './HomePage.css'
import axios from 'axios';

class HomePage extends Component {
    constructor(props) {
      super(props);
        this.state = {
          selectedFile: null
        }
     
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
        <h1>HOME PAGE</h1>
        <Link to="/" onClick={()=>this.props.logOut()}>Log out</Link>
        <div class="container">
            <div class="row">
  
            <div class="col-md-6">
                <form method="post" action="#" id="#">
                <div class="form-group files">
                  <label>Upload Your File </label>
                  <input type="file" class="form-control" name="file"  onChange={this.onChangeHandler} multiple=""></input>
                </div>
              </form>
              <button type="button" class="btn btn-success btn-block" onClick={()=>this.props.fetchReceiptData(this.state.selectedFile)}>Upload</button> 
            </div>

            {this.props.data.amounts ?
          <div>
            <br></br>
            <Link class="btn btn-success btn-block" to="/orders">Go Orders</Link>
          </div>
            : ''}
          </div>
        </div>
    </div>
    )
  }
  }
    
export default HomePage;