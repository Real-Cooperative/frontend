import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";

const EditDetails = () => {
    const [userContext, setUserContext] = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userContext) {
            setLoading(false);
        } else if (userContext === null) {
            setLoading(false);
        }
    }, [userContext]);

    return (
        <div className="card">
            {userContext && !loading ? (
                <input type="text" value={userContext.username} />
            ) : (
                <p>loading</p>
            )}
        </div>
    );
};

export default EditDetails;
