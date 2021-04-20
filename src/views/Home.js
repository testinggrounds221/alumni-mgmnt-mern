import React from "react";

import { Link } from "react-router-dom";
import history from "../history";

//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDc2YjcyYmQ5ZDNiMTAwMTU1OWQ1MTAiLCJpYXQiOjE2MTgzOTI4NzV9.f_om8BFjAHhz5ldxFLmFxtRs9PYKFACOYjPjpuXQEXQ
class Home extends React.Component {
  state = { user: Object };

  onClickLogout() {
    localStorage.removeItem("token");
    history.push("/login");
  }

  render() {
    return (
      <div>
        <Link to="/signup" className="btn btn-success m-3 " role="button">
          Sign Up
        </Link>
        {localStorage.getItem("token") === null && (
          <Link to="/login" className="btn btn-success m-3 " role="button">
            Login
          </Link>
        )}
        {localStorage.getItem("token") !== null && (
          <React.Fragment>
            <Link to="/profile" className="btn btn-success m-3 " role="button">
              My Profile
            </Link>
            <button
              className="btn btn-danger m-3"
              onClick={(e) => {
                e.preventDefault();
                this.onClickLogout();
              }}
            >
              Logout
            </button>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Home;
