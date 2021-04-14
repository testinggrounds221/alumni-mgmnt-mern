import axios from "axios";

//const dev = "http://localhost:3000";
const prod = "https://alumni-mgmnt-backend.herokuapp.com";

export default axios.create({
  baseURL: prod,
});
