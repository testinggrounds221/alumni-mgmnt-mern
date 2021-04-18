import React from "react";
import server from "../api/alumni-mgmnt-backend";
import { Record } from "../components/Record";

//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDc2YjcyYmQ5ZDNiMTAwMTU1OWQ1MTAiLCJpYXQiOjE2MTgzOTI4NzV9.f_om8BFjAHhz5ldxFLmFxtRs9PYKFACOYjPjpuXQEXQ
class TableView extends React.Component {
  state = { users: [] };

  async componentDidMount() {
    await server
      .get("/users/all", {
        // headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        this.setState({ users: response.data });
        console.log(this.state.users);
      })
      .catch((er) => console.log(er));
  }

  async onAuthProfileUser(userId, flag) {
    console.log(userId);
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
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Passed Out Year</th>
              <th>Department</th>

              <th>Authenticate</th>
              <th>Linked Profile</th>
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
