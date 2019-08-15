import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import {fetchUsersThunk} from "./store/utilities/users";
import {logInThunk, logOutThunk} from "./store/utilities/loggeduser";

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
  logIn =(user)=> {
    this.props.logIn(user);
  }
  logOut =()=> {
    this.props.logOut();
  }
  // addStudent = (student) => {
  //   this.props.addStudent(student);
  // }

  render() {
    const { isLoggedIn } = this.props;

    const HomeComponent = () => (<HomePage logOut={this.logOut} loggeduser={this.props.loggeduser} fetchReceiptData={this.props.fetchReceiptData} data={this.props.receiptdata}/>);
    const LoginComponent = () => (<LoginPage logIn={this.logIn} isLoggedIn={this.props.isLoggedIn}/>);
    const RegisterComponent = () => (<RegisterPage users={this.props.users}/>);
    const AssignOrdersComponent = () => (<AssignOrders data={this.props.receiptdata}/>);
    // const AllCampusesComponent = () => (<AllCampuses students={this.props.students} campuses={this.props.campuses} removeCampus={this.removeCampus} addCampus={this.addCampus} grabCampus={this.grabCampus}/>);
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={LoginComponent} />
          <Route exact path="/login" render={LoginComponent} />
          <Route exact path="/register" render={RegisterComponent} />
          {isLoggedIn && (
          <Switch>
            <Route exact path="/home" render={HomeComponent} />
            <Route exact path="/orders" render={AssignOrdersComponent} />
          </Switch>
          )}
          <Route component={LoginComponent} />
          {/* <Route exact path="/allcampuses" render={AllCampusesComponent}/> */}
        </Switch>
      </Router>
    )
  }
}

const mapState = (state) => {
  return {
    users: state.users,
    loggeduser: state.loggeduser,
    isLoggedIn: !!state.loggeduser.username,
    receiptdata: state.receiptdata

  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchAllUsers: () => dispatch(fetchUsersThunk()),
    logIn: (user) => dispatch(logInThunk(user)),
    logOut: () => dispatch(logOutThunk()),
    fetchReceiptData: (filename) => dispatch(fetchReceiptDataThunk(filename))
  }
}
export default connect(mapState, mapDispatch)(AppContainer);