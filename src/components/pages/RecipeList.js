import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../../context/userContext";
import RecipeCard from "../recipeCard";
import Loading from "../Loading";

const RecipeList = ({ user }) => {
    const [recipeList, setRecipeList] = useState([]);
    const [total, setTotal] = useState(13);
    const [userContext, setUserContext] = useContext(UserContext);
    const observerTarget = useRef(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchData = async (page) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_MIDDLEWARE_URL}/get`,
                {
                    method: "GET",
                    cache: "no-cache",
                    headers: {
                        "x-rciad-requested-id": "recipe",
                        "x-rciad-page": page,
                        "x-rciad-limit": 6,
                        "x-rciad-subscribed": user
                            ? user
                            : userContext
                            ? userContext.subscriptions !== undefined
                                ? userContext.subscriptions.toString()
                                : ""
                            : "",
                    },
                }
            );

            const data = await response.json();
            setRecipeList((prevPage) => [...prevPage, ...data.page]);
            setTotal(data.count);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(pageNumber);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && recipeList.length < total) {
                    setPageNumber((prevPageNumber) => prevPageNumber + 1);
                }
            },
            { threshold: 1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [observerTarget]);

    useEffect(() => {
        fetchData(pageNumber);
    }, [pageNumber]);

    return (
        <div id="scrollArea">
            {recipeList.length > 0 ? (
                <>
                    {recipeList.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} />
                    ))}
                </>
            ) : !loading ? (
                <h2>Sorry nothing but us chickens</h2>
            ) : (
                <Loading />
            )}
            <div ref={observerTarget}></div>
        </div>
    );
};

export default RecipeList;
