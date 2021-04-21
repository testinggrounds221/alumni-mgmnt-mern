import React from "react";
import server from "../api/alumni-mgmnt-backend";

//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDc2YjcyYmQ5ZDNiMTAwMTU1OWQ1MTAiLCJpYXQiOjE2MTgzOTI4NzV9.f_om8BFjAHhz5ldxFLmFxtRs9PYKFACOYjPjpuXQEXQ
class Peers extends React.Component {
  state = { users: [] };
  async componentDidMount() {
    await server
      .post("/users/onlyauthcollege", {
        collegeId: this.props.location.clID,
      })
      .then((response) => {
        this.setState({ users: response.data });
        //console.log(this.state.users);
      })
      .catch((er) => console.log(er));
  }
  render() {
    const deptOptions = ["", "IT", "CS", "Mech", "Civil"];

    return (
      <div className="row">
        {this.state.users.map((user) => {
          return (
            <div class="col-sm-4">
              <div className="card m-4 bg-dark text-white" style={{ width: "20rem" }}>
                <div className="card-body text-center">
                  <h5 className="card-title">{user.firstName}</h5>
                  <p className="card-text">
                    Passed out on {user.passOutYear} from{" "}
                    {deptOptions[parseInt(user.departmentId[1])]} department,{" "}
                    {user.firstName} is a {user.companyRole} in{" "}
                    {user.companyName}
                  </p>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://alumnimgmnt.netlify.app/publicprofile/${user._id}`}
                    className="btn btn-primary"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Peers;
