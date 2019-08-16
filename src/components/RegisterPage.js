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
        phoneNumber: NaN,
        email: '',
      }
    }
    showPass(){
      var pass = document.getElementById("password");
      if (pass.type === "password") {
        pass.type = "text";
      } else {
        pass.type = "password";
      }
    }
    handleChangeFirstName = (event) => {
      this.setState({firstName: event.target.value})
    }
    handleChangeLastName = (event) => {
      this.setState({lastName: event.target.value})
    }
    handleChangePassword = (event) => {
      this.setState({password: event.target.value})
    }
    handleChangeUsername = (event) => {
      this.setState({username: event.target.value})
    }
    handleChangePhone = (event) => {
      this.setState({phoneNumber: event.target.value})
    }
    handleChangeEmail = (event) => {
      this.setState({email: event.target.value})
    }
    handleSubmit = (submit) => {
      submit.preventDefault()
      const newUser = {
        "firstName": this.state.firstName,
        "lastName": this.state.lastName,
        "password": this.state.password,
        "username": this.state.username,
        "phoneNumber": this.state.phoneNumber,
        "email": this.state.email,
      } 
      this.props.registerUser(newUser);
    }
    render() {
    return (
        <div >
          <h1>REGISTER PAGE</h1>
            <Link to="/">Back</Link>
            <form onSubmit={this.handleSubmit} className="form">
              <div>
                <label htmlFor="Username">Username: </label>
                <input type="text" className="Username" onChange={this.handleChangeUsername} />
              </div>
              <div>
                <label htmlFor="Password">Password: </label>
                <input type="password" className="Password" id="password" onChange={this.handleChangePassword}></input><input type="checkbox" onClick={this.showPass}></input>
              </div>
              <div>
                <label htmlFor="FirstName">First Name: </label>
                <input type="text" name="firstName" onChange={this.handleChangeFirstName} />
              </div>
              <div>
                <label htmlFor="LastName">Last Name: </label>
                <input type="text" name="lastName" onChange={this.handleChangeLastName} />
              </div>
              <div>
                <label htmlFor="phone">Phone Number: </label>
                <input type="number" name="phone" onChange={this.handleChangePhone} />
              </div>
              <div>
                <label htmlFor="Email">Email: </label>
                <input type="text" name="email" onChange={this.handleChangeEmail} />
              </div>
              {this.props.registerError ? this.props.registerError.data : ""}
              {this.props.registerSuccess ? this.props.registerSuccess : ""}
              <button>Register</button>

            </form>
        </div>
    )
  }
  }
    
export default Register;