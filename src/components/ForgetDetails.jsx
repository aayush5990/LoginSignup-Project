import React, { useEffect, useState } from "react";
import { TextField, Link, Paper, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./LoginSignup.css";

function ForgetDetails() {
  const [email, setEmail] = useState();
  const [showPassowrdField, setShowPasswordFields] = useState(false);
  const [newPassword, setNewPassword] = useState();
  const [users, setUser] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")) || []);
  }, []);
  const handleEmailVerification = () => {
    let filteredArray = users.filter((obj) => {
      return email === obj.email;
    });

    if (filteredArray.length > 0) {
      setShowPasswordFields(true);
    } else {
      alert("User Not Found!! Please Sign Up");
    }
  };
  const resetPassword = () => {
    for (let i = 0; i < users.length; i++) {
      if (email === users[i].email) {
        users[i].password = newPassword;
        break;
      }
    }
    localStorage.setItem("user", JSON.stringify(users));
    history.push("/login");
  };

  return (
    <div className="form-inner">
      <Paper className="form-paper" variant="outlined">
        <form>
          <>
            <h4>Email</h4>

            <div>
              <TextField
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                variant="outlined"
                label="Verify Email"
              />
            </div>
            <br></br>
            {showPassowrdField ? (
              ""
            ) : (
              <>
                <br></br>
                <Button
                  color="primary"
                  type="button"
                  onClick={handleEmailVerification}
                  variant="contained"
                >
                  Submit
                </Button>
              </>
            )}
          </>
          {showPassowrdField && (
            <>
              <div>
                <TextField
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  variant="outlined"
                  label="New Password"
                />
              </div>
              <br></br>

              <Button
                color="primary"
                type="button"
                onClick={resetPassword}
                variant="contained"
              >
                Reset Password
              </Button>
            </>
          )}
        </form>
        <br></br>
      </Paper>
    </div>
  );
}

export default ForgetDetails;
