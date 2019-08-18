import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Alert } from 'reactstrap';
import { UncontrolledAlert } from 'reactstrap';
import './AssignOrders.css'

class AssignOrders extends Component { 
    // state = {
    //   orders: [
    //       // {name:"Learn Angular",category:"wip", bgcolor: "yellow"},
    //       // {name:"React", category:"wip", bgcolor:"pink"},
    //       // {name:"Vue", category:"complete", bgcolor:"skyblue"}
    //     ]
    // }
    constructor(props) {
      super(props);
      this.state = {
        orders: [],
        groups: [],
        people: [], //username at top of card
        peopletable:  <div className="people">People</div>,
        currentuser: {},
        username: ""
    }
      
    }
    onDragOver = (e) => {
      e.preventDefault();
    }
    onDragStart = (ev, id) => {
      console.log('dragstart: ', id);
      ev.dataTransfer.setData("id", id);
    }
    onDrop = (ev, cat) => {         
      let id = ev.dataTransfer.getData("id");  
      let orders = this.state.orders.filter((order) => {      
        if (order.name == id) {               
          order.category = cat;                 }                     
          return order;          
        });           
        this.setState({                 
          ...this.state,                 
          orders         
        });    
    }
    async componentDidMount(){
      if(this.props.data.amounts){
        let neworders = [];
        await this.props.data.amounts.map((order)=> {
          neworders.push({name : order.text, category: "allorders"})
          this.setState(
            { orders : neworders }
          )
        });
        //console.log(this.state.orders, "OWOWOWOWOWOWOWO")
      }
    }


    handleSubmit = async (event) =>{
      await axios.get(`https://vpay-heroku.herokuapp.com/api/users/${this.state.username}`)

    .then(res => {
        console.log(res);
        this.setState({
          currentuser: res.data
        })
    })
    .catch(err => {
        console.log(err.response,"SOWEKNOW")
        
    })
    }


    handleChangeUsername = (event) => {
      this.setState({username: event.target.value})
    }


    addUser = (event) => {
      console.log("adduser called! nice!")
    }

    render() {         
      var tasks = { allorders: [], trash: [], userorder : [] }  
      //console.log(this.state.orders, "CUEeEEEEEEE");        
      this.state.orders.map((t) => { 
        //console.log(this.state.orders, "CURRENTLY ON ", t);
        tasks[t.category].push(<div key={t.name} onDragStart={(e)=>this.onDragStart(e, t.name)} draggable className="draggable"> {t.name} </div>); 
      });
    return (

  <div className="container-drag">
    <h2 className="header">Rearrange Orders</h2>
    <Link to="/home">Cancel</Link>

    <div>
          <h2>Add user by username:</h2>
          <label htmlFor="Username">Username: </label>
          <input type="text" className="Username" onChange={this.handleChangeUsername} />

        <button onClick={this.handleSubmit}>Add</button>
        </div>



    <div className="allTables">
      <table className="droppable" onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>this.onDrop(e, "allorders")}>
        <thead>
          <h1 className="groupName">All Orders</h1>
        </thead>
        <tbody>
          <tr>
            <td>
              <div> {tasks.allorders}  </div>  
            </td>
          </tr>
        </tbody>
      </table> 
      <table className="droppable" onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>this.onDrop(e, "trash")}>
        <thead>
          <h1 className="groupName">Trash</h1>
        </thead>
        <tbody>
          <tr>
            <td>
              <div> {tasks.trash}  </div>  
            </td>
          </tr>
        </tbody>
      </table> 
      <table className="droppable" onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>this.onDrop(e, "userorder")}>
        <thead>
          <h1 className="groupName">User Order</h1>
        </thead>
        <tbody>
          <tr>
            <td>
              <div> {tasks.userorder}  </div>  
            </td>
          </tr>
        </tbody>
      </table>           
    </div> 
  </div>
  );
  }
}
    
export default AssignOrders;