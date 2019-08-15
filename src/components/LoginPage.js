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
    render() {
    return (
        <div className="HomePage">
          <h1>LOGIN PAGE</h1>
            <Link to="/home">Go Home</Link>
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
    )
  }
  }
    
export default LoginPage;