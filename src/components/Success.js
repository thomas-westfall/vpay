import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './HomePage.css';
import axios from 'axios';

class Success extends Component {
    constructor(props) {
      super(props);
        this.state = {
          selectedFile: null,
        }
     
    }
    

    render() {
    return (
      <div className="Success">
        nice!
    </div>
    )
  }
  }
    
export default Success;