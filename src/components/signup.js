import React from "react";

const Signup = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();

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

        localStorage.setItem("token", res.token);
        window.location.reload();
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

                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
