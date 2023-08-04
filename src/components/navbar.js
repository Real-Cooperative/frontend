import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Navbar = () => {
    const [userContext, setUserContext] = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    const getMe = useCallback(async (token) => {
        try {
            if (!token) {
                setUserContext(null);
                return;
            }
            let url = `${process.env.REACT_APP_MIDDLEWARE_URL}/me`;

            let response = await fetch(url, {
                method: "GET",
                headers: {
                    Authentication: "Bearer " + token,
                },
            });
            let { details } = await response.json();
            setUserContext(details);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    });
    useEffect(() => {
        getMe(localStorage.getItem("token"));
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
                    <p>
                        {loading
                            ? null
                            : userContext
                            ? userContext.user
                            : "Login"}
                    </p>
                </div>
            </Link>
        </nav>
    );
};

export default Navbar;
