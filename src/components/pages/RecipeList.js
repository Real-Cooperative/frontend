import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "../pagination";

const RecipeList = () => {
    const [recipeList, setRecipeList] = useState([]);
    const [total, setTotal] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();

    const getRecipeList = useCallback(async () => {
        try {
            const body = JSON.stringify({
                id: "recipe",
                page: parseInt(searchParams.get("page")) || 1,
                limit: parseInt(searchParams.get("limit")) || 10,
            });
            const response = await fetch(
                `${process.env.REACT_APP_MIDDLEWARE_URL}/get`,
                {
                    method: "POST",
                    body: body,
                }
            );

            const data = await response.json();
            setRecipeList(data.page);
            setTotal(data.count);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getRecipeList();
    }, [getRecipeList]);

    return (
        <div>
            <h1>Recipe List</h1>
            <Pagination
                page={parseInt(searchParams.get("page")) || 1}
                limit={parseInt(searchParams.get("limit")) || 10}
                total={total}
            />
            {recipeList.length > 0 ? (
                recipeList.map((recipe, index) => {
                    return (
                        <div key={index}>
                            <a href={`/${recipe.id.replace(":", "/")}`}>
                                <h2>{recipe.name}</h2>
                            </a>
                            <p>{recipe.description}</p>
                        </div>
                    );
                })
            ) : (
                <h2>Sorry nothing but us chickens</h2>
            )}
            <Pagination
                page={parseInt(searchParams.get("page")) || 1}
                limit={parseInt(searchParams.get("limit")) || 10}
                total={total}
            />
        </div>
    );
};

export default RecipeList;
