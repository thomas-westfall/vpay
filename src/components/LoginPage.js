import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class LoginPage extends Component {
    constructor(props) {
      super(props);
    }
    render() {
    return (
        <div className="HomePage">
          <h1>LOGIN PAGE</h1>
            <Link to="/home">Go Home</Link>
            <Link to="/register">Register</Link>
        </div>
    )
  }
  }
    
export default LoginPage;