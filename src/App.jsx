import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import queryString from "query-string";

const App = () => {
    const history = useHistory();
    const { token } = queryString.parse(window.location.search);
    if (token) {
        localStorage.setItem("token", token);
        history.push("/");
    }
    return (
        <React.Fragment>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/token" component={Home} />
                <Route path="/login" component={Login} />
            </Switch>
        </React.Fragment>
    );
};

export default App;
