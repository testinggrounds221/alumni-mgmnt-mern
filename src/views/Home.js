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
        <h1 className="cover-heading text-center display-3">
          Welcome To Cumulus Alumni Management System
        </h1>
        <div className="text-center mt-5">
          <Link to="/signup" className="btn btn-primary m-3 " role="button">
            Sign Up
          </Link>
          {localStorage.getItem("token") === null && (
            <Link
              to="/login"
              className="btn btn-outline-success m-3 "
              role="button"
            >
              Login
            </Link>
          )}
          {localStorage.getItem("token") !== null && (
            <React.Fragment>
              <Link
                to="/profile"
                className="btn btn-outline-secondary m-3 "
                role="button"
              >
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
              <p>
                Student ID - user: s1@alumni.com <br />
                pass : 123456
              </p>
              <p>
                College ID - user: cl1@alumni.com <br />
                pass : cl1123456
              </p>
              <p>
                Student ID - user: dir@alumni.com <br />
                pass : dir123456
              </p>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
