import React, { useEffect } from "react";

const Ingredient = (props) => {
    const {
        deleteIngredient,
        setHashmap,
        hashmap,
        setIngredientKey,
        ingredientKey,
    } = props;

    useEffect(() => {
        setHashmap({
            ...hashmap,
            ingredient: ["name", "quantity", "unit", "type"],
        }); //make a hashmap of the keys for array of objects

        setIngredientKey(ingredientKey + 1);
    }, []);
    return (
        <div className="object-array deletable">
            <div className="tool-buttons">
                <button
                    className="delete-button"
                    type="button"
                    onClick={() => deleteIngredient(ingredientKey)}>
                    X
                </button>
            </div>
            <div className="content">
                <div className="form-group">
                    <input
                        required
                        id={"ingredient-" + ingredientKey}
                        type="text"
                        name={"ingredient-" + ingredientKey}
                        placeholder="eg. black eyed peas, onions, hammock"
                    />
                    <label htmlFor={"ingredient-" + ingredientKey}>Name</label>
                </div>
                <div className="form-group">
                    <input
                        required
                        id={"quantity-" + ingredientKey}
                        min={0}
                        step={"any"}
                        type="number"
                        name={"ingredient-" + ingredientKey}
                        placeholder="0"
                    />
                    <label htmlFor={"quantity-" + ingredientKey}>
                        Quantity
                    </label>
                </div>
                <div className="form-group">
                    <input
                        required
                        id={"unit-" + ingredientKey}
                        type="text"
                        name={"ingredient-" + ingredientKey}
                        placeholder="eg. lb, kg, pinch"
                    />
                    <label htmlFor={"unit-" + ingredientKey}>Unit</label>
                </div>
                <div className="form-group">
                    <input
                        id={"type-" + ingredientKey}
                        type="text"
                        name={"ingredient-" + ingredientKey}
                        placeholder="eg. vegetable, dairy, meat"
                    />
                    <label htmlFor={"type-" + ingredientKey}>Type</label>
                </div>
            </div>
        </div>
    );
};

export default Ingredient;
