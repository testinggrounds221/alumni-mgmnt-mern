import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "../components/TextField";
import CustomSelect from "../components/CustomSelect";
import * as Yup from "yup";
import server from "../api/alumni-mgmnt-backend";
import history from "../history";

class SignUp extends React.Component {
  state = {
    dbError: { emailError: "", deptClg: "" },
    college: "",
    department: "",
  };

  collegeOptions = [
    { value: "cl1", label: "TCE" },
    { value: "cl2", label: "SRM" },
    { value: "cl3", label: "VIT" },
    { value: "cl4", label: "MIT" },
  ];

  deptOptions = [
    { value: "d1", label: "IT" },
    { value: "d2", label: "CS" },
    { value: "d3", label: "Mech" },
    { value: "d4", label: "Civil" },
  ];

  onFormSubmit = async (values) => {
    let canStore = true;
    const response1 = await server.get("/users/emails", {});
    const user_mail_obj = response1.data;
    let temp_str = "";

    for (let obj in user_mail_obj) {
      console.log();
      if (user_mail_obj[obj].email === values.email) {
        canStore = false;
        console.log("fgfg");
        temp_str = "Email Already Taken";
      }
    }
    this.setState({ dbError: { emailError: temp_str } });

    if (!values.collegeId || !values.departmentId) {
      this.setState({ dbError: { deptClg: "Choose College and Department" } });
      canStore = false;
    }

    if (canStore) {
      await server.post("/users", { ...values }).then((response1) => {
        localStorage.setItem("token", response1.data.token);
        history.push("/profile");
      });

      //localStorage.getItem('rememberMe')
      //localStorage.setItem('token', );
    }
  };

  render() {
    const validate = Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      passOutYear: Yup.number()
        .moreThan(1900, "Must be Greater Than 1900")
        .lessThan(2030, "Must be lesse Than 2030")
        .required("Required"),
      phoneNumber: Yup.number()
        .positive("Phone Num to be Positive")
        .required("Phone Num is Required"),
      companyName: Yup.string().required("Company name is required"),
      companyRole: Yup.string().required("Company role is required"),
      specalization: Yup.string(),
      linkedIn: Yup.string(),
      email: Yup.string()
        .email("Email is invalid")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 charaters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password must match")
        .required("Confirm password is required"),
    });
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-5">
            <Formik
              initialValues={{
                firstName: "My Name",
                passOutYear: 2018,
                email: "myemail@email.com",
                password: "123456",
                confirmPassword: "123456",
                phoneNumber: "123456",
                specalization: "Block Chain",
                companyName: "Honeywell",
                companyRole: "Program Manager",
                linkedIn: "www.link.com/",
              }}
              validationSchema={validate}
              onSubmit={(values) => {
                values = {
                  ...values,
                  collegeId: this.state.college.value,
                  departmentId: this.state.department.value,
                };
                this.onFormSubmit(values);
              }}
            >
              {(formik) => (
                <div>
                  <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
                  <Form>
                    <TextField label="Name" name="firstName" type="text" />
                    <TextField
                      label="Pass Out Year"
                      name="passOutYear"
                      type="text"
                    />
                    <CustomSelect
                      className="input"
                      onChange={(value) => this.setState({ college: value })}
                      value={this.state.college}
                      options={this.collegeOptions}
                      label="College"
                    />
                    <CustomSelect
                      className="input"
                      onChange={(value) => this.setState({ department: value })}
                      value={this.state.department}
                      options={this.deptOptions}
                      label="Department"
                    />
                    {this.state.dbError.deptClg}
                    <TextField
                      label="Company Name"
                      name="companyName"
                      type="text"
                    />
                    <TextField
                      label="Specalization"
                      name="specalization"
                      type="text"
                    />
                    <TextField
                      label="LinkedIn Profile"
                      name="linkedIn"
                      type="text"
                    />
                    <TextField
                      label="Phone Number"
                      name="phoneNumber"
                      type="text"
                    />
                    <TextField label="Email" name="email" type="email" />
                    {this.state.dbError.emailError}
                    <TextField
                      label="Password"
                      name="password"
                      type="password"
                    />
                    <TextField
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                    />

                    <button className="btn btn-dark mt-3" type="submit">
                      Register
                    </button>
                    <button className="btn btn-danger mt-3 ml-3" type="reset">
                      Reset
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
