import history from "../history";
import server from "../api/alumni-mgmnt-backend";

const checkUser = async (allowedUserType) => {
  if (localStorage.getItem("token") === null) {
    history.push("/login");
  }
  await server
    .get("/users/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((response) => {
      //console.log(response.data);
      let user = response.data;

      if (user.userType !== allowedUserType && user.userType !== 0) {
        history.push("/unauth");
      } else {
        return user;
      }
    });
};

export default checkUser;
