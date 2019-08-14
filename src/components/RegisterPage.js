import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: '',
        lastName: '',
        password: '',
        username: '',
        phonenumber: NaN,
        email: '',
      }
    }
    showPass(){
      var x = document.getElementById("password");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    }
    render() {
    return (
        <div className="Register">
          <h1>REGISTER PAGE</h1>
            <Link to="/">Back</Link>
            <form onSubmit={this.handleSubmit} className="form">
              <div>
                <label htmlFor="Username">Username: </label>
                <input type="text" className="Username" onChange={this.handleChangeName} />
              </div>
              <div>
                <label htmlFor="Password">Password: </label>
                <input type="password" className="Password" id="password" onChange={this.handleChangeAddress}></input><input type="checkbox" onClick={this.showPass}></input>
              </div>
              <div>
                <label htmlFor="FirstName">First Name: </label>
                <input type="text" name="campusName" onChange={this.handleChangeName} />
              </div>
              <div>
                <label htmlFor="campusAddress">Last Name: </label>
                <input type="text" name="campusAddress" onChange={this.handleChangeAddress} />
              </div>
              <div>
                <label htmlFor="campusName">Phonenumber: </label>
                <input type="text" name="campusName" onChange={this.handleChangeName} />
              </div>
              <div>
                <label htmlFor="campusAddress">Email: </label>
                <input type="text" name="campusAddress" onChange={this.handleChangeAddress} />
              </div>
              <button>Add Campus</button>
            </form>
        </div>
    )
  }
  }
    
export default Register;