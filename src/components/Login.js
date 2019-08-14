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
            <Link to="/Home">Something</Link>
        </div>
    )
  }
  }
    
export default LoginPage;