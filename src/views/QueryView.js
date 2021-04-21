import React from "react";
import server from "../api/alumni-mgmnt-backend";
import { Record } from "../components/Record";
import CustomSelect from "../components/CustomSelect";

//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDc2YjcyYmQ5ZDNiMTAwMTU1OWQ1MTAiLCJpYXQiOjE2MTgzOTI4NzV9.f_om8BFjAHhz5ldxFLmFxtRs9PYKFACOYjPjpuXQEXQ
class QueryView extends React.Component {
  state = { users: [] };

  async componentDidMount() {}

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

  async onQuerySubmit() {
    this.filterValue = document.getElementById("filInput").value;
    this.sortOrder = document.getElementById("srtOrder").checked ? 1 : -1;

    let filterByTxt = this.filterBy ? this.filterBy.value : null;
    let sortByTxt = this.sortBy ? this.sortBy.value : null;

    console.log(this.filterValue);
    console.log(this.sortOrder);
    await server
      .post("/users/filtersort", {
        filterBy: filterByTxt,
        filterValue: this.filterValue,
        sortBy: sortByTxt,
        sortOrder: this.sortOrder,
        showCollege: this.props.location.clID,
      })
      .then((response) => {
        this.setState({ users: response.data });
        console.log(this.state.users);
      })
      .catch((er) => console.log(er));
  }

  filterBar() {
    const filterByOptions = [
      { value: "firstName", label: "Name" },
      { value: "passOutYear", label: "Year Passed Out" },
      { value: "email", label: "Email" },
      { value: "companyName", label: "Company" },
    ];

    return (
      <div>
        <div>
          <div className="row g-2">
            <div className="col-6">
              <div className="m-3">
                <CustomSelect
                  className="input"
                  onChange={(value) => (this.filterBy = value)}
                  value={this.filterBy}
                  options={filterByOptions}
                  label="FilterBy :"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="p-3">
                Filter Value:
                <input
                  name="filerValue"
                  id="filInput"
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="p-3 ">
                <CustomSelect
                  className="input"
                  onChange={(value) => (this.sortBy = value)}
                  value={this.sortBy}
                  options={filterByOptions}
                  label="Sort By"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="p-3 mt-4">
                Sort Order:
                <input
                  type="checkbox"
                  id="srtOrder"
                  name="vehicle1"
                  value="Bike"
                  className="ml-3"
                ></input>
                <label htmlFor="srtOrder" className="ml-1">
                  Ascending
                </label>
              </div>
            </div>
          </div>
        </div>

        <br></br>
        <div className="mx-auto my-3" style={{ width: "200px" }}>
          <button
            className="btn btn-success"
            onClick={(e) => {
              e.preventDefault();
              this.onQuerySubmit();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.filterBar()}

        <table className="m-5 p-5 table table-dark table-striped">
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
        {this.state.users.length === 0 && (
          <p className="text-center">No Results Matching The Query</p>
        )}
      </div>
    );
  }
}

export default QueryView;
