import "./App.css";
import React from "react";
import { Router, Route, Switch } from "react-router-dom";
//import { Signup } from "./components/SignUp";
import SignUp from "./views/SignUp";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Home from "./views/Home";
import TableView from "./views/TableView";
import QueryView from "./views/QueryView";
import Header from "./components/Header";
import UnauthorizedPage from "./views/UnauthorizedPage";
import PublicProfile from "./views/PublicProfile";
import Peers from "./views/Peers";

//import { Link } from "react-router-dom";
import history from "./history";

function App() {
  return (
    <Router history={history}>
      <Header />
      <div className="min-vh-100" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="ui container">
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/view" component={TableView} />
            <Route path="/query" component={QueryView} />
            <Route path="/unauth" component={UnauthorizedPage} />
            <Route path="/publicprofile/:id" component={PublicProfile} />
            <Route path="/mypeers" component={Peers} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
