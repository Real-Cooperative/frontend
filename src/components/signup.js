import React, { useRef, useState } from "react";
import Loading from "./Loading";

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const errorContainer = useRef(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData(e.target);
            let data = Object.fromEntries(form.entries());

            if (data.marketing) {
                data.settings = {};
                data.settings.marketing = true;
                delete data.marketing;
            } else {
                data.settings = {};
                data.settings.marketing = false;
            }

            let url = `${process.env.REACT_APP_MIDDLEWARE_URL}/signup`;
            let response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
            });

            let res = await response.json();
            if (res.status === "Error") throw new Error(res.message);
            localStorage.setItem("token", res.token);
            window.location.reload();
        } catch (e) {
            console.error(e);
            errorContainer.current.innerHTML = `<p>${e.message}</p>`;
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <h1>Signup</h1>
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group">
                    <input required id="username" type="text" name="username" />
                    <label htmlFor="username">Username</label>
                </div>
                <div className="form-group">
                    <input required id="email" type="email" name="email" />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-group">
                    <p style={{ fontSize: `80%` }}>
                        Must contain at least one number, uppercase, and
                        lowercase letter, and at least 8 or more characters
                    </p>
                    <input
                        required
                        id="password"
                        type="password"
                        name="password"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must contain at least one number, uppercase, and lowercase letter, and at least 8 or more characters"
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <label htmlFor="marketing">
                    Marketing
                    <input id="marketing" type="checkbox" name="marketing" />
                </label>
                <div ref={errorContainer}></div>
                {loading ? <Loading /> : <button type="submit">Signup</button>}
            </form>
        </div>
    );
};

export default Signup;
