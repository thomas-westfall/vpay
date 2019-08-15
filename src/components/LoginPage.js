import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class LoginPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        password: '',
        username: '',
      }
    }
    handleChangePassword = (event) => {
      this.setState({password: event.target.value})
    }
    handleChangeUsername = (event) => {
      this.setState({username: event.target.value})
    }
    handleSubmit = (submit) => {
      submit.preventDefault()
      const userToLog = {
        "username": this.state.username,
        "password": this.state.password,
      }
      this.props.logIn(userToLog)
    }
    render() {
    return (
        <div className="HomePage">
          <h1>LOGIN PAGE</h1>
            {this.props.isLoggedIn ? 
            <div>
              <p>Successfully Logged in!</p>
              <Link to ="/home">Go to Home</Link>
            </div>
            :
            <div>
            <Link to="/register">Register</Link>
              <div>
                <form onSubmit={this.handleSubmit} className="form">
                  <div>
                    <label htmlFor="Username">Username: </label>
                    <input type="text" className="Username" onChange={this.handleChangeUsername} />
                  </div>
                  <div>
                    <label htmlFor="Password">Password: </label>
                    <input type="password" className="Password" id="password" onChange={this.handleChangePassword}></input><input type="checkbox" onClick={this.showPass}></input>
                  </div>
                  <button>Login</button>
                </form>
              </div>
            </div>
            }

        </div>
    )
  }
  }
    
export default LoginPage;