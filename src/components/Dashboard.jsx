import { Button, Paper } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./LoginSignup.css";

function Dashboard() {
  const history = useHistory();
  const [user, setUser] = useState();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    history.push("/login");
  };
  useEffect(() => {
    setTimeout(() => {
      setUser(JSON.parse(localStorage.getItem("loggedInUser") || {}));
    }, 700);
  }, []);
  return (
    <div className="form-inner">
      <Paper className="form-paper">
        {user ? <h1>Welcome {user.name}</h1> : ""}
        <Button
          color="primary"
          onClick={handleLogout}
          type="submit"
          value="LogIn"
          variant="contained"
        >
          Logout
        </Button>
        <div></div>
        <br></br>
      </Paper>
    </div>
  );
}

export default Dashboard;
