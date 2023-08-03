import React, { useState, useContext, useEffect, useCallback } from "react";
import "./CreateRecipe.css";
import { RecipeContext } from "../../context/recipeContext";
import { UserContext } from "../../context/userContext";
import Step from "../step";
import Ingredient from "../ingredient";
import DragNDrop from "../drag-n-drop";
import Loading from "../Loading";

const CreateRecipe = () => {
    const [recipeContext, setRecipeContext] = useContext(RecipeContext);
    const [userContext, setUserContext] = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [stepKey, setStepKey] = useState(0);
    const [hashmap, setHashmap] = useState({});
    const [ingredientKey, setIngredientKey] = useState(0);
    const [recipeURL, setRecipeURL] = useState("");

    const getContext = useCallback(() => {
        setRecipeContext({ ...recipeContext, steps: [], ingredients: [] });
    }, [recipeContext, steps, ingredients]);

    useEffect(() => {
        getContext();
        addIngredient();
        addStep();
    }, []);

    useEffect(() => {
        if (userContext) {
            setLoading(false);
        } else if (userContext === null) {
            setLoading(false);
        }
    }, [userContext]);

    function addIngredient() {
        setIngredients([
            ...ingredients,
            <Ingredient
                deleteIngredient={deleteIngredient}
                key={ingredientKey}
                ingredientKey={ingredientKey}
                setIngredientKey={setIngredientKey}
                setHashmap={setHashmap}
                hashmap={hashmap}
            />,
        ]);
    }

    const deleteIngredient = (key) => {
        setIngredients((oldvalues) => oldvalues.filter((_, i) => _.key != key));
    };

    function addStep() {
        setSteps([
            ...steps,
            <Step
                deleteStep={deleteStep}
                setStepKey={setStepKey}
                index={stepKey}
                key={stepKey}
            />,
        ]);
    }

    const deleteStep = (key) => {
        setSteps((oldvalues) => oldvalues.filter((_, i) => i != key));
        setRecipeContext((oldValues) => {
            return {
                ...oldValues,
                steps: oldValues.steps.filter((_, i) => i != key),
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let form = e.target;
        let formData = new FormData(form);

        let data = {};
        for (let [key, value] of formData.entries()) {
            let array = formData.getAll(key);
            let objectKey = key.includes("-") ? key.split("-")[0] : null;
            let objectIndex = key.includes("-") ? key.split("-")[1] : null;
            if (array.length > 1 && objectKey == null) {
                if (typeof value == "object") {
                    data[key] = data[key] ? data[key] : [];
                    data[key] = [...data[key], await uploadFiles(value)];
                } else {
                    data[key] = array;
                }
            } else if (array.length > 1 && objectKey != null) {
                data[objectKey] = data[objectKey] ? data[objectKey] : [];
                let object = {};
                for (let i = 0; i < array.length; i++) {
                    object[hashmap[objectKey][i]] = array[i];
                }
                data[objectKey][objectIndex] = object;
            } else if (typeof value == "object") {
                data[key] = data[key] ? data[key] : [];
                if (key.size > 0) {
                    data[key] = [...data[key], await uploadFiles(value)];
                }
            } else {
                data[key] = value;
            }
        }
        data["type"] = "recipe";
        submitRecipe(data);
    };

    // TODO: Add a new route to the middleware to handle file uploads to a bucket
    // async function uploadFiles(form) {
    //     let attachment = {};
    //     let formData = new FormData();
    //     formData.append("attachment", form);
    //     let token = localStorage.getItem("token");
    //     await fetch(`${process.env.REACT_APP_MIDDLEWARE_URL}/upload`, {
    //         cache: "no-store",
    //         method: "POST",
    //         headers: {
    //             Authentication: "Bearer " + token,
    //         },
    //         body: formData,
    //     })
    //         .then((res) => res.text())
    //         .then((data) => (attachment = { name: form.name, url: data }));

    //     return attachment;
    // }

    const submitRecipe = async (form) => {
        let url = `${process.env.REACT_APP_MIDDLEWARE_URL}/post`;
        let token = localStorage.getItem("token");
        let response = await fetch(url, {
            method: "POST",
            cache: "no-cache",
            headers: {
                Authentication: "Bearer " + token,
            },
            body: JSON.stringify(form),
        });
        let data = await response.json();
        let newRecipeURL = `/${data.id.replace(":", "/")}`;
        window.location.href = newRecipeURL;
    };

    return (
        <div className="card">
            {!loading && userContext ? (
                <>
                    <h1>Create a Recipe</h1>
                    <form onSubmit={handleSubmit}>
                        {/*
                        <div className="form-header">
                            
                            <div className="form-header--col">
                            */}
                        <div className="form-group">
                            <input required id="name" type="text" name="name" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <label htmlFor="description">Description</label>
                        <textarea
                            rows={4}
                            id="description"
                            type="text"
                            name="description"
                        />
                        {/*
                            </div>

                            Restore once proper image upload is implemented
                            <DragNDrop />
                            
                        </div>
                        */}
                        <h3>Ingredients</h3>
                        {ingredients}
                        <button type="button" onClick={() => addIngredient()}>
                            Add Ingredient
                        </button>
                        <h3>Steps</h3>
                        {steps}
                        <button type="button" onClick={() => addStep()}>
                            Add Step
                        </button>
                        <button type="submit">Submit</button>
                    </form>
                </>
            ) : loading ? (
                <Loading />
            ) : (
                <a href="/account">Please login</a>
            )}
        </div>
    );
};

export default CreateRecipe;

// {
//     "name": "Black Eyed Peas",
//     "type": "recipe",
//     "ingredients": [
//         {
//             "name": "Black Eyed Peas",
//             "quantity": 1,
//             "unit": "bunch",
//             "type": "plant"
//         },
//         {
//             "name": "Hammock",
//             "quantity": 1,
//             "unit": "kg",
//             "type": "meat"
//         },
//         {
//             "name": "Chicken Stock",
//             "quantity": 1,
//             "unit": "cup",
//             "type": "recipe"
//         },
//         {
//             "name": "Salt",
//             "quantity": 1,
//             "unit": "tsp",
//             "type": "other"
//         },
//         {
//             "name": "Pepper",
//             "quantity": 1,
//             "unit": "tsp",
//             "type": "plant"
//         },
//         {
//             "name": "Garlic",
//             "quantity": 1,
//             "unit": "clove",
//             "type": "plant"
//         },
//         {
//             "name": "Onion",
//             "quantity": 2,
//             "unit": "whole",
//             "type": "plant"
//         }
//     ],
//     "steps": [
//         {
//             "description": "Boil Hammock"
//         },
//         {
//             "description": "Add Onions"
//         },
//         {
//             "description": "Add Black Eyed Peas"
//         }
//     ],
//     "attachments": [
//         {
//             "name": "Black Eyed Peas.png",
//             "data": "iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"
//         }
//     ]
// }
