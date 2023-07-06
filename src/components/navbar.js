import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar-container">
            <Link to="/">
                <div className="navbar-button">
                    <p>Home</p>
                </div>
            </Link>
            <Link to="/recipe">
                <div className="navbar-button">
                    <p>Recipes</p>
                </div>
            </Link>
            <Link to="/create-recipe">
                <div className="navbar-button">
                    <p>Create a Recipe</p>
                </div>
            </Link>
        </div>
    );
};

export default Navbar;
