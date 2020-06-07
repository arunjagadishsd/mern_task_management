import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Token from "./components/Auth/Token";

const App = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    let isAuthenticated;
    if (token) {
        isAuthenticated = true;
    } else {
        isAuthenticated = false;
    }
    return (
        <React.Fragment>
            <Switch>
                <Route path="/login" component={Login} />
                <Route
                    path="/token"
                    component={() => <Token setToken={setToken} />}
                />
                <Route exact path="/" component={Home} />
            </Switch>
        </React.Fragment>
    );
};
export default App;
