import React from "react";

import { Link } from "react-router-dom";
//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDc2YjcyYmQ5ZDNiMTAwMTU1OWQ1MTAiLCJpYXQiOjE2MTgzOTI4NzV9.f_om8BFjAHhz5ldxFLmFxtRs9PYKFACOYjPjpuXQEXQ
class Home extends React.Component {
  state = { user: Object };

  render() {
    return (
      <div>
        <Link to="/signup">Sign UP</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/view">Tables</Link>
        <Link to="/query">Query</Link>
      </div>
    );
  }
}

export default Home;
