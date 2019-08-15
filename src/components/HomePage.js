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
  
  onClickHandler = () => {
    const data = new FormData() 
    data.append('file', this.state.selectedFile)
    
    axios.post("https://api.taggun.io/api/receipt/v1/verbose/file", data, { // receive two parameter endpoint url ,form data 
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json",
        "apikey": "e6d1b110bdf511e98bfadfb7eb1aa8b5"
      }
    })
  .then(res => { // then print response status
    console.log(res.data)
  })
  
  }
  
    render() {
    return (
      <div className="HomePage">
        <h1>HOME PAGE</h1>
        <Link to="/">Log out</Link>
        <div class="container">
            <div class="row">
  
            <div class="col-md-6">
                <form method="post" action="#" id="#">
                <div class="form-group files">
                  <label>Upload Your File </label>
                  <input type="file" class="form-control" name="file"  onChange={this.onChangeHandler} multiple=""></input>
                </div>
              </form>
              <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button> 
            </div>
            <Link to="/orders">Go Orders</Link>
          </div>
        </div>
    </div>
    )
  }
  }
    
export default HomePage;