import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Home from "./components/Home/Home";
// import TodoList from "./components/Todo/TodoList";

//TODO Web Template Studio: Add routes for your new pages here.
const App = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route exact path="/" component={Home} />
                {/* <Route path="/List" component={TodoList} /> */}
            </Switch>
            <Footer />
        </React.Fragment>
    );
};

export default App;
