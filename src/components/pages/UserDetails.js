import React, { useCallback, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import RecipeList from "./RecipeList";
import { setMetaDescription, setMetaTitle } from "../../SEO/meta";

const UserDetails = () => {
    const [userInfo, setUserInfo] = useState({});
    const { user } = useParams();
    const [userContext, setUserContext] = useContext(UserContext);

    const handleSubscription = async () => {
        let newSubscription = userInfo.id;
        let subscriptions = userContext.subscriptions
            ? userContext.subscriptions
            : [];

        if (subscriptions.includes(newSubscription)) {
            subscriptions = subscriptions.filter(
                (subscription) => subscription !== newSubscription
            );
        } else {
            subscriptions.push(newSubscription);
        }
        setUserContext({ ...userContext, subscriptions: subscriptions });
        const body = {
            subscriptions: subscriptions,
        };

        const token = localStorage.getItem("token");

        const response = await fetch(
            `${process.env.REACT_APP_MIDDLEWARE_URL}/update-user`,
            {
                method: "PATCH",
                headers: {
                    Authentication: "Bearer " + token,
                },
                body: JSON.stringify(body),
            }
        );

        const { details } = await response.json();
        if (details) {
            setUserContext({ ...userContext, subscriptions: subscriptions });
        } else {
            console.log("Error updating user");
            // TODO: Add error handling
        }
    };

    useEffect(() => {
        const getUser = async () => {
            const headers = {
                "x-rciad-requested-user": user,
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
        };
        getUser();
    }, []);

    useEffect(() => {
        if (userInfo.user) {
            console.log(userInfo);
            setMetaDescription(`Recipes by ${userInfo.user}.`);
            setMetaTitle(`${userInfo.user}'s Recipes`);
        }
    }, [userInfo]);

    return (
        <>
            <div className="card">
                <h1>{userInfo.user}</h1>
                <button onClick={handleSubscription}>Subscribe</button>
                <p>
                    Member Since:{" "}
                    {new Date(userInfo.created)
                        .toDateString()
                        .replace(/^\S+\s/, "")}
                </p>
            </div>
            {userInfo.id && <RecipeList user={userInfo.id} />}
        </>
    );
};

export default UserDetails;
