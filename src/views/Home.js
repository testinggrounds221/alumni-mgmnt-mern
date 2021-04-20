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
        <Link to="/profile" className="btn btn-success m-3 " role="button">
          My Profile
        </Link>
        <Link to="/signup" className="btn btn-success m-3 " role="button">
          Sign Up
        </Link>
        <Link to="/login" className="btn btn-success m-3 " role="button">
          Login
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
      </div>
    );
  }
}

export default Home;
