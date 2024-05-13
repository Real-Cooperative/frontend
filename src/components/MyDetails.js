import React, { useState, useEffect } from "react";

const MyDetails = ({ user }) => {
    const [recipes, setRecipes] = useState([]);

    const logout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    const deleteRecipe = async (id) => {
        const body = {
            id: id,
        };

        const token = localStorage.getItem("token");

        const response = await fetch(
            `${process.env.REACT_APP_MIDDLEWARE_URL}/delete`,
            {
                method: "DELETE",
                headers: {
                    Authentication: "Bearer " + token,
                },
                body: JSON.stringify(body),
            }
        );

        const { message } = await response.json();
        console.log(message);

        const newRecipes = recipes.filter((recipe) => recipe.id !== id);
        setRecipes(newRecipes);
    };

    useEffect(() => {
        const getRecipes = async () => {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${process.env.REACT_APP_MIDDLEWARE_URL}/get`,
                {
                    method: "GET",
                    headers: {
                        Authentication: "Bearer " + token,
                        "x-rciad-requested-id": "recipe",
                        "x-rciad-page": "1",
                        "x-rciad-limit": "100",
                    },
                }
            );

            const { page } = await response.json();

            setRecipes(page);
        };
        getRecipes();
    }, []);

    return (
        <div className="user-details-container">
            <div className="user-details">
                <button onClick={() => logout()} className="logout-btn">
                    Logout
                </button>
                <button className="edit-btn">Edit</button>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>
                    Joined:{" "}
                    {new Date(user.created)
                        .toDateString()
                        .replace(/^\S+\s/, "")}
                </p>
                <p>Recipes:</p>
                <div>
                    {recipes.map((recipe, index) => {
                        return (
                            <div key={index}>
                                <a href={`/${recipe.id.replace(":", "/")}`}>
                                    <p>{recipe.name}</p>
                                </a>
                                <p>{recipe.description}</p>
                                <button onClick={() => deleteRecipe(recipe.id)}>
                                    Delete
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MyDetails;
