import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import ForgetDetails from "./components/ForgetDetails";

function App() {
  const [fetchData, setFetchData] = useState([]);
  let loggedIn = localStorage.getItem("loggedInUser") ? true : false;
  const [loginData, setLoginData] = useState();
  useEffect(() => {
    loggedIn = localStorage.getItem("loggedInUser") ? true : false;
  }, [localStorage.getItem("loggedInUser")]);
  const loginHandler = (data) => {
    setLoginData(data);
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login">
            <LoginForm fetchData={fetchData} />
          </Route>
          <Route exact path="/signup">
            <SignUpForm
              value={(data) => {
                setFetchData(data);
              }}
            />
          </Route>
          <Route exact path="/resetpassword">
            <ForgetDetails />
          </Route>
          {loggedIn && (
            <Route exact path="/dashboard">
              <Dashboard userData={loginData} />
            </Route>
          )}
          <Route exact path="/">
            <LoginForm val={loginHandler} fetchData={fetchData} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
