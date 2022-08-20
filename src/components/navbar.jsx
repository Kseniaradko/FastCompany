import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <Link className="link" to="/">
                Main
            </Link>
            <Link className="link" to="/login">
                Login
            </Link>
            <Link className="link" to="/users">
                Users
            </Link>
        </div>
    );
};

export default NavBar;
