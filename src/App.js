import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import {fetchUsersThunk} from "./store/utilities/users";
import {fetchReceiptDataThunk} from "./store/utilities/receiptdata"

//PAGE IMPORTS

import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AssignOrders from './components/AssignOrders';



class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  componentDidMount() {
    this.props.fetchAllUsers();
  }

  // addStudent = (student) => {
  //   this.props.addStudent(student);
  // }

  render() {
    const HomeComponent = () => (<HomePage fetchReceiptData={this.props.fetchReceiptData}/>);
    const LoginComponent = () => (<LoginPage/>);
    const RegisterComponent = () => (<RegisterPage users={this.props.users}/>);
    const AssignOrdersComponent = () => (<AssignOrders data={this.props.receiptdata}/>);
    // const AllCampusesComponent = () => (<AllCampuses students={this.props.students} campuses={this.props.campuses} removeCampus={this.removeCampus} addCampus={this.addCampus} grabCampus={this.grabCampus}/>);
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={LoginComponent} />
          <Route exact path="/login" render={LoginComponent} />
          <Route exact path="/home" render={HomeComponent} />
          <Route exact path="/register" render={RegisterComponent} />
          <Route exact path="/orders" render={AssignOrdersComponent} />
          {/* <Route exact path="/allcampuses" render={AllCampusesComponent}/> */}
        </Switch>
      </Router>
    )
  }
}

const mapState = (state) => {
  return {
    users: state.users,
    receiptdata: state.receiptdata
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchAllUsers: () => dispatch(fetchUsersThunk()),
    fetchReceiptData: (filename) => dispatch(fetchReceiptDataThunk(filename))
  }
}
export default connect(mapState, mapDispatch)(AppContainer);