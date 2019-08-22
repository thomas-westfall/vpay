import React, { Component } from 'react';
import './App.css';
import { Redirect, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import {registerUserThunk} from "./store/utilities/users";
import {logInThunk, logOutThunk, me} from "./store/utilities/loggeduser";
import {fetchReceiptDataThunk, resetReceiptDataThunk} from "./store/utilities/receiptdata";
import {fetchOrdersDataThunk, resetOrdersDataThunk} from "./store/utilities/orders";

//PAGE IMPORTS
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AssignOrders from './components/AssignOrders';
import AccessDenied from './components/AccessDenied';

class RoutesView extends Component {

  componentDidMount() {
    this.props.me();
  }

  // addStudent = (student) => {
  //   this.props.addStudent(student);
  // }

  render() {
    const { isLoggedIn } = this.props;
    console.log('RENDERING')
    const HomeComponent = () => (<HomePage orders={this.props.orders} me={this.props.me} logOut={this.props.logOut} loggeduser={this.props.loggeduser} fetchReceiptData={this.props.fetchReceiptData} resetReceiptData={this.props.resetReceiptData} fetchOrdersData={this.props.fetchOrdersData} resetOrdersData={this.props.resetOrdersData} data={this.props.receiptdata}/>);
    const LoginComponent = () => (<LoginPage logIn={this.props.logIn} isLoggedIn={this.props.isLoggedIn} error={this.props.error}/>);
    const RegisterComponent = () => (<RegisterPage users={this.props.users} registerUser={this.props.registerUser} registerError={this.props.registerError} registerSuccess={this.props.registerSuccess}/>);
    const AssignOrdersComponent = () => (<AssignOrders loggeduser={this.props.loggeduser} resetReceiptData={this.props.resetReceiptData} data={this.props.receiptdata}/>);
    const DeniedComponent = () => (<AccessDenied />)
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
          <Route component={DeniedComponent} />
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
    error: state.loggeduser.response,
    receiptdata: state.receiptdata,
    registerSuccess: state.users.success,
    registerError: state.users.response,
    isLoggedIn: !!state.loggeduser.id,
    orders: state.orders
  }
}

const mapDispatch = (dispatch) => {
  return {
    registerUser: (user) => dispatch(registerUserThunk(user)),
    logIn: (user) => dispatch(logInThunk(user)),
    logOut: () => dispatch(logOutThunk()),
    fetchReceiptData: (filename) => dispatch(fetchReceiptDataThunk(filename)),
    resetReceiptData: () => dispatch(resetReceiptDataThunk()),
    me: () => dispatch(me()),
    fetchOrdersData: (orders) => dispatch(fetchOrdersDataThunk(orders)),
    resetOrdersData: () => dispatch(resetOrdersDataThunk())
  }
}
export default connect(mapState, mapDispatch)(RoutesView);