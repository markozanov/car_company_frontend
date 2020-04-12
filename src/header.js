import {Link} from "react-router-dom";
import React from "react";

const Header = () => {

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark navbar-fixed bg-dark">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/"}>Home</Link>
                    </li>
                    <li className="nav-item-active">
                        <Link className="nav-link" to={"/cars"}>Cars</Link>
                    </li>
                    <li className="nav-item-active">
                        <Link className="nav-link" to={"/saloons"}>Saloons</Link>
                    </li>
                    {localStorage.getItem("signedIN") === "true" && (
                        <li className="nav-item-active">
                            <Link className="nav-link" to={"/employees"}>Employees</Link>
                        </li>
                    )}
                    {localStorage.getItem("signedIN") === "true" && (
                        <li className="nav-item-active">
                            <Link className="nav-link" to={"/users"}>Users</Link>
                        </li>
                    )}
                    {localStorage.getItem("signedIN") === "true" && (
                        <li className="nav-item-active">
                            <Link className="nav-link" to={"/purchases"}>Purchases</Link>
                        </li>
                    )}
                    {localStorage.getItem("signedIN") === "true" && (
                        <li className="nav-item-active">
                            <Link className="nav-link" to={"/clients"}>Clients</Link>
                        </li>
                    )}
                </ul>
                {localStorage.getItem("signedIN") === "true" && (
                    <div className="nav-item-active">
                        <span className="nav-link text-white">{localStorage.getItem("username")}</span>
                    </div>
                )}
                {localStorage.getItem("signedIN") === "false" && (
                    <Link className="btn btn-primary" to={"/login"}>Log In</Link>
                )}
                {localStorage.getItem("signedIN") === "true" && (
                    <Link className="btn btn-primary" to={"/logout"}>Log Out</Link>
                )}
            </nav>
        </header>
    );
};

export default Header;