import React from "react";
import { Link } from "react-router-dom";
import history from "../history";

class UnauthorizedPage extends React.Component {
  onClickLogout() {
    localStorage.removeItem("token");
    history.push("/login");
  }
  render() {
    return (
      <div>
        <div className="container py-5">
          <div className="row">
            <div className="col-md-2 text-center"></div>
            <div className="col-md-10 text-center">
              <h3 className="display-2">Access Restricted</h3>
              <p className="lead">
                The resource you requested requires a clearence level which is
                different from your current user clearence level .
                <br />
                Log out and Login using an appropriate clearence level ID.
              </p>
              <Link to="/profile" className="btn btn-success m-3" role="button">
                My Profile
              </Link>
              <Link
                to="/login"
                className="btn btn-success m-3"
                role="button"
                //                onClick={this.onClickLogout}
              >
                Logout
              </Link>
              <Link to="/login" className="btn btn-success m-3" role="button">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UnauthorizedPage;
