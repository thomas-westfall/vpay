import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class AssignOrders extends Component {
    constructor(props) {
      super(props);
    }
    render() {
    return (
        <div className="HomePage">
          <h1>ASSIGN ORDER PAGE</h1>
            <Link to="/home">Back Home</Link>
        </div>
    )
  }
  }
    
export default AssignOrders;