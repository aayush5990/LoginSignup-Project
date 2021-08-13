import React, { useEffect, useState } from "react";
import { TextField, Link, Paper, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ForgetDetails from "./ForgetDetails";
import "./LoginSignup.css";

function LoginForm({ fetchData, val }) {
  debugger;
  const [details, setDetails] = useState({ name: "", email: "", password: "" });
  const [user, setUser] = useState([]);
  const [error, setError] = useState("");
  const [passwordStatus, setPasswordStatus] = useState(true);
  const history = useHistory();

  const login = (details) => {
    let flag = false;
    let newDetails = {};
    for (let userObj of user) {
      if (
        details.email == userObj.email &&
        details.password == userObj.password
      ) {
        newDetails = details;
        newDetails.name = userObj.name;
        flag = true;
        break;
      } else {
        flag = false;
      }
    }
    if (flag) {
      localStorage.setItem("loggedInUser", JSON.stringify(newDetails));
      setError("");
      history.push("/dashboard");
    } else {
      setPasswordStatus(false);
    }
  };

  useEffect(() => {
    if (fetchData.length < 1) {
      setUser(JSON.parse(localStorage.getItem("user")) || []);
    } else if (fetchData.length > 0) {
      setUser(fetchData);
    }
  }, [fetchData]);

  const submitHandler = (e) => {
    e.preventDefault();

    login(details);
  };

  const forgotPasswordHandler = () => {
    history.push("/resetpassword");
  };

  return (
    <div className="form-inner">
      <Paper className="form-paper" variant="outlined">
        <form onSubmit={submitHandler}>
          <h2>LogIn</h2>

          <br></br>
          <div>
            <TextField
              type="email"
              name="email"
              id="email"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              value={details.email}
              variant="outlined"
              label="Email"
            />
          </div>
          <br></br>
          <div>
            <TextField
              type="password"
              name="password"
              id="password"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              value={details.password}
              variant="outlined"
              label="Password"
            />
          </div>
          <br></br>
          <div>
            <Link
              onClick={() => history.push("/signup")}
              variant="contained"
              color="primary"
            >
              New User? SignUp
            </Link>
          </div>
          <br></br>
          <div>
            {!passwordStatus ? (
              <Link
                onClick={forgotPasswordHandler}
                variant="contained"
                color="primary"
              >
                Forgot Password?
              </Link>
            ) : null}
          </div>
          <br></br>
          <Button
            color="primary"
            type="submit"
            value="LogIn"
            variant="contained"
          >
            Login
          </Button>
        </form>
        <br></br>
      </Paper>
    </div>
  );
}

export default LoginForm;
