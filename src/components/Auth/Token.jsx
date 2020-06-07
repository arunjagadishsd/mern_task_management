import React from "react";
import queryString from "query-string";
import { Redirect } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Token = ({ setToken }) => {
    const { token } = queryString.parse(window.location.search);
    if (token) {
        setToken(token);
        localStorage.setItem("token", token);
    }
    return <Redirect to="/" />;
};

export default Token;
