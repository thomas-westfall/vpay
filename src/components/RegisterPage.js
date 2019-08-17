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
        <div>
                  <form onSubmit={this.handleSubmit} className="form">
          <table className='registerTable'>
            <thead>
              <tr><td colSpan={2}><h1 className="registerTitle">Sign Up</h1></td></tr>
            </thead>
            <tbody >
              <tr><td className="TextField">Username:</td><td><input type="text" className="Username" onChange={this.handleChangeUsername} /></td></tr>
              <tr><td className="TextField">Password:</td><td><input type="password" className="Password" id="password" onChange={this.handleChangePassword}></input></td></tr>
              <tr><td colSpan={2} className="showPassword"><input type="checkbox" className="showPassCheck"id='show-password' onClick={this.showPass}></input><label for='show-password'>Show Password</label></td></tr>
              <tr><td className="TextField">First Name:</td><td><input type="text" className="firstName" onChange={this.handleChangeFirstName} /></td></tr>
              <tr><td className="TextField">Last Name:</td><td><input type="text" className="lastName"  onChange={this.handleChangeLastName}></input></td></tr>
              <tr><td className="TextField">Phone Number:</td><td><input type="number" className="phoneNumber" onChange={this.handleChangePhone} /></td></tr>
              <tr><td className="TextField">Email:</td><td><input type="text" className="email"  onChange={this.handleChangeEmail}></input></td></tr>
              <tr><td>{this.props.registerError ? this.props.registerError.data : ""}{this.props.registerSuccess ? this.props.registerSuccess : ""}</td></tr>
              <tr><td colSpan={2}><button className="RegisterButton">Login</button></td></tr>
            </tbody>
          </table>
        </form>
        </div>
    )
  }
  }
    
export default Register;