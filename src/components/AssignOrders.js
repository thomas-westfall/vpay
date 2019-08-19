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
        groups: {
          allorders: {
            name : "All Orders",
            theirOrders: [] 
          }, 
          trash: {
            name : "Trash",
            theirOrders: [] 
          }
        },
        people: [], //username at top of card
        peopletable:  <div className="people">People</div>,
        currentuser: {},
        username: "",
        errortext: ""
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
      var newGroup = this.state.groups;
      newGroup[this.props.loggeduser.username] = {
        name : this.props.loggeduser.username+"'s Orders",
        id : this.props.loggeduser.id,
        theirOrders : [],
        totalCost : 0
      }
      this.setState({
        groups : newGroup,
      })
      if(this.props.data.amounts){
        let neworders = [];
        await this.props.data.amounts.map((order)=> {
          console.log(order)
          neworders.push({name : order.text, category: "allorders", cost : order.data})
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
        console.log(res.data, "HERERERE");
        let newGroup = this.state.groups;
        newGroup[res.data.username] = {
          name : res.data.username+"'s Orders",
          id : res.data.id,
          theirOrders : [],
          totalCost : 0
        }
        this.setState({
          groups : newGroup,
          currentuser: res.data,
          errortext: ""
        })
    })
    .catch(err => {
        if(err.response.status == 404){
          this.setState({
            errortext: "User not found! Did you spell it correctly?"
          })
          
        }
    })
    }


    handleChangeUsername = (event) => {
      this.setState({username: event.target.value})
    }


    addUser = (event) => {
      console.log("adduser called! nice!")
    }

    render() {
      Object.keys(this.state.groups).map((keyName, i) => {
        var emptyOrders = []
        this.state.groups[keyName].theirOrders = emptyOrders;
        if(this.state.groups[keyName].totalCost != undefined){
          this.state.groups[keyName].totalCost = 0;
        }
      }
      )
      this.state.orders.map((t) => { 
        if(this.state.groups[t.category].totalCost != undefined){
          this.state.groups[t.category].totalCost += t.cost;
          console.log(typeof this.state.groups[t.category].totalCost, "AWOIDHAWOIDHAOIWDH")
        }
        this.state.groups[t.category].theirOrders.push(<div key={t.name} onDragStart={(e)=>this.onDragStart(e, t.name)} draggable className="draggable"> {t.name} Costs: {t.cost} </div>); 
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
        <div>{this.state.errortext}</div>
        </div>


    <div>
      {/* {Object.keys(tasks).map((keyName, i) => {
        console.log("KEY: ",i, " Object: ",tasks[keyName]);
      }
      )} */}
    </div>
    <div className="allTables">
    {Object.keys(this.state.groups).map((keyName, i) => (
      <div>
        {/* {console.log("INDEX: ",i, " GROUP NAME: ",this.state.groups[keyName], "WHATEVER KEY NAME IS: ",keyName)} */}
            <table className="droppable" onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>this.onDrop(e, keyName)}>
            <thead>
              <tr><td><h1 className="groupName">{this.state.groups[keyName].name}</h1></td></tr>
            </thead>
            <tbody>
              <tr></tr>
              {this.state.groups[keyName].theirOrders ?
              this.state.groups[keyName].theirOrders.map((eachOrder) => (
                <tr>
                  <td>
                    {eachOrder}
                  </td>
                </tr>
                )
              )
              :
              ""
              }
              {console.log(this.state.groups[keyName].totalCost," TOTAL COST SHOULD COME")}
              {this.state.groups[keyName].totalCost != undefined ? (
                <tr className ="totalBar">
                  <td>
                    Total: ${this.state.groups[keyName].totalCost.toFixed(2)}
                  </td>
                </tr>
                
              )
              :
              ""
              }
            </tbody>
          </table> 
        </div>
      )
      )}         
    </div>
    <div>
    </div>
  </div>
  );
  }
}
    
export default AssignOrders;