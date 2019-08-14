import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
      super(props);
    }
    render() {
    return (
        <div className="Register">
            <Link to="/">Login Page</Link>
        </div>
    )
  }
  }
    
export default Register;