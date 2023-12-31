import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import { setMetaDescription, setMetaTitle } from "../../SEO/meta";

const Recipe = () => {
    const [recipe, setRecipe] = useState({});
    const [loading, setLoading] = useState(true);

    const params = useParams();

    useEffect(() => {
        const getRecipe = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_MIDDLEWARE_URL}/get`,
                    {
                        method: "GET",
                        headers: {
                            "x-rciad-requested-id": `recipe:${params.id}`,
                        },
                    }
                );

                const data = await response.json();
                setRecipe(data.page[0]);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getRecipe();
    }, []);

    useEffect(() => {
        setMetaTitle(recipe.name ? recipe.name : "Recipe");
        setMetaDescription(
            recipe.description ? recipe.description : recipe.name
        );
    }, [recipe]);

    return !loading ? (
        <div className="card">
            <a href="/recipe">
                <p>View all Recipes</p>
            </a>
            {recipe.author && (
                <a href={`/user/${recipe.author}`}>
                    <p>{recipe.author}</p>
                </a>
            )}
            {recipe.created_at && (
                <p className="time-stamp">
                    {new Date(recipe.created_at).toLocaleDateString()}
                </p>
            )}
            <h1>{recipe.name && recipe.name}</h1>
            {recipe.recipe && <h2>Recipes using this recipe</h2>}
            {recipe.recipe &&
                recipe.recipe.map((recipe, index) => {
                    return (
                        <div key={index}>
                            <a href={`/${recipe.replace(":", "/")}`}>
                                <p>
                                    {recipe
                                        .replace("recipe:", "")
                                        .replace(/\_[0-9]+/, "")
                                        .replaceAll("_", " ")}
                                </p>
                            </a>
                            <p>{recipe.description}</p>
                        </div>
                    );
                })}
            {recipe.ingredient && <h2>Ingredients</h2>}
            <ul>
                {recipe.ingredient &&
                    recipe.ingredient.map((ingredient, index) => {
                        return (
                            <li key={index}>
                                <p>
                                    {ingredient.quantity && ingredient.quantity}{" "}
                                    {ingredient.unit && ingredient.unit}{" "}
                                    <a
                                        href={`/${ingredient.id.replace(
                                            ":",
                                            "/"
                                        )}`}>
                                        {ingredient.name}
                                    </a>
                                </p>
                            </li>
                        );
                    })}
            </ul>
            {recipe.steps && <h2>Steps</h2>}
            <ol>
                {recipe.steps ? (
                    typeof recipe.steps === "string" ? (
                        <li>{recipe.steps}</li>
                    ) : (
                        recipe.steps.map((step, index) => {
                            return <li key={index}>{step}</li>;
                        })
                    )
                ) : null}
            </ol>
            {recipe.attachments && <h2>Media</h2>}
            {recipe.attachments &&
                recipe.attachments.map((attachment, index) => {
                    return (
                        <img
                            key={index}
                            src={attachment.url}
                            alt={recipe.name}
                        />
                    );
                })}
        </div>
    ) : (
        <Loading />
    );
};

export default Recipe;
