import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

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
        groups: []
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
          neworders.push({name : order.text, category: "wip", bgcolor: "orange"})
          this.setState(
            { orders : neworders }
          )
        });
        console.log(this.state.orders, "OWOWOWOWOWOWOWO")
      }
    }
    render() {         
      var tasks = { wip: [], complete: [], klklk : [] }  
      console.log(this.state.orders, "CUEeEEEEEEE");        
      this.state.orders.map((t) => { 
        console.log(this.state.orders, "CURRENTLY ON ", t);
        tasks[t.category].push(<div key={t.name} onDragStart={(e)=>this.onDragStart(e, t.name)} draggable className="draggable" style={{backgroundColor: t.bgcolor}}> {t.name} </div>); 
      });
    return (
    //     <div className="HomePage">
    //       <h1>ASSIGN ORDER PAGE</h1>
    //         <Link to="/home">Back Home</Link>

    //         <div>
    //         {this.props.data.amounts ?
    //       <div>
    //         {this.props.data.amounts.map(amount =>
    //           <div>
    //             <table>
    //               <tbody>
    //                 <tr>
    //                   <td>
    //                     {amount.text}
    //                   </td>
    //                 </tr>
    //               </tbody>
    //             </table>
    //           </div>
    //             )}
    //       </div>
    //     : ""}
    //       </div>


    //     </div>
  <div className="container-drag">
    <h2 className="header">DRAG & DROP DEMO</h2>
    <table>
      <tr>
        <td>
        <div className="wip" onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>{this.onDrop(e, "wip")}}> <span className="task-header">WIP</span> {tasks.wip}</div>
        </td>
        <td>
        <div className="droppable" onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>this.onDrop(e, "complete")}> <span className="task-header">COMPLETED</span> {tasks.complete}  </div>  
        </td>
        <td>
        <div className="droppable" onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>this.onDrop(e, "klklk")}> <span className="task-header">KLKLK</span> {tasks.klklk}  </div>  
        </td>
      </tr>
      </table>            
  </div>
  );
  }
}
    
export default AssignOrders;