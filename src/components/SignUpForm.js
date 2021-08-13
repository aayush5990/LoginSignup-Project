import React, { useState } from "react";
import { Paper, TextField, Link, Button } from "@material-ui/core";

import { useHistory } from "react-router-dom";
import "../index.css";
import "./LoginSignup.css";

function SignUpForm({ value }) {
  const defaultData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [signUpData, setSignUpData] = useState(defaultData);
  const history = useHistory();

  const handleFormData = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const resetData = () => {
    setSignUpData(defaultData);
  };
  const submitFormData = (e) => {
    e.preventDefault();
    let data = [];

    debugger;
    if (!signUpData.name || signUpData.name === "") {
      alert("Please Fill Your Name");
      return;
    }
    if (!signUpData.email || signUpData.email === "") {
      alert("Please Fill Your Email");

      return;
    }
    if (!signUpData.password || signUpData.password === "") {
      alert("Please Fill Your Password");

      return;
    }

    if (localStorage.getItem("user")) {
      data = JSON.parse(localStorage.getItem("user"));
    }

    for (let i = 0; i < data.length; i++) {
      if (signUpData.email === data[i].email) {
        alert("User Already exist!!");
        return resetData();
      }
    }
    data.push(signUpData);
    let userData = JSON.stringify(data);

    localStorage.setItem("user", userData);
    if (value) {
      value(data);
    }
    resetData();
    history.push("/login");
  };

  return (
    <div className="form-inner">
      <Paper className="form-paper" variant="outlined">
        <h1>SignUp</h1>
        <form onSubmit={submitFormData} className="styleCenter">
          <div>
            <TextField
              label="Name"
              variant="outlined"
              type="text"
              name="name"
              id="name"
              value={signUpData.name}
              onChange={handleFormData}
            />
          </div>
          <br />

          <div>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              id="email"
              value={signUpData.email}
              onChange={handleFormData}
            />
          </div>
          <br />

          <div>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              id="password"
              value={signUpData.password}
              onChange={handleFormData}
            />
          </div>

          <br />
          <div>
            <Link onClick={() => history.push("/login")}>
              Already a user? Login
            </Link>
          </div>
          <br></br>
          <Button type="onSubmit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
        <br></br>
      </Paper>
    </div>
  );
}

export default SignUpForm;
