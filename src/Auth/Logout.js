import {Redirect} from "react-router-dom";
import React from "react";

const Logout = () =>{
    localStorage.setItem("signedIN", "false");
    localStorage.setItem("username", "");

    window.location.href="/";
};

export default Logout;