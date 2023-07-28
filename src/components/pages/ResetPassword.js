import React from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
    const { token } = useParams();

    const email = async (e) => {
        e.preventDefault();
        const body = {
            email: e.target.email.value,
        };
        fetch(`${process.env.REACT_APP_MIDDLEWARE_URL}/reset-password`, {
            method: "POST",
            body: JSON.stringify(body),
        });
    };

    return (
        <>
            {token ? (
                <div className="card">
                    <h1>Reset Password</h1>
                    <form>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" />
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input type="password" name="confirmPassword" />
                        <button type="submit">Reset Password</button>
                    </form>
                </div>
            ) : (
                <div className="card">
                    <h1>Reset Password</h1>
                    <form onSubmit={email}>
                        <div className="form-group">
                            <input required type="email" name="email" />
                            <label htmlFor="email">Email</label>
                        </div>
                        <button type="submit">Reset Password</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default ResetPassword;
