
import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Login from './component/Authentication/Login'
import Register from './component/Authentication/Register'
import UsersList from './component/UsersList'
import UserHome from './component/User/UserHome/UserHome'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react'
import Guest from './component/Guest/Guest';
import Aboutus from './component/Guest/Aboutus'
import Contactus from './component/Guest/ContactUs'
import { Component } from 'react';
import axios from 'axios'
import Navbar from './component/Navbar/Navbar';
import Home from './component/Home/Home';
import { decodeToken, useJwt } from "react-jwt";
import Upload from './component/User/UploadTransaction/Upload'
import Car from './component/User/CarRegistration/Car'
import Dog from './component/User/DogRegistration/Dog'
import Profile from './component/User/UserProfile/Profile'
import Guidelines from './component/User/Guidelines/Guide'
import Budget from './component/User/Budget/Budgetallocation'
import Reservation from './component/User/Reservation/Reserve'
import Events from './component/User/Upevents/Events'
import ContactAdmin from './component/User/ContactAdmin/Contact'
import Visitor from './component/Guest/VisitorForm'
import Thankyou from './component/Guest/Thankyou'
import Dashboard from './component/User/Admin/Dashboard'
import Chat from './component/User/ChatUser/Chat'
import AdminReservation from './component/User/Admin/Reservation';
import AdminAccounts from './component/User/Admin/Account/Accounts';
import PetAdmin from './component/User/Admin/Pet'
import AdminSuggestion from './component/User/Admin/Suggestions'
import AdminVisitor from './component/User/Admin/Visitor'
import AdminVehicle from './component/User/Admin/Vehicle'
import AdminTransaction from './component/User/Admin/Transaction/Transactions'
import 'bootstrap/dist/css/bootstrap.min.css';
export default class App extends Component {
  state = {};

  // componentDidMount() {
  //   const config = {
  //       headers: {
  //           Authorization: 'Bearer ' + localStorage.getItem('token'),
  //           'Content-Type': 'application/json',
  //           "Access-Control-Allow-Origin": "*",
  //           "Access-Control-Allow-Credentials": "true",
  //           "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,",
  //           "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  //       }
  //   };
  //   if(localStorage.getItem('token')){
  //     axios.get('getinfo', config).then(
  //       res => {
  //         this.setUser(res.data);
  //         localStorage.setItem('profile', res.data);
  //         console.log(res.data.decodedtoken);
  //       },
  //       err => {
  //         console.log(err);
  //       }
  //     )
  //   }
  // }

  setUser = user => {
    this.setState({
      user: user
    })
  }
  render() {
    return (
      <Router>
        <Navbar user={this.state.user} setUser={this.setUser} />
        <Switch>
          <Route path='/' exact component={() => <Home user={this.state.user} />} />
          <Route path='/Guest' exact component={Guest} />
          <Route path='/Login' exact component={() => <Login setUser={this.setUser} />} />
          <Route path='/Register' exact component={Register} />
          <Route path='/UserHome' exact component={UserHome} />
          <Route path='/About-Us' exact component={Aboutus} />
          <Route path='/Contact-Us' exact component={Contactus} />
          <Route path='/UploadTransaction' exact component={Upload} />
          <Route path='/CarRegistration' exact component={Car} />
          <Route path='/DogRegistration' exact component={Dog} />
          <Route path='/Profile' exact component={Profile} />
          <Route path='/Guidelines' exact component={Guidelines} />
          <Route path='/Budget' exact component={Budget} />
          <Route path='/Reservation' exact component={Reservation} />
          <Route path='/Events' exact component={Events} />
          <Route path='/ContactAdmin' exact component={ContactAdmin} />
          <Route path='/Visitor' exact component={Visitor} />
          <Route path='/Thankyou' exact component={Thankyou} />
          <Route path='/Messages' exact component={Chat} />

          <Route path ='/Dashboard/AdminTransaction' exact component={AdminTransaction}/>
          <Route path='/Dashboard' exact component={Dashboard} />
          <Route path='/Dashboard/Reservation' exact component={AdminReservation} />
          <Route path='/Dashboard/Accounts' exact component={AdminAccounts} />
          <Route path='/Dashboard/Pet' exact component={PetAdmin} />
          <Route path='/Dashboard/Suggestion' exact component={AdminSuggestion} />
          <Route path='/Dashboard/Visitor' exact component={AdminVisitor} />
          <Route path='/Dashboard/Vehicle' exact component={AdminVehicle} />
        </Switch>
      </Router>
    )
  }
}


