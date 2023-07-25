import React, { useState, useEffect, useContext } from "react";
import Login from "../login";
import Signup from "../signup";
import MyDetails from "../MyDetails";
import { UserContext } from "../../context/userContext";

const Account = () => {
    const [activeTab, setActiveTab] = useState("login");
    const [userContext, setUserContext] = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    function handleHover(e) {
        document.querySelectorAll(".active-tab").forEach((elm) => {
            elm.classList.remove("active-tab");
        });
        e.target.classList.add("active-tab");
    }

    function handleHoverOut() {
        document.querySelectorAll(".active-tab").forEach((elm) => {
            if (!elm.classList.contains("loc")) {
                elm.classList.remove("active-tab");
            }
        });
        document.querySelectorAll(".loc").forEach((elm) => {
            elm.classList.add("active-tab");
        });
    }

    useEffect(() => {
        if (userContext) {
            setLoading(false);
        } else if (userContext === null) {
            setLoading(false);
        }
    }, [userContext]);

    return (
        <div className="account-container card">
            {userContext && !loading ? (
                <MyDetails user={userContext} />
            ) : !loading ? (
                <>
                    <div className="tabs">
                        <div
                            onMouseEnter={handleHover}
                            onMouseLeave={handleHoverOut}
                            onClick={() => setActiveTab("login")}
                            className={
                                activeTab === "login"
                                    ? "active-tab tab loc"
                                    : "tab"
                            }>
                            <p>Login</p>
                        </div>
                        <div
                            onMouseEnter={handleHover}
                            onMouseLeave={handleHoverOut}
                            onClick={() => setActiveTab("signup")}
                            className={
                                activeTab === "signup"
                                    ? "active-tab tab loc"
                                    : "tab"
                            }>
                            <p>Signup</p>
                        </div>
                    </div>

                    {activeTab === "login" ? <Login /> : <Signup />}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Account;
