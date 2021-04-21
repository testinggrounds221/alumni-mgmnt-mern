import React from "react";
import { Link } from "react-router-dom";
import history from "../history";
class Header extends React.Component {
  onClickLogout() {
    localStorage.removeItem("token");
    history.push("/login");
  }
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link class="navbar-brand" to="/">
          Cumulus Alumni Management System
        </Link>

        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link to="/" className="nav-link " role="button">
                Home
              </Link>
            </li>
          </ul>
          <span class="nav-link active text-white">
            <Link to="/profile" role="button" className="text-white">
              My Profile
            </Link>
          </span>
          <span
            className="btn btn-danger mx-3"
            role="button"
            onClick={(e) => {
              e.preventDefault();
              this.onClickLogout();
            }}
          >
            Logout
          </span>
        </div>
      </nav>
    );
  }
}

export default Header;
