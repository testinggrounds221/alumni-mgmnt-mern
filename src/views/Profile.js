import React from "react";
import server from "../api/alumni-mgmnt-backend";
import history from "../history";
//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDc2YjcyYmQ5ZDNiMTAwMTU1OWQ1MTAiLCJpYXQiOjE2MTgzOTI4NzV9.f_om8BFjAHhz5ldxFLmFxtRs9PYKFACOYjPjpuXQEXQ
class Profile extends React.Component {
  state = { user: Object };

  async componentDidMount() {
    if (localStorage.getItem("token") === null) {
      history.push("/login");
    }

    await server
      .get("/users/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        this.setState({ user: response.data });
        console.log(this.state.user);
      })
      .catch((er) => console.log(er));
  }

  onClickLogout() {
    localStorage.removeItem("token");
    history.push("/login");
  }

  render() {
    return (
      <div>
        <div className="card-body pt-0 pt-md-4">
          <div className="row">
            <div className="col"></div>
          </div>
          <div className="text-center">
            <h3>
              {this.state.user.firstName}
              <span className="font-weight-light">
                , {this.state.user.companyRole}
              </span>
            </h3>
            <div className="h5 font-weight-300">
              {this.state.user.passOutYear} Passed Out
            </div>
            <a
              href={`${this.state.user.linkedIn}`}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIN
            </a>
            <div className="h5 mt-4">
              Specialized In {this.state.user.specalization}
            </div>
            <div>
              {this.state.user.authenticated
                ? "Verified"
                : "Not Authenticated yet"}
            </div>
            <hr className="my-4" />
            <p>{this.state.user.permanent_address}</p>
            <button
              className="btn btn-danger"
              onClick={(e) => {
                e.preventDefault();
                this.onClickLogout();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
