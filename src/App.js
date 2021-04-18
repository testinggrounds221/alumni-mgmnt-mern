import "./App.css";
import React from "react";
import { Router, Route, Switch } from "react-router-dom";
//import { Signup } from "./components/SignUp";
import SignUp from "./views/SignUp";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Home from "./views/Home";
import TableView from "./views/TableView";

import history from "./history";

function App() {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/view" component={TableView} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
