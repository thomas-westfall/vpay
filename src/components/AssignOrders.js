import React, { Component } from 'react';
import { Link,  withRouter } from 'react-router-dom';
import axios from 'axios';
// import { Alert } from 'reactstrap';
// import { UncontrolledAlert } from 'reactstrap';
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
          name: "All Orders",
          theirOrders: []
        },
        trash: {
          name: "Trash",
          theirOrders: []
        }
      },
      totalReceiptCost: 0,
      totalReceiptTax: 0,
      username: "",
      errortext: "",
      numberOrders: 0,
      tipPercentChange: 0,
      tipPercent: 0,
      confirm: false
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
    console.log(id, "look jjjjjj");
    let orders = this.state.orders.filter((order) => {
      console.log(order.orderid, id, "look");

      if (parseInt(order.orderid) === parseInt(id)) {
        order.category = cat;
      }
      return order;
    });
    this.setState({
      ...this.state,
      orders
    });
  }

  parse(text, freq, cost) {
    console.log(text, "The order has a frequency of", freq)
    let newcost = cost / freq;
    let step = 0;
    let neworders = this.state.orders;
    while (step < freq) {
      console.log("THE FREQUENCY IS: ", freq, " THE STEP IS: ", step)
      neworders.push({ name: text, category: "allorders", cost: newcost, orderid: this.state.numberOrders })
      this.state.numberOrders = this.state.numberOrders + 1;
      step = step + 1;
      console.log("THE FREQUENCY IS: ", freq, " THE STEP BECAME: ", step)
    }
    this.setState(neworders)
  }

  async componentDidMount() {
    if (this.props.data.totalAmount) {
      this.setState({
        totalReceiptCost: this.props.data.totalAmount.data,
        totalReceiptTax: this.props.data.taxAmount.data
      })
    }
    var newGroup = this.state.groups;
    newGroup[this.props.loggeduser.username] = {
      name: this.props.loggeduser.username + "'s Orders",
      id: this.props.loggeduser.id,
      theirOrders: [],
      totalCost: 0
    }
    this.setState({
      groups: newGroup,
    })
    if (this.props.data.amounts) {
      await this.props.data.amounts.map((order) => {
        console.log(order)
        if (order.text[0] <= '9' && order.text[0] >= '0') {
          let step = 1;
          while (order.text[step] <= '9' && order.text[step] >= '0') {
            step++;
          }
          let freq = order.text.substring(0, step);
          console.log(freq, "NEAT!");
          let freqint = parseInt(freq, 10);
          this.parse(order.text.substring(step, order.text.length - 1), freqint, order.data);
        }

        else {
          this.parse(order.text, 1, order.data);
        }
      });
    }
  }

  handleConfirm = (event) => {
    console.log("RUNNNNNING")
    this.setState({ confirm : true })
  }
  handleCancel = (event) => {
    this.setState({ confirm : false })
  }
  handleSubmit = async (event) => {
    await axios.get(`https://vpay-backend-auth.herokuapp.com/api/users/${this.state.username}`)

      .then(res => {
        console.log(res.data, "HERERERE");
        let newGroup = this.state.groups;
        newGroup[res.data.username] = {
          name: res.data.username + "'s Orders",
          id: res.data.id,
          theirOrders: [],
          totalCost: 0
        }
        this.setState({
          groups: newGroup,
          currentuser: res.data,
          errortext: ""
        })
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.setState({
            errortext: "User not found! Did you spell it correctly?"
          })

        }
      })
  }

  handleFinalize = async (event) => {
    await axios.post(`https://vpay-backend-auth.herokuapp.com/api/receipts`, {
      userId: this.props.loggeduser.id,
      totalPrice: parseInt(((((this.state.totalReceiptCost - this.state.totalReceiptTax) * (this.state.tipPercent / 100)) + (this.state.totalReceiptCost)).toFixed(2))),
      tipPercent: parseInt(this.state.tipPercent)
    })
      .then(res => {
        console.log(res);
        let newReceiptId = res.data;
        Object.keys(this.state.groups).map((keyName, i) => {
          if (this.state.groups[keyName].id === this.props.loggeduser.id) {
            this.state.groups[keyName].theirOrders.map(async (eachOrder) => {
              console.log("userId", this.state.groups[keyName].id,
                "receiptId", newReceiptId,
                "paid", true,
                "itemName", eachOrder.props.id,
                "price ", ((eachOrder.props.cost * (this.state.tipPercent / 100)) + eachOrder.props.cost + (eachOrder.props.cost * (this.state.totalReceiptTax / (this.state.totalReceiptCost - this.state.totalReceiptTax)
                ))))
              await axios.post(`https://vpay-backend-auth.herokuapp.com/api/orders`, {
                userId: this.state.groups[keyName].id,
                receiptId: newReceiptId,
                paid: true,
                itemName: eachOrder.props.id,
                price: parseFloat(((eachOrder.props.cost * (this.state.tipPercent / 100)) + eachOrder.props.cost + (eachOrder.props.cost * (this.state.totalReceiptTax / (this.state.totalReceiptCost - this.state.totalReceiptTax)))).toFixed(2))
              })
                .then(response => {
                  console.log(response, "WENT THROUGH SUCCESFULLLLLLLY")
                }
                )
                .catch(error => {
                  console.log(error.response)
                })
            })
          }
          else if ((this.state.groups[keyName].id)) {
            this.state.groups[keyName].theirOrders.map(async (eachOrder) => (
              await axios.post(`https://vpay-backend-auth.herokuapp.com/api/orders`, {
                userId: this.state.groups[keyName].id,
                receiptId: newReceiptId,
                paid: false,
                itemName: eachOrder.props.id,
                price: parseFloat(((eachOrder.props.cost * (this.state.tipPercent / 100)) + eachOrder.props.cost + (eachOrder.props.cost * (this.state.totalReceiptTax / (this.state.totalReceiptCost - this.state.totalReceiptTax)))).toFixed(2))
              })
                .then(response => {
                  console.log(response)
                }
                )
                .catch(error => {
                  console.log(error.response)
                })
            ))
          }
        }

        )
      })
      .catch(err => {
        console.log(err.response)
      })
      if(this.state.confirm) {
        this.props.history.push("/home");
      }
  }

  handleChangeUsername = (event) => {
    this.setState({ username: event.target.value })
  }
  handleChangeTip = (event) => {
    this.setState({ tipPercentChange: event.target.value })
  }
  handleTip = (event) => {
    event.preventDefault()
    this.setState({ tipPercent: this.state.tipPercentChange })
  }
  render() {
    Object.keys(this.state.groups).map((keyName, i) => {
      var emptyOrders = []
      this.state.groups[keyName].theirOrders = emptyOrders;
      if (this.state.groups[keyName].totalCost !== undefined) {
        this.state.groups[keyName].totalCost = 0;
      }
    }
    )
    this.state.orders.map((t) => {
      //console.log(t, "THIS IS WHY REACT IS REACT")
      if (this.state.groups[t.category].totalCost !== undefined) {
        this.state.groups[t.category].totalCost += t.cost;
        //console.log(typeof this.state.groups[t.category].totalCost, "AWOIDHAWOIDHAOIWDH")
      }
      this.state.groups[t.category].theirOrders.push(<div key={t.orderid} id={t.name} cost={t.cost} onDragStart={(e) => this.onDragStart(e, t.orderid)} draggable className="draggable">
        <table className="itemRow">
          <tbody >
            <tr >
              <td className="itemName">{t.name}</td>
              <td className="itemCost">${t.cost}</td>
            </tr>
          </tbody>
        </table>
      </div>);
    });
    return (
      // <div className="container-drag">
      //   <nav className="navbar navbar-fixed-top">
      //     <h1 className="header">Rearrange Your Orders</h1>
      // <button  className="finalize" onClick={this.handleFinalize}>Finalize</button> 
      // <Link className="btn btn-danger" to="/home">Cancel</Link>
      //   </nav>
      // <table className="topPageTable">
      //   <thead >
      //     <tr className="receiptHead">
      //       <td className="headText">Total Cost: {this.state.totalReceiptCost} +(${this.state.totalReceiptCost*((this.state.tipPercent)/100)} Tips)</td>
      //       <td className="headText">Current Tip Percent: {this.state.tipPercent}% </td>
      //     </tr>
      //   </thead>
      //   </table>
      //     <table>
      //     <tbody>
      //       <tr>
      //         <td className="leftBlock">
      // <tr >
      //   <td className="firstField"><label htmlFor="Username">Add User: </label></td><td className="firstField"><input type="text" className="Username" onChange={this.handleChangeUsername} /></td><td className="firstField"><button onClick={this.handleSubmit}>Add</button></td>
      // </tr>
      // <tr>
      //     <td colSpan={3}>{this.state.errortext}</td>
      // </tr>
      // <tr>
      //   <td className="firstField"><label htmlFor="Username">Tip Percent: </label></td><td className="firstField"><input type="number" className="Username" onChange={this.handleChangeTip} /></td><td className="firstField"><button onClick={this.handleTip}>Set</button> </td>
      // </tr>
      //           <tr>
      //             <td className="leftBot"></td>
      //           </tr>

      //         </td>
      //         <td>
      //         <div className="allTables">
      //           {Object.keys(this.state.groups).map((keyName, i) => (
      //             <div>
      //               {/* {console.log("INDEX: ",i, " GROUP NAME: ",this.state.groups[keyName], "WHATEVER KEY NAME IS: ",keyName)} */}
      //               <table className="droppable" onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e, keyName)}>
      //                 <thead>
      //                   <tr><td><h1 className="groupName">{this.state.groups[keyName].name}</h1></td></tr>
      //                 </thead>
      //                 <tbody>
      //                   <tr></tr>
      //                   {this.state.groups[keyName].theirOrders ?
      //                     this.state.groups[keyName].theirOrders.map((eachOrder) => (
      //                       <tr>
      //                         <td>
      //                           {eachOrder}
      //                         </td>
      //                       </tr>
      //                     )
      //                     )
      //                     :
      //                     ""
      //                   }
      //                   {/* {console.log(this.state.groups[keyName].totalCost," TOTAL COST SHOULD COME")} */}
      //                   {this.state.groups[keyName].totalCost !== undefined ? (
      //                     <tr className="totalBar">
      //                       <td>
      //                         Total: ${(this.state.groups[keyName].totalCost + ((this.state.groups[keyName].totalCost.toFixed(2) / (this.state.totalReceiptCost - this.state.totalReceiptTax)) * (this.state.totalReceiptTax))).toFixed(2)} (Tax: ${((this.state.groups[keyName].totalCost.toFixed(2) / (this.state.totalReceiptCost - this.state.totalReceiptTax)) * (this.state.totalReceiptTax)).toFixed(2)})
      //                 <br></br>
      //                         Total Tip: ${(this.state.groups[keyName].totalCost * (this.state.tipPercent / 100)).toFixed(2)}
      //                       </td>
      //                     </tr>
      //                   )
      //                     :
      //                     ""
      //                   }
      //                 </tbody>
      //               </table>
      //             </div>
      //           )
      //           )}
      //         </div>
      //       </td>
      //     </tr>
      //   </tbody>
      // </table>


      //   <div>
      //   </div>
      // </div>
      <div className="mainPage ">
        <nav className="navbar navbar-fixed-top">
          <h1 className="header">Rearrange Your Orders</h1>

          <div className="ml-auto">
            {this.state.confirm ? <div>Are you sure you want to finalize these orders? <button className="final" onClick={this.handleFinalize}>Yes</button><button className="finalno"onClick={this.handleCancel}>No</button></div> : (<div><button className="finalize btn btn-danger" onClick={this.handleConfirm}>Finalize</button><Link className="btn btn-danger" to="/home">Cancel</Link></div>)}
            
          </div>
        </nav>

        <div>
          <table className="topPageTable">
            <thead >
              <tr className="receiptHead">
                <td className="headText">Total Cost: {this.state.totalReceiptCost} +(${(this.state.totalReceiptCost * ((this.state.tipPercent) / 100)).toFixed(2)} Tips)</td>
                <td className="headText">Current Tip Percent: {this.state.tipPercent}% </td>
              </tr>
            </thead>
          </table>
        </div>

        <div className="botLeftCon d-flex flex-row">
          <div className="botLeftFunc d-flex flex-fill flex-column">
              <div className="align-self-center">
              <tr>
                <td className="firstField"><label htmlFor="Username">Add User: </label></td><td className="firstField"><input type="text" className="Username" onChange={this.handleChangeUsername} /></td><td className="firstField"><button onClick={this.handleSubmit}>Add</button></td>
              </tr>
              <tr>
                <td colSpan={3}>{this.state.errortext}</td>
              </tr>
              <tr>
                <td className="firstField"><label htmlFor="Username">Tip Percent: </label></td><td className="firstField"><input type="number" className="Username" onChange={this.handleChangeTip} /></td><td className="firstField"><button onClick={this.handleTip}>Set</button> </td>
              </tr>
              </div>

          </div>
          <div className="d-flex flex-fill flex-column">
            <div className="allTables flex-row d-flex">
              {Object.keys(this.state.groups).map((keyName, i) => (
                <div>
                  <table className="droppable" onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e, keyName)}>
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
                      {/* {console.log(this.state.groups[keyName].totalCost," TOTAL COST SHOULD COME")} */}
                      {this.state.groups[keyName].totalCost !== undefined ? (
                        <tr className="totalBar">
                          <td>
                            Total: ${(this.state.groups[keyName].totalCost + ((this.state.groups[keyName].totalCost.toFixed(2) / (this.state.totalReceiptCost - this.state.totalReceiptTax)) * (this.state.totalReceiptTax))).toFixed(2)} (Tax: ${((this.state.groups[keyName].totalCost.toFixed(2) / (this.state.totalReceiptCost - this.state.totalReceiptTax)) * (this.state.totalReceiptTax)).toFixed(2)})
                        <br></br>
                            Total Tip: ${(this.state.groups[keyName].totalCost * (this.state.tipPercent / 100)).toFixed(2)}
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
          </div>
        </div>
        <div>
          <table className="topPageTable">
            <thead >
              <tr className="receiptHead">
                <td className="headText">Number of Users: {Object.keys(this.state.groups).length-2}</td>
              </tr>
            </thead>
          </table>
        </div>
      </div >
    );
  }
}

export default withRouter(AssignOrders);