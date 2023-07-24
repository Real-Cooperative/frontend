import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Navbar = () => {
    const [userContext, setUserContext] = useContext(UserContext);
    useEffect(() => {
        const getMe = async () => {
            let url = `${process.env.REACT_APP_MIDDLEWARE_URL}/me`;
            let token = localStorage.getItem("token");
            let response = await fetch(url, {
                method: "GET",
                headers: {
                    Authentication: "Bearer " + token,
                },
            });
            let { details } = await response.json();
            console.log(details);
            setUserContext(details);
        };
        getMe();
    }, []);

    return (
        <nav className="navbar-container">
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
            <Link to="/account">
                <div className="navbar-button">
                    <p>{userContext ? userContext.user : "Login"}</p>
                </div>
            </Link>
        </nav>
    );
};

export default Navbar;
