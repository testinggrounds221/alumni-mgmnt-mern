import React from "react";
import server from "../api/alumni-mgmnt-backend";
import { Record } from "../components/Record";

import checkUser from "../authorization/checkUser";

//user - cl1@alumni.com
//pass - cl1123456

//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDc2YjcyYmQ5ZDNiMTAwMTU1OWQ1MTAiLCJpYXQiOjE2MTgzOTI4NzV9.f_om8BFjAHhz5ldxFLmFxtRs9PYKFACOYjPjpuXQEXQ
class TableView extends React.Component {
  state = { users: [] };

  constructor(props) {
    super(props);
    checkUser(1);
  }

  async componentDidMount() {
    console.log(this.props.location.clID);
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

  async onAuthProfileUser(userId, flag) {
    await server
      .patch("/users/authprofile", { userID: userId, flag: flag })
      .then(() =>
        console.log(`Changed Authentication of User ${userId} to ${flag}`)
      )
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <div className="p-5">
        <table className="p-5 table table-dark table-striped">
          <thead>
            <tr className="text-center">
              <th>Name</th>
              <th>Passed Out Year</th>
              <th>Department</th>

              <th>Authenticate</th>
              <th>Linked Profile</th>
              <th>Alumni Profile</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user) => {
              return (
                <Record
                  user={user}
                  key={user._id}
                  onSubmit={this.onAuthProfileUser}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableView;
