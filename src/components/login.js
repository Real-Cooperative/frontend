import React, { useState } from "react";

const Login = () => {
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = Object.fromEntries(form.entries());
        let url = `${process.env.REACT_APP_MIDDLEWARE_URL}/login`;
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
        });
        let res = await response.json();
        console.log(res);
        if (res.token) {
            localStorage.setItem("token", res.token);
            window.location.reload();
        }
        setMessage(res.message);
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <input required id="username" type="text" name="username" />
                    <label htmlFor="username">Username</label>
                </div>
                <div className="form-group">
                    <input
                        required
                        id="password"
                        type="password"
                        name="password"
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <p>{message}</p>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};
export default Login;
