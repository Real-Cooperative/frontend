import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../../context/userContext";
import RecipeCard from "../recipeCard";
import Loading from "../Loading";
import { setMetaDescription, setMetaTitle } from "../../SEO/meta";

const RecipeList = ({ user }) => {
    const [recipeList, setRecipeList] = useState([]);
    const [total, setTotal] = useState(0);
    const [userContext, setUserContext] = useContext(UserContext);
    const observerTarget = useRef(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(true);
    const [moreContent, setMoreContent] = useState(true);

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
                        "x-rciad-limit": 10,
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
            if (!response.ok) throw new Error(await response.text());
            const data = await response.json();
            setTotal(data.count);
            setRecipeList((prevPage) => [...prevPage, ...data.page]);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(pageNumber);
        setMetaTitle("Recipes");
        setMetaDescription("Recipes");
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && recipeList.length > 0) {
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
    }, [observerTarget, recipeList]);

    useEffect(() => {
        if (recipeList.length < total) {
            setMoreContent(true);
            fetchData(pageNumber);
        } else {
            setMoreContent(false);
        }
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
            {moreContent ? <Loading /> : null}
        </div>
    );
};

export default RecipeList;
