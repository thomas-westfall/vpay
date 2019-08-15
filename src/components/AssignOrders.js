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

            <div>
            {this.props.data.amounts ?
          <div>
            {this.props.data.amounts.map(amount =>
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        {amount.text}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
                )}
          </div>
        : ""}
          </div>


        </div>
    )
  }
  }
    
export default AssignOrders;