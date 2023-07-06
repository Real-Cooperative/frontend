import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

const Recipe = () => {
    const [recipe, setRecipe] = useState({});

    const params = useParams();

    const getRecipe = useCallback(async () => {
        try {
            const body = JSON.stringify({ id: `recipe:${params.id}` });
            const response = await fetch(
                `${process.env.REACT_APP_MIDDLEWARE_URL}/get`,
                {
                    method: "POST",
                    body: body,
                }
            );

            const data = await response.json();
            setRecipe(data.page[0]);
            console.log(data.page[0]);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getRecipe();
    }, [getRecipe]);

    return (
        <div>
            <h1>{recipe.name}</h1>
            {recipe.recipe ? <h2>Recipes using this recipe</h2> : null}
            {recipe.recipe
                ? recipe.recipe.map((recipe, index) => {
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
                  })
                : null}
            {recipe.ingredient ? <h2>Ingredients</h2> : null}
            <ul>
                {recipe.ingredient
                    ? recipe.ingredient.map((ingredient, index) => {
                          return <li key={index}>{ingredient.name}</li>;
                      })
                    : null}
            </ul>
            {recipe.steps ? <h2>Steps</h2> : null}
            <ol>
                {recipe.steps
                    ? recipe.steps.map((step, index) => {
                          return <li key={index}>{step}</li>;
                      })
                    : null}
            </ol>
            {recipe.attachments ? <h2>Media</h2> : null}
            {recipe.attachments
                ? recipe.attachments.map((attachment, index) => {
                      return (
                          <img
                              key={index}
                              src={attachment.url}
                              alt={recipe.name}
                          />
                      );
                  })
                : null}
        </div>
    );
};

export default Recipe;
