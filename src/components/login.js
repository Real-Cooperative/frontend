import React, { useState } from "react";
import Loading from "./Loading";

const Login = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const form = new FormData(e.target);
            const data = Object.fromEntries(form.entries());
            let url = `${process.env.REACT_APP_MIDDLEWARE_URL}/login`;
            let response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
            });
            let res = await response.json();
            if (res.token) {
                localStorage.setItem("token", res.token);
                window.location.reload();
            }
            setMessage(res.message);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
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
                {loading ? <Loading /> : <button type="submit">Login</button>}
            </form>
        </div>
    );
};
export default Login;
