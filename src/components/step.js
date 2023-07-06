import React, { useState, useEffect, useContext } from "react";
import { RecipeContext } from "../context/recipeContext";

const Step = (props) => {
    const [recipeContext, setRecipeContext] = useContext(RecipeContext);
    const [stepText, setStepText] = useState("");

    useEffect(() => {
        props.setStepKey(props.index + 1);
        setRecipeContext({
            ...recipeContext,
            steps: [...recipeContext.steps, props.index],
        });
    }, []);

    return (
        <div data-key={props.index} className="string-array deletable">
            <div className="content">
                <label className="step-key">
                    Step{" "}
                    {recipeContext.steps
                        ? recipeContext.steps.indexOf(props.index) + 1
                        : 1}
                </label>
                <textarea
                    onChange={(e) => setStepText(e.target.value)}
                    value={stepText}
                    rows={4}
                    type="text"
                    name="steps"
                />
            </div>
            <div className="tool-buttons">
                <button
                    type="button"
                    onClick={() =>
                        props.deleteStep(
                            recipeContext.steps.indexOf(props.index)
                        )
                    }>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Step;
