import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import {fetchUsersThunk} from "./store/utilities/users";

//PAGE IMPORTS

import HomePage from './components/HomePage';

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
    const HomeComponent = () => (<HomePage/>);
    // const AllCampusesComponent = () => (<AllCampuses students={this.props.students} campuses={this.props.campuses} removeCampus={this.removeCampus} addCampus={this.addCampus} grabCampus={this.grabCampus}/>);
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={HomeComponent} />
          {/* <Route exact path="/allcampuses" render={AllCampusesComponent}/> */}
        </Switch>
      </Router>
    )
  }
}

const mapState = (state) => {
  return {
    users: state.users,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchAllUsers: () => dispatch(fetchUsersThunk())
  }
}
export default connect(mapState, mapDispatch)(AppContainer);