import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "../components/TextField";
import * as Yup from "yup";
import server from "../api/alumni-mgmnt-backend";
import history from "../history";

class SignUp extends React.Component {
  onFormSubmit = async (values) => {
    let canStore = true;

    if (canStore) {
      await server
        .post("/users/login", {
          email: values.username,
          password: values.password,
        })
        .then((response1) => {
          localStorage.setItem("token", response1.data.token);
          localStorage.setItem("user", response1.data.user);
          history.push("/profile");
        });

      //localStorage.getItem('rememberMe')
      //localStorage.setItem('token', );
    }
  };

  render() {
    const validate = Yup.object({
      username: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Required"),

      password: Yup.string()
        .min(6, "Password must be at least 6 charaters")
        .required("Password is required"),
    });
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-5">
            <Formik
              initialValues={{
                username: "",
                password: "123456",
              }}
              validationSchema={validate}
              onSubmit={(values) => {
                this.onFormSubmit(values);
              }}
            >
              {(formik) => (
                <div>
                  <h1 className="my-4 font-weight-bold .display-4">Login</h1>
                  <Form>
                    <TextField label="Name" name="username" type="text" />

                    <TextField
                      label="Password"
                      name="password"
                      type="password"
                    />

                    <button className="btn btn-dark mt-3" type="submit">
                      Login
                    </button>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
