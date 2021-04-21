import React from "react";
import server from "../api/alumni-mgmnt-backend";
import history from "../history";
import { Link } from "react-router-dom";
//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDc2YjcyYmQ5ZDNiMTAwMTU1OWQ1MTAiLCJpYXQiOjE2MTgzOTI4NzV9.f_om8BFjAHhz5ldxFLmFxtRs9PYKFACOYjPjpuXQEXQ
class Profile extends React.Component {
  state = { user: Object };

  async componentDidMount() {
    if (localStorage.getItem("token") === null) {
      history.push("/unauth");
    }

    await server
      .get("/users/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        this.setState({ user: response.data });
        //console.log(this.state.user);
      })
      .catch((er) => {
        console.log(er);
        localStorage.removeItem("token");
        history.push("/login");
      });
  }

  onClickLogout() {
    localStorage.removeItem("token");
    history.push("/login");
  }
  myFunction() {
    /* Get the text field */
    var copyText = document.getElementById("myInput");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    //alert("Copied the text: " + copyText.value);
  }

  collegeProfile() {
    const newTo = {
      pathname: "/view",
      clID: this.state.user.collegeId,
    };
    const toQuery = {
      pathname: "/query",
      clID: this.state.user.collegeId,
    };

    return (
      <div className="card-body pt-0 pt-md-4">
        <div className="row">
          <div className="col"></div>
        </div>
        <div className="text-center">
          <h3>
            {this.state.user.firstName}
            <span className="font-weight-light"></span>
          </h3>
          <div className="h5 font-weight-300">
            Founded On {this.state.user.passOutYear}
          </div>
          <a
            href={`${this.state.user.linkedIn}`}
            target="_blank"
            rel="noreferrer"
          >
            Home Page
          </a>
          <div className="h5 mt-4"></div>

          <hr className="my-4" />
          <Link to={newTo} className="btn btn-outline-success m-3" role="button">
            All Students
          </Link>
          <Link to={toQuery} className="btn btn-outline-success m-3" role="button">
            Query Students
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
      </div>
    );
  }

  studentProfile() {
    const toMyPeers = {
      pathname: "/mypeers",
      clID: this.state.user.collegeId,
    };
    return (
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
          <p className="lead">Click To Copy your Public URL</p>
          <input
            readonly
            value={`https://alumnimgmnt.netlify.app/publicprofile/${this.state.user._id}`}
            className="mx-auto form-control my-5 text-center"
            style={{ width: "600px" }}
            onClick={this.myFunction}
            id="myInput"
          ></input>
          <button
            className="btn btn-danger"
            onClick={(e) => {
              e.preventDefault();
              this.onClickLogout();
            }}
          >
            Logout
          </button>
          <Link to={toMyPeers} className="btn btn-success m-3" role="button">
            My Peers
          </Link>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.user.userType === 2 && this.studentProfile()}
        {this.state.user.userType !== 2 && this.collegeProfile()}
      </div>
    );
  }
}

export default Profile;
