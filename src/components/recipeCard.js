import React, { useState, useEffect, useCallback } from "react";

const RecipeCard = ({ recipe }) => {
    const [userInfo, setUserInfo] = useState({});
    const getUser = useCallback(async () => {
        const headers = {
            "x-rciad-requested-id": recipe.created_by,
        };

        const response = await fetch(
            `${process.env.REACT_APP_MIDDLEWARE_URL}/user`,
            {
                method: "GET",
                headers: headers,
            }
        );

        const { details } = await response.json();
        setUserInfo(details);
    }, [recipe.created_by]);
    useEffect(() => {
        getUser();
    }, []);

    const timeSince = (date) => {
        const now = new Date();
        const then = new Date(date);
        const seconds = Math.floor((now - then) / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (days > 0) {
            return `${days} days ago`;
        } else if (hours > 0) {
            return `${hours} hours ago`;
        } else if (minutes > 0) {
            return `${minutes} minutes ago`;
        } else {
            return `${seconds} seconds ago`;
        }
    };

    return (
        <div className="card">
            <a href={userInfo && userInfo.user && `/user/${userInfo.user}`}>
                <p>{userInfo && userInfo.user && userInfo.user}</p>
            </a>
            <p className="time-stamp">{timeSince(recipe.created_at)}</p>
            <a href={recipe.id && `/${recipe.id.replace(":", "/")}`}>
                <h4>{recipe.name}</h4>
            </a>
            <p>{recipe.description}</p>
        </div>
    );
};

export default RecipeCard;
