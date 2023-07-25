import React, { useState, useEffect, useContext, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import RecipeCard from "../recipeCard";

const RecipeList = () => {
    const [recipeList, setRecipeList] = useState([]);
    const [total, setTotal] = useState(13);
    const [searchParams, setSearchParams] = useSearchParams();
    const [userContext, setUserContext] = useContext(UserContext);
    const observerTarget = useRef(null);
    const [pageNumber, setPageNumber] = useState(1);

    const fetchData = async (page) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_MIDDLEWARE_URL}/get`,
                {
                    method: "GET",
                    headers: {
                        "x-rciad-requested-id": "recipe",
                        "x-rciad-page": page,
                        "x-rciad-limit":
                            parseInt(searchParams.get("limit")) || 10,
                        "x-rciad-subscribed": userContext.subscriptions
                            ? userContext.subscriptions.toString()
                            : "",
                    },
                }
            );

            const data = await response.json();
            setRecipeList((prevPage) => [...prevPage, ...data.page]);
            setTotal(data.count);
        } catch (error) {
            console.log(error);
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
            <h1>Recipe List</h1>
            {recipeList.length > 0 ? (
                <>
                    {recipeList.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} />
                    ))}
                </>
            ) : (
                <h2>Sorry nothing but us chickens</h2>
            )}
            <div ref={observerTarget}></div>
        </div>
    );
};

export default RecipeList;
