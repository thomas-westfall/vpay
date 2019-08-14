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
            <Link to="/">Go Home</Link>
        </div>
    )
  }
  }
    
export default AssignOrders;