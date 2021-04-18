import axios from "axios";

//const dev = "http://localhost:3000";
const prod = "https://alumni-mgmnt-backend.herokuapp.com";

export default axios.create({
  baseURL: prod,
  // headers: {
  //   Authorization:
  //     "Client-ID 2b98c1afb0aed3b3d94a1866bdc3ac013d21a0c86d236a0fee32355c331c0296",
  //},
});
