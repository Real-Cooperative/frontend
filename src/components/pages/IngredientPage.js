import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

const Ingredient = () => {
    const [ingredient, setIngredient] = useState(null);
    const [relationships, setRelationships] = useState(null);

    const { type } = useParams();
    const { name } = useParams();

    const getIngredient = useCallback(async () => {
        let id = `${type}:${name}`;
        const headers = {
            "x-rciad-requested-id": id,
        };

        const response = await fetch(
            `${process.env.REACT_APP_MIDDLEWARE_URL}/get`,
            {
                method: "GET",
                headers: headers,
            }
        );

        const { page } = await response.json();
        setIngredient(page);
    }, [type, name]);

    const getRelationships = useCallback(async () => {
        let id = `${type}:${name}`;
        let relationship = "made_of";
        const headers = {
            "x-rciad-requested-id": id,
            "x-rciad-requested-relation": relationship,
        };

        const response = await fetch(
            `${process.env.REACT_APP_MIDDLEWARE_URL}/get-relation`,
            {
                method: "GET",
                headers: headers,
            }
        );

        const relations = await response.json();

        setRelationships(relations);
    }, [type, name]);

    useEffect(() => {
        getIngredient();
        getRelationships();
    }, [getIngredient, getRelationships]);

    return (
        <div className="card">
            <h1>{ingredient.name && ingredient.name}</h1>
            {ingredient && <h2>Recipes using this ingredient</h2>}
            {relationships &&
                relationships.map((recipe, index) => {
                    return (
                        <div key={index}>
                            <a href={`/${recipe.id.replace(":", "/")}`}>
                                <p>
                                    {recipe.id
                                        .replace("recipe:", "")
                                        .replace(/\_[0-9]+/, "")
                                        .replaceAll("_", " ")}
                                </p>
                            </a>
                        </div>
                    );
                })}
        </div>
    );
};

export default Ingredient;
